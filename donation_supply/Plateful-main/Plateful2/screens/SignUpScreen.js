import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://192.168.154.99:5000/api/auth/register", { name, email, password });
      Alert.alert("Success", response.data.message);
      navigation.navigate("Login"); // Navigate to login screen
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <ImageBackground source={require('../assets/images/homepage_bg.jpg')} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/app-icon.png')} style={styles.signupImage} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Name</Text>
          <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />

          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />

          <Text style={styles.label}>Enter Password</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="Password" onChangeText={setPassword} />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  imageContainer: { alignItems: "center", marginTop: 20 },
  signupImage: { width: 150, height: 150 },
  formContainer: { paddingHorizontal: 20, marginTop: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { padding: 10, borderWidth: 1, borderRadius: 10, marginBottom: 10 },
  signUpButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 10 },
  signUpButtonText: { color: "white", textAlign: "center", fontSize: 18 },
});
