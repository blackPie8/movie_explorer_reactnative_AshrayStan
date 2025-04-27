import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MovieCardItem = ({ item }) => {
  return (
    <View style={styles.movieCard}>
      <Image
        source={require("../assets/movie1.jpg")}
        style={styles.movieImage}
        resizeMode="cover"
      />
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
});

