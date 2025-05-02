import { StyleSheet, Text, TextInput, View, Dimensions, Image, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMovies } from '../context/MoviesContext';

const { height, width } = Dimensions.get('window');

const SearchInputComponent = ({ setFilteredMovies, setIsSearching }) => {
  const { movies } = useMovies();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const suggestions = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
      debouncedQuery.trim().length > 0
  );

  const handleSearch = () => {
    const results = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) &&
        query.trim().length > 0
    );
    setFilteredMovies(results);
    setIsSearching(true);
    setShowSuggestions(false);
  };

  const handleSuggestionTap = (title: string) => {
    setQuery(title);
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredMovies(results);
    setIsSearching(true);
    setShowSuggestions(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search movies, actors, directors..."
          style={styles.input}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setIsSearching(false);
            setShowSuggestions(true);
          }}
          onSubmitEditing={handleSearch}
          autoFocus
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.slice(0, 5).map((movie) => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => handleSuggestionTap(movie.title)}
            >
              <Text style={styles.suggestionText}>{movie.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchInputComponent;

const styles = StyleSheet.create({
  container: {
    height: height * 0.06,
    borderRadius: width * 0.05,
    backgroundColor: '#EFEFEF',
    marginTop: height * 0.03,
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    gap: width * 0.01,
  },
  input: {
    fontSize: width * 0.04,
    flex: 1,
  },
  searchIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: '#999',
  },
  suggestionsBox: {
    backgroundColor: '#fff',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.01,
    borderRadius: width * 0.02,
    padding: width * 0.03,
    elevation: 2,
  },
  suggestionText: {
    fontSize: width * 0.04,
    paddingVertical: height * 0.006,
  },
});
