import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LogoutRequest } from '../axiosQuery/axiosRequest';
import { useMovies } from '../context/MoviesContext';

const { width, height } = Dimensions.get('window');

const ProfileSettings = () => {
    const navigation = useNavigation();
      const { token } = useMovies();

     const handelSignOut = async() => {
    const res = await LogoutRequest(token);
    console.log(res.data);
   }

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Preferences</Text>
        <View style={styles.tagsContainer}>
          {['Action', 'Sci-Fi', 'Drama', 'Thriller'].map(tag => (
            <TouchableOpacity key={tag}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
            </TouchableOpacity>
          ))}
        </View>

        {[
          { label: 'Notification Preferences', icon: require('../assets/notification.png') },
          { label: 'Privacy Settings', icon: require('../assets/insurance.png') },
          { label: 'Language Settings', icon: require('../assets/language.png') },
        ].map((item, index) => (
          <TouchableOpacity key={index}>
          <View style={styles.settingItem} key={index}>
            <Image source={item.icon} style={styles.iconSetting} />
            <Text style={styles.settingText}>{item.label}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        {[
          { label: 'Help & Support', icon: require('../assets/help.png') },
          { label: 'Terms of Service', icon: require('../assets/terms-and-conditions.png') },
          { label: 'Log Out', icon: require('../assets/logout.png'), isDanger: true },
        ].map((item, index) => (
          <TouchableOpacity key={index} 
          onPress={ async()=> {
            await handelSignOut();

            if(item.isDanger){
            navigation.replace('Login') 
            }
          }}>
          <View style={styles.settingItem}>
            <Image source={item.icon} style={[ styles.iconSetting, item.isDanger && {tintColor: '#eb2323'} ]} />
            <Text style={[styles.settingText, item.isDanger && { color: '#eb2323' }]}>
              {item.label}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.03,
    backgroundColor: '#EFEFEF',
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    marginBottom: height * 0.015,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 0.025,
    marginBottom: height * 0.025,
  },
  tag: {
    backgroundColor: '#2563EB',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.007,
    borderRadius: width * 0.04,
  },
  tagText: {
    fontSize: width * 0.033,
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderColor: '#eee',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: width * 0.025,
    marginVertical: height * 0.007,
  },
  iconSetting: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.03,
    tintColor: '#4e524f',
  },
  settingText: {
    fontSize: width * 0.04,
  },
});

export default ProfileSettings;