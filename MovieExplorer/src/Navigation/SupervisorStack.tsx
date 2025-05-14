import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieDetails from '../components/MovieDetails';
import PlansScreen from '../screens/PlansScreen';
import SupervisorFormScreen from '../screens/SupervisorFormScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function SupervisorStack() {
  return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
        <Stack.Screen name="Plans" component={PlansScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{headerShown: false}} />
        <Stack.Screen name="Supervisor" component={SupervisorFormScreen} options={{headerShown: false}} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  );
}
