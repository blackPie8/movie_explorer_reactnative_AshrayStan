import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { plans } from '../constants/plans';
import FooterComponent from '../components/FooterComponent';
import { useMovies } from '../context/MoviesContext';
import { createSubscription } from '../axiosQuery/axiosRequest';
import Images from '../constants/Images';

const { width, height } = Dimensions.get('window');

const PlansScreen = ({ navigation }) => {
  const { token, currentPlan, status, planDuration } = useMovies();
  const [selectedPlan, setSelectedPlan] = useState(currentPlan || 'basic');

  useEffect(() => {
    if (currentPlan) {
      setSelectedPlan(currentPlan);
    }
  }, [currentPlan]);

  const handlePayment = async (planType) => {
    if (planType === currentPlan) {
      Alert.alert('Info', 'This is already your current plan.');
      return;
    }

    if(currentPlan === 'free'){
    try {
      const res = await createSubscription(planType, token);
      console.log('Subscription response:', res);

      const selectedPlanDetails = plans.find((plan) => plan.planType === planType);

      navigation.navigate('PaymentGateway', {
        paymentIntentId: res.payment_intent_id,
        clientSecret: res.client_secret,
        planDetails:{
          title: selectedPlanDetails.title,
          price: selectedPlanDetails.price,
          features: selectedPlanDetails.features,
        }
      });
    } catch (error) {
      console.error('Payment initiation failed:', error);
      Alert.alert('Error', 'Failed to initiate payment');
    }
  } else{
    Alert.alert(`You have an active ${currentPlan} plan subscription currently!`)
  } 

  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={Images.banner} style={styles.bannerImg} />

        <View style={styles.textCont}>
          <Text style={styles.planText}>Get more out of your search</Text>
          <Text style={styles.planText}>with plans made just for you.</Text>
        </View>

        <Text style={styles.heading}>Subscription Plans</Text>

        <View style={styles.cardWrapper}>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.planType;
            const isCurrentPlan = currentPlan === plan.planType;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.card, isSelected && styles.selectedCard]}
                activeOpacity={0.9}
                onPress={() => setSelectedPlan(plan.planType)}
              >
                {plan.isPopular && !isSelected && (
                  <Text style={styles.popularLabel}>MOST POPULAR</Text>
                )}

                <View style={styles.header}>
                  <Text style={[styles.title, isSelected && styles.selectedText]}>
                    {plan.title}
                  </Text>
                  <Text style={[styles.price, isSelected && styles.selectedText]}>
                    {plan.price}
                    <Text style={styles.month}>{plan.duration}</Text>
                  </Text>
                </View>

                {plan.features.map((feature, i) => (
                  <View key={i} style={styles.feature}>
                    <Image
                      source={Images.playButton}
                      style={[styles.icon, isSelected && styles.whiteIcon]}
                    />
                    <Text
                      style={[styles.featureText, isSelected && styles.selectedText]}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}

                { isCurrentPlan &&
                  <Text style={[styles.planEndDate, isSelected && styles.selectedText]}>
                  Plan ends on: {new Date(planDuration).toLocaleString('en-US',{
                        month: 'long',
                        day: 'numeric',
                  }
                  )}
                  </Text>
                }

                <TouchableOpacity
                  style={[styles.button, isSelected && styles.currentButton]}
                  activeOpacity={0.8}
                  onPress={() => handlePayment(plan.planType)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isSelected ? { color: '#2563EB' } : { color: '#fff' },
                    ]}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <FooterComponent />
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  heading: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#111827',
    paddingHorizontal: width * 0.045,
    paddingTop: height * 0.03,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.045,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.05,
    marginBottom: height * 0.025,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    height: height * 0.32,
    width: width * 0.9,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  selectedCard: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  planEndDate: {
  fontSize: 14,
  color: 'red',
  marginVertical: 8,
  textAlign: 'center',
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#111827',
  },
  price: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#111827',
  },
  month: {
    fontSize: width * 0.035,
    fontWeight: 'normal',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  icon: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: '#333',
    marginRight: width * 0.02,
  },
  whiteIcon: {
    tintColor: '#fff',
  },
  featureText: {
    fontSize: width * 0.035,
    color: '#333',
  },
  button: {
    marginTop: height * 0.02,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  currentButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  popularLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width * 0.03,
    marginBottom: height * 0.01,
  },
  arrowImg: {
    height: width * 0.05,
    width: width * 0.05,
    transform: [{ rotate: '180deg' }]
  },
  goBackCont: {
    flexDirection: 'row',
    gap: width * 0.015,
    alignItems: 'center',
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.045,
    paddingTop: height * 0.06,
  },
  goBackText: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#111827',
  },
  bannerImg: {
    height: height * 0.3,
    width: width,
  },
  textCont: {
    paddingHorizontal: width * 0.028,
    paddingTop: height * 0.04,
  },
  planText: {
    fontSize: width * 0.07,
    fontWeight: '800',
  },
});
