import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
import MainContentComponent from '../components/MainContentComponent'
import Notifications from '../pushNotification/notifications'

const { height, width } = Dimensions.get('window');

const DashboardScreen = () => {
  return (
<View style={styles.mainContainer}>
  <Notifications />
  
  <View style={styles.searchStyle} testID="search-container">
    <Text style={styles.title} testID="dashboard-title">MovieExplor</Text>
    <HeaderComponent showInput={false} />
  </View>

  <ScrollView
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    testID="scroll-view"
  >
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
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.035,
  },
  searchStyle:{
    marginBottom: height * 0.01
  }
});