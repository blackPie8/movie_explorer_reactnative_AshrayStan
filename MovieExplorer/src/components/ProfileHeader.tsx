import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useMovies } from '../context/MoviesContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProfileHeader = () => {
  const { role, username } = useMovies();
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/user.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>Hi, {username}</Text>
      <View style={styles.roleContainer}>
        <Text style={styles.roleText}>{role}</Text>
      </View>

      { role === 'supervisor' ? (
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Supervisor')}>
        <Image source={require('../assets/pen.png')} style={styles.iconSmall} />
        <Text style={styles.editText}>Add Movie</Text>
      </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton}>
        <Image source={require('../assets/pen.png')} style={styles.iconSmall} />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
      )
      }

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Image source={require('../assets/movie_icon.png')} style={styles.icon} />
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Movies</Text>
        </View>
        <View style={styles.stat}>
          <Image source={require('../assets/review.png')} style={styles.icon} />
          <Text style={styles.statNumber}>48</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Image source={require('../assets/add-friend.png')} style={styles.icon} />
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
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    marginBottom: height * 0.01,
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
    fontSize: width * 0.03,
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
});

export default ProfileHeader;