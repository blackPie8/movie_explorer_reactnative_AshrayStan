import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import Images from '../constants/Images';
const { width, height } = Dimensions.get('window');

type PaymentRouteParams = {
  params: {
    paymentIntentId: string;
    clientSecret: string;
    planDetails: {
      title: string;
      price: string;
      features: string[];
    };
  };
};

const PaymentGatewayScreen = () => {
  const route = useRoute<RouteProp<PaymentRouteParams, 'params'>>();
  const { paymentIntentId, clientSecret, planDetails } = route.params;
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState(null);

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      setError('Please enter valid card details');
      return;
    }

    try {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {},
        },
      });

      if (error) {
        setError(error.message || 'Payment failed. Please try again.');
        return;
      }

      if (paymentIntent.status === 'Succeeded') {
        navigation.navigate('Payment', { paymentIntentId });
      } else {
        setError('Payment did not succeed. Please try again.');
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Secure Payment</Text>
        <Text style={styles.headerSubtitle}>Enter your card details to proceed</Text>
      </View>

      {/* Billing Summary Section */}
      {planDetails && (
        <View style={styles.billingSummary}>
          <Text style={styles.billingTitle}>Billing Summary</Text>
          <View style={styles.planInfo}>
            <Text style={styles.planTitle}>{planDetails.title}</Text>
            <Text style={styles.planPrice}>
              {planDetails.price}
              <Text style={styles.month}>/month</Text>
            </Text>
          </View>
          {planDetails.features.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Image source={Images.playButton} style={styles.featureIcon} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Card Information</Text>
          <Text style={styles.cardTypes}>Visa • Mastercard • Amex</Text>
        </View>
        <View style={styles.cardFieldContainer}>
          <Text style={styles.fieldLabel}>Card Details</Text>
          <CardField
            postalCodeEnabled={false}
            placeholders={{ number: '4242 4242 4242 4242' }}
            cardStyle={styles.cardStyle}
            style={styles.cardField}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
              if (error && cardDetails?.complete) setError(null);
            }}
          />
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        accessibilityLabel="Pay Now"
        accessibilityRole="button"
      >
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Cancel Payment"
        accessibilityRole="button"
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🔒 Secured by Stripe</Text>
      </View>
    </SafeAreaView>
  );
};

export default PaymentGatewayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingTop: height * 0.04,
    paddingBottom: height * 0.01
  },
  header: {
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: width * 0.035,
    color: '#666666',
    marginTop: height * 0.005,
  },
  cardContainer: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.08,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  billingSummary: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  month: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#666666',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  featureIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#1A1A1A',
  },
  featureText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  cardTypes: {
    fontSize: width * 0.03,
    color: '#666666',
  },
  cardFieldContainer: {
    padding: width * 0.04,
  },
  fieldLabel: {
    fontSize: width * 0.035,
    color: '#666666',
    marginBottom: height * 0.005,
  },
  cardField: {
    width: '100%',
    height: height * 0.065,
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: width * 0.015,
    fontSize: width * 0.04,
  },
  errorContainer: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.02,
    padding: width * 0.03,
    backgroundColor: '#FFF1F1',
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  error: {
    color: '#D32F2F',
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  payButton: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.03,
    backgroundColor: '#2563EB',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  cancelButton: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.015,
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: width * 0.03,
    color: '#666666',
  },
});