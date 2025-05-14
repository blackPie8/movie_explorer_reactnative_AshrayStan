import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useMovies } from '../context/MoviesContext';
import { checkSubscriptionStatus } from '../axiosQuery/axiosRequest';

type PaymentRouteParams = {
  params: {
    url: string;
    session: string;
  };
};


const PaymentScreen = () => {
  const route = useRoute<RouteProp<PaymentRouteParams, 'params'>>();
  const { url, session } = route.params;
  const navigation = useNavigation();
    const { token } = useMovies();

  const [hasReachedSuccessUrl, setHasReachedSuccessUrl] = useState(false);
  const [finalRedirectUrl, setFinalRedirectUrl] = useState<string | null>(null);

  // const successUrl = "http://localhost:5173/success?session_id=${session}";

  const handleNavigationChange = async(navState) => {
    const currentUrl = navState.url;
    // console.log('Navigated to:', currentUrl);

    if(currentUrl.includes('success')) { 
      console.log('Success URL reached:', currentUrl);
      setHasReachedSuccessUrl(true);
      
      let x = await checkSubscriptionStatus(token);
      console.log(x?.status === 200 ? 'Subscription status fetched successfully' : 'Failed to fetch subscription status');
      if (x?.status === 200) {
        navigation.replace('Dashboard');
      }
    }

     else if (hasReachedSuccessUrl && !finalRedirectUrl) {
      setFinalRedirectUrl(currentUrl);
      console.log('Final redirected URL after success:', currentUrl);
      
      navigation.replace('Plans'); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} testID="payment-screen">
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});