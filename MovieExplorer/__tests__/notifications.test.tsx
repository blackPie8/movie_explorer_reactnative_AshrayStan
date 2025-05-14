import React from 'react';
import { render } from '@testing-library/react-native';
import Notifications from '../src/pushNotification/Notifications';
import { PermissionsAndroid } from 'react-native';
import { useMovies } from '../src/context/MoviesContext';
import * as firebaseMessaging from '@react-native-firebase/messaging';
import * as notifee from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import { addDeviceNotification } from '../src/axiosQuery/axiosRequest';

jest.mock('react-native', () => {
  return {
    ...jest.requireActual('react-native'),
    PermissionsAndroid: {
      request: jest.fn(),
    },
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return {
    getMessaging: jest.fn(),
    onMessage: jest.fn(),
    getToken: jest.fn(),
  };
});

jest.mock('@notifee/react-native', () => {
  return {
    createChannel: jest.fn(),
    displayNotification: jest.fn(),
  };
});

jest.mock('@react-native-firebase/app', () => {
  return {
    getApp: jest.fn(),
  };
});

jest.mock('../axiosQuery/axiosRequest', () => ({
  addDeviceNotification: jest.fn(),
}));

jest.mock('../context/MoviesContext', () => {
  return {
    useMovies: jest.fn(),
  };
});

describe('Notifications Component', () => {
  let mockSetDeviceToken;
  const mockToken = 'dummyToken';
  const mockDeviceToken = 'dummyDeviceToken';

  beforeEach(() => {
    mockSetDeviceToken = jest.fn();
    useMovies.mockReturnValue({
      token: mockToken,
      deviceToken: mockDeviceToken,
      setDeviceToken: mockSetDeviceToken,
    });

    PermissionsAndroid.request.mockResolvedValue(PermissionsAndroid.RESULTS.GRANTED);
    firebaseMessaging.getToken.mockResolvedValue(mockDeviceToken);
    firebaseMessaging.onMessage.mockImplementation((callback) => {
      callback({
        notification: {
          title: 'Test Notification',
          body: 'This is a test notification',
        },
      });
    });
  });

  it('requests notification permission on mount', async () => {
    render(<Notifications />);

    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  });

  it('fetches FCM token if permission is granted', async () => {
    render(<Notifications />);

    expect(firebaseMessaging.getToken).toHaveBeenCalled();
    expect(mockSetDeviceToken).toHaveBeenCalledWith(mockDeviceToken);
  });

  it('displays a notification when a message is received', async () => {
    render(<Notifications />);

    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: 'default',
      name: 'Default Channel',
    });
    expect(notifee.displayNotification).toHaveBeenCalledWith({
      title: 'Test Notification',
      body: 'This is a test notification',
      android: {
        channelId: 'default',
        pressAction: { id: 'default' },
      },
    });
  });

  it('calls addDeviceNotification when deviceToken and token are set', async () => {
    render(<Notifications />);

    expect(addDeviceNotification).toHaveBeenCalledWith(mockDeviceToken, mockToken);
  });
});
