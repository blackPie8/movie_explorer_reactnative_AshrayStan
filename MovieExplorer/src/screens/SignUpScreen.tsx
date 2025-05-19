import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, ActivityIndicator, } from 'react-native';
import { SignUpRequest } from '../axiosQuery/axiosRequest';
import Images from '../constants/Images';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }: any) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/; // Adjust regex based on your requirements
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (!firstname.trim()) {
      Alert.alert('Error', 'First name is required.');
      return false;
    }
    if (!lastname.trim()) {
      Alert.alert('Error', 'Last name is required.');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required.');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Phone number is required.');
      return false;
    }
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return false;
    }
    if (!confirmPassword) {
      Alert.alert('Error', 'Confirm password is required.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const accountCreation = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        user: {
          email: email,
          password: password,
          first_name: firstname,
          last_name: lastname,
          mobile_number: phone,
        },
      };

      const res = await SignUpRequest(payload);
      console.log('Sign-up response:', res.data);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (err) {
      console.log('Sign-up error:', err);
      const errorMessage =
        err.response?.data?.message || 'Failed to create account. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Image source={Images.name} style={styles.icon} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={firstname}
          onChangeText={setFirstname}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={Images.name} style={styles.icon} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={Images.phone} style={styles.icon} />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#999"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

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

      <View style={styles.inputContainer}>
        <Image source={Images.password} style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.signUpButton, isLoading && styles.disabledButton]}
        onPress={accountCreation}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signUpText}>Sign Up</Text>
        )}
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
    paddingTop: height * 0.04,
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
    height: height * 0.055,
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
    disabledButton: {
    backgroundColor: '#cccccc',
  },
});
