import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MovieCardItem from './MovieCardItem';
import { useNavigation } from '@react-navigation/native';
import { useMovies } from '../context/MoviesContext';
import { GetMoviesByGenre, GetMoviesData } from '../axiosQuery/axiosRequest';

const { width, height } = Dimensions.get('window');

const GenreFilterButtons = () => {
  const { movies, handleMoviePress } = useMovies();
  const navigation = useNavigation();

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const genres = ['All', 'Action', 'Comedy', 'Sci-Fi', 'Thriller', 'Crime'];

  useEffect(() => {
    setAllMovies(movies);
    setFilteredMovies(movies);
  }, [movies]);

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
    setPage(1);
    setHasMore(true);
    setLoading(true);

    if (genre === 'All') {
      try {
        const page1Movies = await GetMoviesData(1);
        setAllMovies(page1Movies);
        setFilteredMovies(page1Movies);
        if (page1Movies.length < 10) setHasMore(false);
      } catch (err) {
        console.log("Error fetching all movies:", err);
        setAllMovies([]);
        setFilteredMovies([]);
      }
    } else {
      try {
        const genreMovies = await GetMoviesByGenre(genre);
        setFilteredMovies(genreMovies);
        setAllMovies(genreMovies);
        if (genreMovies.length < 10) setHasMore(false);
      } catch (error) {
        console.log("Error fetching movies by genre:", error);
      }
    }

    setLoading(false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (selectedGenre === 'All') {
      // Re-fetch from API instead of using context movies
      const refreshAll = async () => {
        try {
          setLoading(true);
          const page1 = await GetMoviesData(1);
          setAllMovies(page1);
          setFilteredMovies(page1);
          setPage(1);
          setHasMore(page1.length >= 10);
        } catch (err) {
          console.error("Error reloading movies:", err);
        }
        setLoading(false);
      };

      refreshAll();
    }
  }, [movies]);


  useEffect(() => {
    const fetchMoreMovies = async () => {
      setLoading(true);
      const newMovies = await GetMoviesData(page);

      if (newMovies && newMovies.length > 0) {
        const combined = [...allMovies, ...newMovies];
        const uniqueMovies = Array.from(new Map(combined.map(item => [item.id, item])).values());
        setAllMovies(uniqueMovies);

        const updatedFiltered =
          selectedGenre === 'All'
            ? uniqueMovies
            : uniqueMovies.filter(
              (movie) => movie.genre?.toLowerCase() === selectedGenre.toLowerCase()
            );

        setFilteredMovies(updatedFiltered);

        if (newMovies.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    };

    if (page > 1) {
      fetchMoreMovies();
    }
  }, [page]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleMoviePress(item)}
    >
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
            onPress={() => handleGenreSelect(genre)}
            style={[
              styles.genreButton,
              selectedGenre === genre && styles.selectedGenreButton,
            ]}
          >
            <Text
              style={[
                styles.genreButtonText,
                selectedGenre === genre && styles.selectedGenreButtonText,
              ]}
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.trendingText}>Browse {selectedGenre}</Text>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderMovieItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.contentScroll}
          scrollEnabled={false}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 16 }} />
            ) : hasMore ? (
              <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.endText}>Oops, You scrolled too far</Text>
            )
          }

        />
      )}
    </View>
  );
};

export default GenreFilterButtons;

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
  contentScroll: {
    paddingBottom: height * 0.02
  },
  loadMoreButton: {
    backgroundColor: '#2563EB',
    alignSelf: 'center',
    marginBottom: height * 0.025,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.02,
  },
  loadMoreText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: '600'
  },
  endText: {
    textAlign: 'center',
    marginBottom: height * 0.01,
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#404245'
  }
});
