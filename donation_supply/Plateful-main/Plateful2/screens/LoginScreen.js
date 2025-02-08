import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, Image, TextInput, 
  StyleSheet, ImageBackground, KeyboardAvoidingView, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated, { withSpring, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Shared value for animating the form container
  const offsetY = useSharedValue(1000); // Start position is below the screen

  useEffect(() => {
    offsetY.value = withSpring(0, { damping: 10, stiffness: 100 }); // Move up
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
      opacity: withTiming(1, { duration: 500 }),
    };
  });

  // Function to handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.154.99:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate('Home'); // Navigate to Home screen after login
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require('../assets/images/homepage_bg.jpg')}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/app-icon.png')}
            style={styles.loginImage}
          />
        </View>
      </SafeAreaView>

      {/* Login Form */}
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <Animated.View style={[styles.formContainer, animatedStyle]}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            <Text style={styles.loginButtonText}>{isLoading ? "Logging in..." : "Login"}</Text>
          </TouchableOpacity>

          <Text style={styles.dividerText}>Or</Text>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/icons/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signupRedirectContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: 'cover', justifyContent: 'center', paddingTop: 40 },
  safeArea: { flex: 1 },
  backButtonContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 16, marginTop: 8 },
  backButton: { padding: 8, borderRadius: 12, backgroundColor: '#e0e0e0' },
  imageContainer: { flexDirection: 'row', justifyContent: 'center' },
  loginImage: { width: 220, height: 300, top: 20 },
  keyboardAvoidingView: { flex: 1 },
  formContainer: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingHorizontal: 32, paddingTop: 24, justifyContent: 'center' },
  label: { fontSize: 16, color: '#4a4a4a', marginBottom: 8, marginLeft: 8 },
  input: { padding: 12, backgroundColor: '#f5f5f5', borderRadius: 16, marginBottom: 16, fontSize: 16, color: '#4a4a4a', borderWidth: 1, borderColor: '#ccc' },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 16 },
  forgotPasswordText: { fontSize: 14, color: '#4a4a4a' },
  loginButton: { paddingVertical: 12, backgroundColor: '#007bff', borderRadius: 16, alignItems: 'center' },
  loginButtonText: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
  dividerText: { fontSize: 18, fontWeight: 'bold', color: '#4a4a4a', textAlign: 'center', marginVertical: 24, top: -15 },
  socialLoginContainer: { flexDirection: 'row', justifyContent: 'center' },
  socialButton: { padding: 8, backgroundColor: '#f5f5f5', borderRadius: 16, top: -30, borderWidth: 1, borderColor: '#ccc' },
  socialIcon: { width: 40, height: 40 },
  signupRedirectContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, top: -40 },
  signupText: { fontSize: 14, color: '#7a7a7a' },
  signupLink: { fontSize: 14, fontWeight: 'bold', color: '#007bff' },
});
