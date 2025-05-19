import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, ActivityIndicator, } from 'react-native';
import { LoginRequest } from '../axiosQuery/axiosRequest';
import { useMovies } from '../context/MoviesContext';
import Images from '../constants/Images';
import Texts from '../constants/Texts';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { setRole, setToken, setUsername } = useMovies();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required.');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required.');
      return false;
    }
    return true;
  };

  const accountValidation = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        session: {
          email: email,
          password: password,
        },
      };

      const res: any = await LoginRequest(payload);
      console.log('Login response:', res.data);
      const { user, token } = res.data;

      if (user.email === email) {
        setRole(user.role);
        setUsername(user.first_name);
        setToken(token);
        Alert.alert('Success', 'Logged in successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (err: any) {
      // console.error('Login error:', err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.error || 'Invalid email or password.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Image source={Images.email} style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={Images.password} style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.signInButton, isLoading && styles.disabledButton]}
        onPress={accountValidation}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signInText}>{Texts.signIn}</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={Images.google} style={styles.socialIcon} />
        <Text style={styles.socialText}>{Texts.googleLogin}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={Images.apple} style={styles.socialIcon} />
        <Text style={styles.socialText}>{Texts.appleLogin}</Text>
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>
          {Texts.noAccountText}{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('SignUp')}
          >
            {Texts.signUp}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.07,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: height * 0.04,
  },
  logo: {
    width: width * 0.55,
    height: height * 0.35,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: width * 0.025,
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fafafa',
  },
    disabledButton: {
    backgroundColor: '#cccccc',
  },
  icon: {
    width: width * 0.045,
    height: width * 0.045,
    marginRight: width * 0.025,
    resizeMode: 'contain',
    tintColor: '#aaa',
  },
  input: {
    flex: 1,
    height: height * 0.055,
    fontSize: width * 0.038,
  },
  signInButton: {
    backgroundColor: '#3366FF',
    width: '100%',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.025,
    alignItems: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.02,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: width * 0.02,
    color: '#888',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: width * 0.025,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.045,
    width: '100%',
    marginBottom: height * 0.012,
    backgroundColor: '#fff',
  },
  socialIcon: {
    width: width * 0.045,
    height: width * 0.045,
    resizeMode: 'contain',
    marginRight: width * 0.025,
  },
  socialText: {
    fontSize: width * 0.038,
    color: '#333',
  },
  footerTextContainer: {
    marginTop: height * 0.015,
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: width * 0.035,
  },
  footerLink: {
    color: '#3366FF',
    fontWeight: 'bold',
  },
});

