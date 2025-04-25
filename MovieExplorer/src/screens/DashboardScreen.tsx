import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'


const DashboardScreen = () => {
  return (
    <View style = {styles.mainContainer}>
      <HeaderComponent />
      <FooterComponent />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
    justifyContent: 'space-between'
  },
})