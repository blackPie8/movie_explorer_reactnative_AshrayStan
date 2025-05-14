import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import React from 'react'
import FooterComponent from '../components/FooterComponent'
import ProfileHeader from '../components/ProfileHeader'
import ProfileSettings from '../components/ProfileSettings';

const { height, width } = Dimensions.get('window');

const ProfileScreen = () => {
  return (
    <View style = {styles.parentCont}>
    <ScrollView 
    style = {styles.container}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator = {false}
    >
      <ProfileHeader />
      <ProfileSettings />
    </ScrollView>
    <FooterComponent />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: width * 0.01,
    paddingTop: height * 0.035,
  },
  parentCont:{
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.055,
    paddingBottom: height * 0.05,
  },
})