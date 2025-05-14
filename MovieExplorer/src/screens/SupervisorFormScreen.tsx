import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Platform, StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView,TouchableOpacity, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AddNewMovie, GetMovieById, UpdateMovieRequest } from '../axiosQuery/axiosRequest';
import { useMovies } from '../context/MoviesContext';

const { width, height } = Dimensions.get('window');

const SupervisorFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movieId, isEditing } = route.params || {};
  const { token } = useMovies();

  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    release_year: '',
    rating: '',
    director: '',
    duration: '',
    main_lead: '',
    streaming_platform: '',
    description: '',
    premium: false,
  });
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [existingPosterUrl, setExistingPosterUrl] = useState(null);
  const [existingBannerUrl, setExistingBannerUrl] = useState(null);

  useEffect(() => {
                      console.log(token)
    if (isEditing && movieId && token) {
      const fetchMovieData = async () => {
        setLoading(true);
        try {
          const data = await GetMovieById(movieId, token);
          if (data) {
            setMovieData({
              title: data.title || '',
              genre: data.genre || '',
              release_year: String(data.release_year) || '',
              rating: String(data.rating) || '',
              director: data.director || '',
              duration: String(data.duration) || '',
              main_lead: data.main_lead || '',
              streaming_platform: data.streaming_platform || '',
              description: data.description || '',
              premium: data.premium || false,
            });
            setExistingPosterUrl(data.poster_url || null);
            setExistingBannerUrl(data.banner_url || null);
          } else {
            Alert.alert('Error', 'Failed to fetch movie data');
          }
        } catch (err) {
          console.error('Fetch movie error:', err);
          Alert.alert('Error', 'Failed to fetch movie data');
        } finally {
          setLoading(false);
        }
      };
      fetchMovieData();
    }
  }, [isEditing, movieId, token]);

  const handleInputChange = (field, value) => {
    setMovieData({ ...movieData, [field]: value });
  };

  const pickImage = async (type) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets?.length) {
      const asset = result.assets[0];
      type === 'poster' ? setPoster(asset) : setBanner(asset);
    }
  };

  const handleSubmit = async () => {
    const required = [
      'title',
      'genre',
      'release_year',
      'rating',
      'director',
      'duration',
      'main_lead',
      'streaming_platform',
      'description',
    ];
    const missing = required.filter(f => !movieData[f]);
    if (missing.length || (!isEditing && (!poster || !banner))) {
      Alert.alert(
        'Missing fields',
        [...missing, !poster && 'poster', !banner && 'banner'].filter(Boolean).join(', ')
      );
      return;
    }

    if (!token) {
      Alert.alert('Auth required', 'Please sign in first.');
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
form.append('title', movieData.title);
form.append('genre', movieData.genre);
form.append('release_year', Number(movieData.release_year));
form.append('rating', Number(movieData.rating));
form.append('director', movieData.director);
form.append('duration', Number(movieData.duration));
form.append('main_lead', movieData.main_lead);
form.append('streaming_platform', movieData.streaming_platform);
form.append('description', movieData.description);
form.append('premium', movieData.premium);

      if (poster) {
        form.append('poster', {
          uri: poster.uri,
          type: poster.type || 'image/jpeg',
          name: poster.fileName || 'poster.jpg',
        });
      }
      if (banner) {
        form.append('banner', {
          uri: banner.uri,
          type: banner.type || 'image/jpeg',
          name: banner.fileName || 'banner.jpg',
        });
      }

      if (isEditing) {
        await UpdateMovieRequest(movieId, form, token);
        Alert.alert('Success', 'Movie updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        const res = await AddNewMovie(form, token);
        console.log(res)
        Alert.alert('Success', 'Movie added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.error('Submit error:', err.response?.data || err);
      Alert.alert('Error', isEditing ? 'Failed to update movie' : 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Movie' : 'Add New Movie'}</Text>
      </View>
      <ScrollView style={styles.form}>
        {Object.entries({
          Title: 'title',
          Genre: 'genre',
          'Release Year': 'release_year',
          Rating: 'rating',
          Director: 'director',
          'Duration (mins)': 'duration',
          'Main Lead': 'main_lead',
          'Streaming Platform': 'streaming_platform',
          Description: 'description',
        }).map(([label, field]) => (
          <View key={field} style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, field === 'description' && styles.textArea]}
              placeholder={label}
              placeholderTextColor="#8B8B9E"
              value={String(movieData[field])}
              onChangeText={t => handleInputChange(field, t)}
              keyboardType={
                ['release_year', 'rating', 'duration'].includes(field)
                  ? 'numeric'
                  : 'default'
              }
              multiline={field === 'description'}
              numberOfLines={field === 'description' ? 4 : 1}
            />
          </View>
        ))}

        <View style={styles.group}>
          <Text style={styles.label}>Premium</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={movieData.premium}
              onValueChange={v => handleInputChange('premium', v)}
              dropdownIconColor="#000">
              <Picker.Item label="False" value={false} />
              <Picker.Item label="True" value={true} />
            </Picker>
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Poster Image</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('poster')}>
            <Text style={styles.imagePickerText}>
              {poster?.fileName || (isEditing && existingPosterUrl && 'Poster selected') || 'Choose Poster'}
            </Text>
          </TouchableOpacity>
          {(poster || (isEditing && existingPosterUrl)) && (
            <Image
              source={{ uri: poster ? poster.uri : existingPosterUrl }}
              style={styles.preview}
            />
          )}
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Banner Image</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('banner')}>
            <Text style={styles.imagePickerText}>
              {banner?.fileName || (isEditing && existingBannerUrl && 'Banner selected') || 'Choose Banner'}
            </Text>
          </TouchableOpacity>
          {(banner || (isEditing && existingBannerUrl)) && (
            <Image
              source={{ uri: banner ? banner.uri : existingBannerUrl }}
              style={styles.preview}
            />
          )}
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitText}>{isEditing ? 'Update Movie' : 'Add Movie'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.04,
    paddingHorizontal: width * 0.02,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  form: {
    padding: 16,
  },
  group: {
    marginBottom: 16,
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    color: '#000',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  imagePicker: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  submit: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SupervisorFormScreen;
