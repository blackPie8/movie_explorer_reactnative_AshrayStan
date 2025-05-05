import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCardItem from './MovieCardItem'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const GenreFilterButtons = ({ movies }) => {
  const navigation = useNavigation();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState(['All']);

  useEffect(() => {
    if (movies.length > 0) {
      const uniqueGenres = Array.from(new Set(movies.map(movie => movie.genre)));
      setGenres(['All', ...uniqueGenres]);
      setFilteredMovies(movies);
    }
  }, [movies]);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) => movie.genre?.toLowerCase() === selectedGenre.toLowerCase()
      );
      setFilteredMovies(filtered);
    }
  }, [selectedGenre, movies]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('MovieDetails', {item})}>
    <MovieCardItem item={item} />
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.genreScroll}
      >
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            onPress={() => setSelectedGenre(genre)}
            style={[
              styles.genreButton,
              selectedGenre === genre && styles.selectedGenreButton
            ]}
          >
            <Text style={[
              styles.genreButtonText,
              selectedGenre === genre && styles.selectedGenreButtonText
            ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.trendingText}>Trending Now</Text>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: height * 0.1 }}
        scrollEnabled={false}
      />
    </View>
  )
}

export default GenreFilterButtons

const styles = StyleSheet.create({
  genreScroll: {
    paddingHorizontal: width * 0.025,
    marginBottom: height * 0.025,
  },
  genreButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.05,
    marginRight: width * 0.025,
  },
  selectedGenreButton: {
    backgroundColor: '#2563EB',
  },
  genreButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: width * 0.035,
  },
  selectedGenreButtonText: {
    color: '#FFFFFF',
  },
  trendingText: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#000',
    marginLeft: width * 0.05,
    marginBottom: height * 0.015,
    paddingTop: height * 0.03,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: height * 0.02,
  },
});
