import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator,
} from 'react-native';
import {useMovies} from '../context/MoviesContext';
import {useNavigation} from '@react-navigation/native';
import Images from '../constants/Images';
import {launchImageLibrary} from 'react-native-image-picker';
import { addProfilePicture, cancelSubscription, showProfilePicture, } from '../axiosQuery/axiosRequest';

const {width, height} = Dimensions.get('window');

const ProfileHeader = () => {
  const { role, username, currentPlan, token, fetchCurrentPlan, status, profileImage, loadingProfileImage, setProfileImage, fetchProfileImage, } = useMovies();
  const navigation = useNavigation();
  const isBasic = currentPlan === 'basic';
  const isPremium = currentPlan === 'premium';

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      if (!asset?.uri) return;

      const formData = new FormData();
      formData.append('profile_picture', {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `profile_${Date.now()}.jpg`,
      });

      try {
        await addProfilePicture(formData, token);
        const updatedUrl = await showProfilePicture(token);
        if (updatedUrl) {
          setProfileImage(`${updatedUrl}?${Date.now()}`);
        }

        Alert.alert('Success', 'Profile picture updated.');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile picture.');
      }
    });
  };

  useEffect(() => {
      fetchProfileImage(token);
  }, [token]);

  const handleCancelSubscription = async () => {
    if (!(isBasic || isPremium)) {
      Alert.alert('No Active Plan', 'Please buy a plan first.');
      return;
    }
    Alert.alert(
      `Are you sure you want to cancel your ${currentPlan} plan subscription!`,
      '',
      [
        {
          text: 'Back',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await cancelSubscription(token);
              await fetchCurrentPlan(); // active refresh
              Alert.alert('Success', 'Subscription cancelled', [
                {text: 'OK', onPress: () => navigation.replace('Dashboard')},
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel subscription.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatarWrapper,
          isPremium && styles.premiumBorder,
          isBasic && styles.basicBorder,
        ]}>

        {loadingProfileImage ? (
          <ActivityIndicator size="small" color="#888" />
          ) : (
          <Image
          source={profileImage ? { uri: profileImage } : Images.user}
          style={styles.avatar}
          />
          )}
      </View>

      <Text style={styles.name}>Hi, {username}</Text>

      <TouchableOpacity>
        <View
          style={[
            styles.roleContainer,
            isPremium && styles.premiumCont,
            isBasic && styles.basicCont,
          ]}>
          <Text
            style={[
              styles.roleText,
              isPremium && styles.premiumText,
              isBasic && styles.basicText,
            ]}>
            {' '}
            {currentPlan}
          </Text>
        </View>
      </TouchableOpacity>

      {role === 'supervisor' ? (
        <View style={styles.parentPlanCont}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Supervisor')}>
            <Image
              source={require('../assets/pen.png')}
              style={styles.iconSmall}
            />
            <Text style={styles.editText}>Add Movie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => pickImage()}>
            <Image source={Images.photo} style={styles.iconSmall} />
            <Text style={styles.editText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.parentPlanCont}>
          {status === 'active' ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleCancelSubscription()}>
              <Image source={Images.cancel} style={styles.iconSmall} />
              <Text style={styles.editText}>Cancel Plan</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => pickImage()}>
            <Image source={Images.photo} style={styles.iconSmall} />
            <Text style={styles.editText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Image
            source={require('../assets/movie_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Movies</Text>
        </View>
        <View style={styles.stat}>
          <Image source={require('../assets/review.png')} style={styles.icon} />
          <Text style={styles.statNumber}>48</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Image
            source={require('../assets/add-friend.png')}
            style={styles.icon}
          />
          <Text style={styles.statNumber}>234</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: height * 0.01,
    backgroundColor: '#EFEFEF',
  },
  avatar: {
    width: width * 0.24,
    height: height * 0.11,
    borderRadius: width * 0.12,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  roleContainer: {
    backgroundColor: '#2563EB',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    borderRadius: width * 0.03,
    marginTop: height * 0.005,
  },
  roleText: {
    color: '#fff',
    fontSize: width * 0.035,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.025,
    borderColor: '#4e524f',
    marginTop: height * 0.015,
  },
  avatarWrapper: {
    padding: width * 0.01, // was 10
    borderRadius: width * 0.24, // matches avatar width
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  premiumBorder: {
    borderWidth: width * 0.008, // was 3
    borderColor: 'gold',
  },
  basicBorder: {
    borderWidth: width * 0.008,
    borderColor: 'silver',
  },
  premiumCont: {
    backgroundColor: 'gold',
  },
  basicCont: {
    backgroundColor: '#b7b7b7',
  },
  premiumText: {
    fontSize: width * 0.035,
    fontWeight: '500',
    color: 'black',
  },
  basicText: {
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  parentPlanCont: {
    flexDirection: 'row',
    gap: width * 0.025, // was 10
  },
  editText: {
    marginLeft: width * 0.015,
    fontSize: width * 0.035,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: height * 0.03,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: '600',
    fontSize: width * 0.04,
    marginTop: height * 0.005,
  },
  statLabel: {
    color: '#666',
    fontSize: width * 0.032,
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#2563EB',
  },
  iconSmall: {
    width: width * 0.04,
    height: width * 0.04,
  },
  premiumUser: {
    borderWidth: width * 0.008, // was 3
    borderRadius: width * 0.25, // was 100
    padding: width * 0.025, // was 10
    borderColor: 'gold',
  },
});

export default ProfileHeader;
