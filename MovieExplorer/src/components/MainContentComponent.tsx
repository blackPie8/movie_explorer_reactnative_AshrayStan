import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import SliderComponent from './SliderComponent';
import GenreFilterButtons from './GenreFilterButtons';
import { useMovies } from '../context/MoviesContext';

const { width, height } = Dimensions.get('window');

const MainContentComponent = () => {

const { movies } = useMovies();

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
    fontWeight: '600',
    color: '#000',
    marginLeft: width * 0.05,
    marginBottom: height * 0.01,
    paddingTop: height* 0.02,
    paddingBottom: height*0.008
  },
  genreButtons:{
    paddingTop: height * 0.02
  }
})
