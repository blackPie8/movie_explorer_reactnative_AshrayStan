import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useMovies } from '../context/MoviesContext';
import FilterButtonTwo from './FilterButtonTwo';
import MovieCardItem from './MovieCardItem';

const { height, width } = Dimensions.get('window');

const SearchResultComponent = () => {
  const { filteredMovies, handleMoviePress, apiGenre, loading } = useMovies();

  const renderMovieItem = ({ item }) =>
  <TouchableOpacity onPress={() => handleMoviePress(item)}>
  <MovieCardItem item={item} />
  </TouchableOpacity>
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Your Interest</Text>
      <FilterButtonTwo />

      {
        !apiGenre ? (
          <Text style = {styles.heading}>Browse</Text>
        ) : (
          <Text style={styles.heading}>Browse {apiGenre}</Text>
        )
      }
      
    {
      loading ? (
        <ActivityIndicator size={28} color="#0000ff" />
      ) : 
      (
              <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={filteredMovies}
        renderItem={renderMovieItem}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
      )
    }
    </View>
  );
};

export default SearchResultComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.035,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: '500',
    marginBottom: height * 0.015,
    paddingLeft: width * 0.025,
  },
  listContainer: {
    paddingBottom: height * 0.02,
  },
});