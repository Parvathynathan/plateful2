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
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function GetPostDetails() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Discussion");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
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
    if (!title || !description || !tags) {
      Alert.alert("Error", "Please fill in all required fields:\n- Title\n- Description\n- Tags");
      return;
    }
    Alert.alert("Success", "Your post has been submitted!");
    setTitle("");
    setDescription("");
    setCategory("Discussion");
    setTags("");
    setLocation("");
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
          <Text style={styles.header}>Create New Post</Text>

          {/* Form fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Post Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a title for your post"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#aaaaaa"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write the details of your post"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#aaaaaa"
              multiline={true}
            />

            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Discussion" value="Discussion" />
              <Picker.Item label="Help" value="Help" />
              <Picker.Item label="Event" value="Event" />
              <Picker.Item label="Announcement" value="Announcement" />
            </Picker>

            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.input}
              placeholder="Add relevant tags (comma-separated)"
              value={tags}
              onChangeText={setTags}
              placeholderTextColor="#aaaaaa"
            />

            <Text style={styles.label}>Location (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location (if applicable)"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#aaaaaa"
            />

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
      paddingBottom: 32, // Extra padding at the bottom
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 16,
      color: "#4a4a4a",
    },
    form: {
      flexGrow: 1, // Ensures the form expands within the container
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
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    picker: {
      backgroundColor: "#fff",
      borderRadius: 16,
      marginBottom: 16,
    },
    submitButton: {
      paddingVertical: 12,
      backgroundColor: "#A60000", // Updated color to align with your theme
      borderRadius: 16,
      alignItems: "center",
      marginTop: 16, // Added space above the button
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
  });
  