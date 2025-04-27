import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetMoviesData } from '../axiosQuery/axiosRequest';
import SliderComponent from './SliderComponent';
import GenreFilterButtons from './GenreFilterButtons';

const { width, height } = Dimensions.get('window');

const MainContentComponent = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const fetchMovies = async () => {
    const data = await GetMoviesData();
    console.log('Movies:', data);
    setMovies(data);
    setFilteredMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View>
      <Text style={styles.heading}>Featured</Text>
      {movies.length > 0 && (
        <SliderComponent movies={movies} />
      )}
      <View style = {styles.genreButtons}>
      <GenreFilterButtons movies={movies}/>
      </View>
    </View>
  )
}

export default MainContentComponent

const styles = StyleSheet.create({
  heading: {
    fontSize: width * 0.05,
    fontWeight: '500',
    color: '#000',
    marginLeft: width * 0.05,
    marginBottom: height * 0.01,
    paddingTop: height* 0.03,
    paddingBottom: height*0.008
  },
  genreButtons:{
    paddingTop: height * 0.02
  }
})
