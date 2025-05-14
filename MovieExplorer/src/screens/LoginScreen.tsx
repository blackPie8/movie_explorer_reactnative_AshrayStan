import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { LoginRequest } from '../axiosQuery/axiosRequest';
import { useMovies } from '../context/MoviesContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({navigation}: any) {
  const { role, setRole, setToken, setUsername } = useMovies();

  const [e_mail, setEmail] = useState('');
  const [password,setPassword] = useState('');

  const accountValidation = async () => {
    try {
      // debugger;
      const payload = {
          email : e_mail,
          password: password,
      }

      const res: any = await LoginRequest(payload);
      // console.log(res);
      const { user, token } = res.data
      // console.log(user.email)
      if(user.email === e_mail){
        setRole(user.role);
        setUsername(user.first_name)
        setToken(token);
        // console.log(token)
      navigation.navigate('Main');
      }else{
        Alert.alert('Invalid email or password!')
      }
    } catch (err: any) {
      // debugger;
      console.log('Login error:', err.response);
      Alert.alert('Error!','Unable to login. Please try again later.')
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <Image source={require('../assets/email.png')} style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={e_mail}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/password.png')} style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={()=> accountValidation()}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.footerLink} onPress={() => navigation.navigate('SignUp')}>
            Sign Up
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
  icon: {
    width: width * 0.045,
    height: width * 0.045,
    marginRight: width * 0.025,
    resizeMode: 'contain',
    tintColor: '#aaa',
  },
  input: {
    flex: 1,
    height: height * 0.05,
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

