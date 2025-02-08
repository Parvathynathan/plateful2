import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function GetDonateDetailsScreen() {
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [quantity, setQuantity] = useState("");
  const [perishable, setPerishable] = useState("true");
  const [isVisible, setIsVisible] = useState(false);

  const offsetY = useSharedValue(1000); // Animation: initial position below screen

  useEffect(() => {
    setIsVisible(true);
    offsetY.value = withSpring(0, { damping: 10, stiffness: 100 }); // Animation: move to view
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
      opacity: withTiming(isVisible ? 1 : 0, { duration: 500 }),
    };
  });

  const handleFormSubmit = () => {
    if (!type || !place || !quantity) {
      Alert.alert(
        "Error",
        `Please fill in all fields:\n- Type\n- Place\n- Quantity`
      );
      return;
    }
    Alert.alert("Success", "Your donation details have been submitted!");
    setType("");
    setPlace("");
    setQuantity("");
    setPerishable("true");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/homepage_bg.jpg")} // Background image
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/app-icon.png")} // Replace with your app logo
            style={styles.logo}
          />
        </View>

        <Animated.View style={[styles.formContainer, animatedStyle]}>
          <Text style={styles.header}>Add Donation Details</Text>

          {/* Form fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Donation Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter donation type (e.g., Fresh Fruits)"
              value={type}
              onChangeText={setType}
              placeholderTextColor="#aaaaaa"
            />

            <Text style={styles.label}>Place</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter place (e.g., Community Hall)"
              value={place}
              onChangeText={setPlace}
              placeholderTextColor="#aaaaaa"
            />

            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity (e.g., 30)"
              value={quantity}
              keyboardType="numeric"
              onChangeText={setQuantity}
              placeholderTextColor="#aaaaaa"
            />

            <Text style={styles.label}>Perishable</Text>
            <Picker
              selectedValue={perishable}
              onValueChange={(itemValue) => setPerishable(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Yes" value="true" />
              <Picker.Item label="No" value="false" />
            </Picker>

            <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  logo: {
    width: 180,
    height: 180,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#4a4a4a",
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#4a4a4a",
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginBottom: 16,
    fontSize: 16,
    color: "#4a4a4a",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 12,
    backgroundColor: "#A60000", 
    borderRadius: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
