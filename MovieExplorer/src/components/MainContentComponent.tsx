import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetMoviesData } from '../axiosQuery/axiosRequest';

const MainContentComponent = () => {
  const [movies, setMovies] = useState([]);

  
    const fetchMovies = async () => {
      const data = await GetMoviesData();
      console.log('Movies:', data);
      setMovies(data);
    };

    
  return (
    <View>
      <TouchableOpacity
      onPress={fetchMovies}>
        <Text style = {{paddingTop: 100}}>heeeeeeeeeeee</Text>
      </TouchableOpacity>
      <Text>MainContentComponent</Text>
    </View>
  )
}

export default MainContentComponent

const styles = StyleSheet.create({})