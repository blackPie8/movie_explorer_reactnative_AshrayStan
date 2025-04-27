import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
import MainContentComponent from '../components/MainContentComponent'

const { height, width } = Dimensions.get('window');

const DashboardScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <HeaderComponent />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MainContentComponent />
      </ScrollView>
      <FooterComponent />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.035,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

