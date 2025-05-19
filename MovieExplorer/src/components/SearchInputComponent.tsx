import { StyleSheet, Text, TextInput, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { searchMovies, getSuggestions } from '../axiosQuery/axiosRequest';

const { height, width } = Dimensions.get('window');

const SearchInputComponent = ({ setFilteredMovies, setIsSearching }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Fetch suggestions as user types
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      const results = await getSuggestions(searchTerm);
      setSuggestions(results);
    } catch (error) {
      console.log("Error fetching suggestions:", error?.response?.data || error.message);
    }
  };

  const handleSearch = async () => {
    if (query.trim().length === 0) return;
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setFilteredMovies(results);
      setIsSearching(true);
    } catch (error) {
      console.log("Error during search:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionTap = async (title) => {
    setQuery(title);
    setLoading(true);
    try {
      const results = await searchMovies(title);
      setFilteredMovies(results);
      setIsSearching(true);
    } catch (error) {
      console.log("Error on suggestion tap:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
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

      {loading && (
        <ActivityIndicator size="small" color="#888" style={{ marginTop: 10 }} />
      )}

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