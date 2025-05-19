import AppNavigation from './src/Navigation/AppNavigation'
import React, { useEffect } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {

  return (
    <StripeProvider 
    publishableKey='pk_test_51RKDf4IS7GvTiu3zYWZzTGMJPwdUtnO0Q8kvI9YnfOL3bwBerxGsmvxSHXJf8TrMCqnqzJ0YDsCGjplq7X1UyQMD00RidEgjO9'
    >
    <AppNavigation />
    </StripeProvider>
  )
}

export default App