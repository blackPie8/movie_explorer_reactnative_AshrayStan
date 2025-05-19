import { StyleSheet, SafeAreaView, ActivityIndicator, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useMovies } from '../context/MoviesContext';
import { confirmSubscription, checkSubscriptionStatus } from '../axiosQuery/axiosRequest';

type PaymentRouteParams = {
  params: {
    paymentIntentId: string;
  };
};

const PaymentScreen = () => {
  const route = useRoute<RouteProp<PaymentRouteParams, 'params'>>();
  const { paymentIntentId } = route.params;
  const navigation = useNavigation();
  const { token, fetchCurrentPlan } = useMovies();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentConfirmation = async () => {
    try {
      console.log('PaymentScreen: Checking subscription status first with token:', token);
      const statusResponse = await checkSubscriptionStatus(token);
      console.log('PaymentScreen: Full status response:', statusResponse.data);

      // Adjust this condition based on the actual response structure
      if (statusResponse?.data?.status === 'active') {
        console.log('PaymentScreen: Subscription is already active, navigating to Dashboard');
        navigation.replace('Dashboard');
        return;
      } else {
        console.log('PaymentScreen: Subscription not active, response:', statusResponse.data);
      }

      console.log('PaymentScreen: Confirming payment with paymentIntentId:', paymentIntentId);
      const confirmResponse = await confirmSubscription(paymentIntentId, token);
      console.log('PaymentScreen: Confirm response:', confirmResponse.data);

      if (confirmResponse.status === 200) {
        console.log('PaymentScreen: Payment confirmed successfully');
        const updatedStatusResponse = await checkSubscriptionStatus(token);
        console.log('PaymentScreen: Updated status response:', updatedStatusResponse.data);

        if (updatedStatusResponse?.data?.status === 'active') {
          console.log('PaymentScreen: Subscription is active, navigating to Dashboard');
          await fetchCurrentPlan()
          navigation.replace('Plans');
        } else {
          console.log('PaymentScreen: Subscription not active after confirmation');
          setError('Subscription not activated. Please try again or contact support.');
          setIsLoading(false);
        }
      } else {
        console.log('PaymentScreen: Payment confirmation failed');
        setError('Payment confirmation failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('PaymentScreen: Error during payment confirmation:', err);
      setError('An error occurred while confirming your subscription. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePaymentConfirmation();
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    handlePaymentConfirmation();
  };

  return (
    <SafeAreaView style={styles.container} testID="payment-screen">
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.message}>Processing your payment...</Text>
        </>
      ) : error ? (
        <>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={handleRetry} />
          <Button title="Back to Plans" onPress={() => navigation.replace('Plans')} />
        </>
      ) : (
        <Text style={styles.message}>Payment status unknown. Please wait...</Text>
      )}
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});