import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { plans } from '../constants/plans';
import FooterComponent from '../components/FooterComponent';

const { width, height } = Dimensions.get('window');

const PlansScreen = ({ navigation }: any) => {
  const [selectedPlan, setSelectedPlan] = useState('Basic');

  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={require('../assets/banner.png')} style = {styles.bannerImg}/>

      <View style = {styles.textCont}>
      <Text style = {styles.planText}>Get more out of your search</Text>
      <Text style = {styles.planText}>with plans made just for you.</Text>
      </View>

      <Text style={styles.heading}>Subscription Plans</Text>

      <View style={styles.cardWrapper}>
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.title;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isSelected && styles.selectedCard]}
              activeOpacity={0.9}
              onPress={() => setSelectedPlan(plan.title)}
            >
              {plan.isPopular && !isSelected && <Text style={styles.popularLabel}>MOST POPULAR</Text>}

              <View style={styles.header}>
                <Text style={[styles.title, isSelected && styles.selectedText]}>{plan.title}</Text>
                <Text style={[styles.price, isSelected && styles.selectedText]}>
                  {plan.price}<Text style={styles.month}>/month</Text>
                </Text>
              </View>

              {plan.features.map((feature, i) => (
                <View key={i} style={styles.feature}>
                  <Image
                    source={require('../assets/play_button.png')}
                    style={[styles.icon, isSelected && styles.whiteIcon]}
                  />
                  <Text style={[styles.featureText, isSelected && styles.selectedText]}>{feature}</Text>
                </View>
              ))}

              <TouchableOpacity
                style={[styles.button, isSelected && styles.currentButton]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isSelected ? { color: '#2563EB' } : { color: '#fff' },
                  ]}
                >
                  {index === 0 ? 'Current Plan' : 'Choose Plan'}
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
