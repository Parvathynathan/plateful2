import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/homepage_bg.jpg')} // Background image
      style={styles.container}
      resizeMode="cover" // Ensures the background image covers the screen
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.content}>
          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Plateful</Text>

          {/* Welcome Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/wl.png')}
              style={styles.welcomeImage}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginRedirectContainer}>
              <Text style={styles.loginRedirectText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    safeAreaContainer: {
      top: 100,
      flex: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for the form
      borderRadius: 10,
      margin: 20,
      paddingHorizontal: 32,
      width: width * 0.9, // 90% of the screen width
      height: height * 0.8, // 80% of the screen height
    },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  welcomeText: {
    color: '#00000',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcomeImage: {
    width: 350,
    height: 350,
  },
  buttonsContainer: {
    marginTop: 32,
  },
  signUpButton: {
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    marginHorizontal: 28,
    borderRadius: 12,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginRedirectText: {
    color: '#000000',
    fontWeight: '600',
    padding:5
  },
  loginLink: {
    fontWeight: '600',
    color: '#87CEEB',
    padding:5

  },
});
