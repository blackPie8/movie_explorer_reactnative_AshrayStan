import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { getMessaging, onMessage, getToken } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { useMovies } from '../context/MoviesContext';
import { getApp } from '@react-native-firebase/app';
import { addDeviceNotification } from '../axiosQuery/axiosRequest';

const Notifications = () => {
  const { token, deviceToken, setDeviceToken } = useMovies();

  useEffect(() => {
    requestPermissionAndroid();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(getMessaging(getApp()), async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // Call addDeviceNotification when deviceToken is set
  useEffect(() => {
    if (deviceToken && token) {
      console.log('Tokens being sent:', { deviceToken, token });
      
      addDeviceNotification(deviceToken, token);
    }
  }, [deviceToken, token]);

  const requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFcmToken();
    } else {
      Alert.alert('Permission Denied');
    }
  };

  const getFcmToken = async () => {
    try {
      const token = await getToken(getMessaging(getApp()));
      console.log('FCM Token:', token);
      setDeviceToken?.(token);
    } catch (error) {
      console.error('Failed to get FCM token', error);
    }
  };

  const onDisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId,
        // smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return null;
};

export default Notifications;