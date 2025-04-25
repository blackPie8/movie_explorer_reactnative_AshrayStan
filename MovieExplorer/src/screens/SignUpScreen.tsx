import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, } from 'react-native';
import { SignUpRequest } from '../axiosQuery/axiosRequest';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation } : any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const accountCreation = async () => {
    try {
      const payload = {
          full_name: name,
          email : email,
          password: password,
          mobile_number: phone,
      };

      const res = await SignUpRequest(payload);
      console.log(res.data);
      navigation.navigate('Login');
    } catch (err) {
      console.log('Sign-up error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          style={styles.input}
          value = {name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#999"
          style={styles.input}
          value = {phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/email.png')} style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value = {email}
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

      <View style={styles.inputContainer}>
        <Image source={require('../assets/password.png')} style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={()=>accountCreation()}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.08,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.85,
    height: height * 0.25,
    marginBottom: height * 0.03,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: width * 0.025,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fafafa',
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.025,
    resizeMode: 'contain',
    tintColor: '#aaa',
  },
  input: {
    flex: 1,
    height: height * 0.06,
    fontSize: width * 0.04,
  },
  signUpButton: {
    backgroundColor: '#3366FF',
    width: '100%',
    paddingVertical: height * 0.018,
    borderRadius: width * 0.025,
    alignItems: 'center',
    marginTop: height * 0.025,
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  footerTextContainer: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: width * 0.035,
  },
  footerLink: {
    color: '#3366FF',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
});
