import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { useMovies } from '../context/MoviesContext';
import { genre as genreData } from '../constants/tabs';

const { height, width } = Dimensions.get('window');

const FilterButtonTwo = () => {
  const { movies, setApiGenre } = useMovies();

  const popularGenre = [...new Set(movies.map((movie) => movie.genre ))];

  return (
    <View style={styles.container}>
      {popularGenre.map((genreName, index) => {
        const genreItem = genreData.find((item) => item.name === genreName);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => setApiGenre(genreName)}
            style={styles.button}
          >
            <ImageBackground
              source={genreItem?.icon}
              style={styles.imageBackground}
              imageStyle={{ borderRadius: width * 0.02 }}
            >
              <Text style={styles.buttonText}>{genreName}</Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FilterButtonTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.025,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
    width: width * 0.44,
    height: height * 0.065,
    margin: width * 0.015,
  },
  buttonText: {
    fontSize: width * 0.045,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.02,
  },
});
