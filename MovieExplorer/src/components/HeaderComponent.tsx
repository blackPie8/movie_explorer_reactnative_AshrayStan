import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HeaderComponent = ({ showInput = false }) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  if (!showInput) {
    return (
      <TouchableOpacity
        style={styles.fakeSearchBar}
        onPress={() => navigation.navigate('Search')}
      >
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <Text style={styles.fakeSearchText}>Search movies, actors, directors...</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.searchBar}>
      <Image source={require('../assets/search.png')} style={styles.searchIcon} />
      <TextInput
        placeholder="Search movies, actors, directors..."
        placeholderTextColor="#999"
        value={query}
        style={styles.input}
      />
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  fakeSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    height: height * 0.06,
    marginTop: height * 0.02,
  },
  fakeSearchText: {
    color: '#999',
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    height: height * 0.07,
  },
  searchIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: '#999',
  },
  input: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
});
