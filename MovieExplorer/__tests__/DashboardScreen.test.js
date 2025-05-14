jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      name: 'Dashboard',
    }),
  };
});


import React from 'react';
import { render } from '@testing-library/react-native';
import DashboardScreen from '../src/screens/DashboardScreen';
import { MoviesProvider } from '../src/context/MoviesContext';
import { NavigationContainer } from '@react-navigation/native';

describe('DashboardScreen', () => {
  it('renders the main UI parts correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
      <MoviesProvider>
        <DashboardScreen />
      </MoviesProvider>
      </NavigationContainer>
    );

    expect(getByTestId('search-container')).toBeTruthy();
    expect(getByTestId('dashboard-title')).toBeTruthy();
    expect(getByTestId('scroll-view')).toBeTruthy();
  });
});
