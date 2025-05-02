import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, FlatList } from 'react-native';
import GenreSearchResultComponent from '../components/GenreSearchResultComponent';
import FooterComponent from '../components/FooterComponent';
import SearchInputComponent from '../components/SearchInputComponent';
import MovieCardItem from '../components/MovieCardItem';

const { height, width } = Dimensions.get('window')

const SearchScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  return (
    <View style={styles.container}>
      <View style = {styles.searchCompStyle}>
        <Text style = {styles.headerText}>Explore</Text>
          <SearchInputComponent 
          setFilteredMovies={setFilteredMovies}
          setIsSearching={setIsSearching}
          />
      </View>
      <View style={styles.scrollArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isSearching ? (
            <>
            <Text style={styles.heading}>Results</Text>
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCardItem item={item} />}
              numColumns={2}
              contentContainerStyle={{ padding: 10 }}
              scrollEnabled= {false}
            />
            </>
          ) : (
            <GenreSearchResultComponent />
          )}
        </ScrollView>
      </View>
      <FooterComponent />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: '500',
    marginVertical: height * 0.01,
    paddingLeft: width * 0.045,
  },
  searchCompStyle:{
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.035,
    paddingBottom: height * 0.015,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20
  },
  headerText:{
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.035,
  }
});