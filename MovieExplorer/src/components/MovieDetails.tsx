import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMovies } from '../context/MoviesContext';

const { height, width } = Dimensions.get('window');
import { GetMovieById } from '../axiosQuery/axiosRequest';

type Movie = {
  id: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  release_year: string;
  director: string;
  poster_url: string;
  premium: boolean;
  streaming_platform: string;
  main_lead: string;
};

const MovieDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const { token } = useMovies();

  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMovieById(item.id, token);
        setMovieData(result);
      } catch (err) {
        console.log('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item.id]);

  if (loading || !movieData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: movieData.poster_url }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
          style={styles.overlay}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{movieData.title}</Text>
              <Text style={styles.genre}>
                {movieData.genre} • IMDB ⭐ {movieData.rating}
              </Text>
              <Text style={styles.description}>{movieData.description}</Text>

              <Text style={styles.extra}>
                {movieData.director} • {movieData.release_year}
              </Text>
              
              <Text style={styles.extra}>
                Stars: {movieData.main_lead}
              </Text>

              <Text style={styles.extra}>
                Streaming on: {movieData.streaming_platform}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.04,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: height * 0.05,
    paddingLeft: width * 0.025,
    marginBottom: height * 0.025,
  },
  backButton: {
    padding: width * 0.025,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }],
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    paddingBottom: height * 0.0,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.008,
  },
  genre: {
    fontSize: width * 0.04,
    color: '#ccc',
    marginBottom: height * 0.01,
  },
  description: {
    fontSize: width * 0.04,
    color: '#ddd',
    marginBottom: height * 0.012,
  },
  extra: {
    fontSize: width * 0.035,
    color: '#aaa',
    marginBottom: height * 0.005,
  },
});
