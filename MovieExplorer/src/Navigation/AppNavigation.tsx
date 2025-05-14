import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { MoviesProvider, useMovies } from '../context/MoviesContext';
import SupervisorStack from './SupervisorStack';
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { role } = useMovies();
  return (
    <>
    {role === 'supervisor' ? <SupervisorStack /> : <UserStack />}
    </>
  )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
          <MoviesProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SignUp'>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
        </MoviesProvider>
    </NavigationContainer>
  );
}
