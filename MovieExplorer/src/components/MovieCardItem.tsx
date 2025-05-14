import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useMovies } from '../context/MoviesContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MovieCardItem = ({ item }) => {
    const { role } = useMovies();
    const isSupervisor = role === 'supervisor'
      const navigation = useNavigation();

    const handleEditClick = (movieId) => {
      navigation.navigate('Supervisor',{movieId, isEditing : true})
    }

  return (
    <View style={styles.movieCard}>
      <Image
        source={{uri:item.poster_url}}
        style={[styles.movieImage, 
          item.premium && { borderColor: 'gold', borderWidth: 3 }
        ]}
        resizeMode="cover"
      />
      { item.premium && (
        <View style = {styles.premiumCont}>
      <Text style = {styles.premiumText}>PREMIUM</Text>
      </View>
      )
      }
      {
        isSupervisor && (
          <View style = {styles.iconCont}>
            <TouchableOpacity onPress={() => handleEditClick(item.id)}>
            <Image source={require('../assets/pen.png')} style = {styles.penImg}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={require('../assets/trash-bin.png')} style = {styles.trashIcon} />
            </TouchableOpacity>
          </View>
      )
    }
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.movieInfoRow}>
        <Text style={styles.movieYear}>{item.release_year}</Text>
        <View style={styles.ratingContainer}>
          <Image 
            source={require("../assets/star.png")} 
            style={styles.starImage}
          />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieCardItem;

const styles = StyleSheet.create({
  movieCard: {
    width: width * 0.42,
    margin: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: width * 0.04,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: width * 0.6,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    borderRadius: width * 0.04,
    
  },
  movieTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: height * 0.008,
    marginHorizontal: width * 0.02,
    color: '#000',
  },
  movieInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.02,
    marginBottom: height * 0.008,
    alignItems: 'center',
  },
  movieYear: {
    fontSize: width * 0.035,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: width * 0.04,
    height: width * 0.04,
    marginRight: width * 0.01,
  },
  ratingText: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#000',
  },
  penImg: {
    height : height * 0.02,
    width : width * 0.05,
    tintColor: '#fff'
  },
  iconCont:{
    position: 'absolute',
    top: 10,
    right: 20,
    gap: 100,
    flexDirection: 'row'
  },
  trashIcon:{
    height : height * 0.02,
    width : width * 0.05,
    tintColor: '#fff'
  },
  premiumText:{
    fontWeight: '600',
    padding: 5
  },
  premiumCont:{
    backgroundColor: 'gold',
    position: 'absolute',
    bottom: 62,
    left: 50,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  }
});

