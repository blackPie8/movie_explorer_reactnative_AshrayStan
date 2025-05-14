import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

export default function CheckoutScreen() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/payment-sheet', {
        method: 'POST',
      });
      const { clientSecret } = await response.json();
      console.log('Fetched client secret:', clientSecret);
  
      // Delay the initPaymentSheet to ensure the UI is fully initialized
      setTimeout(async () => {
        const { error } = await initPaymentSheet({
          merchantDisplayName: 'Demo Store',
          paymentIntentClientSecret: clientSecret,
        });
  
        if (error) {
          console.log('initPaymentSheet error:', error);
        } else {
          setClientSecret(clientSecret);
        }
      }, 500); // Wait 500ms before calling initPaymentSheet
    } catch (err) {
      console.log('Error fetching client secret:', err);
    }
  };
  useEffect(() => {
    fetchPaymentSheetParams();
  }, []);

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your payment is confirmed!');
    }
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Button title="Checkout" onPress={openPaymentSheet} disabled={!clientSecret} />
    </View>
  );
}
