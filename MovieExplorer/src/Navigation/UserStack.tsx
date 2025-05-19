import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import PlansScreen from '../screens/PlansScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieDetails from '../components/MovieDetails';
import StripeCheckoutComponent from '../components/StripeCheckoutComponent';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentGatewayScreen from '../screens/PaymentGatewayScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
        <Stack.Screen name="Plans" component={PlansScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{headerShown: false}} />
        <Stack.Screen name="Stripe" component={StripeCheckoutComponent} options={{headerShown: false}} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown: false}} />
         <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  );
}
