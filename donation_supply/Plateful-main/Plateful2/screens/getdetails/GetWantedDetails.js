import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function GetWantedDetails() {
  const [numPeople, setNumPeople] = useState('');
  const [foodRequirements, setFoodRequirements] = useState([]);
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

  const calculateFoodRequirements = () => {
    if (!numPeople || isNaN(numPeople) || numPeople <= 0) {
      Alert.alert('Error', 'Please enter a valid number of people.');
      return;
    }

    const people = parseInt(numPeople);
    const requirements = [
      { food: 'Rice', quantity: (people * 0.5).toFixed(1) + ' kg' },
      { food: 'Vegetables', quantity: (people * 0.3).toFixed(1) + ' kg' },
      { food: 'Fruits', quantity: (people * 0.2).toFixed(1) + ' kg' },
      { food: 'Bread', quantity: (people * 1).toFixed(1) + ' loaves' },
    ];

    setFoodRequirements(requirements);
  };

  const handleSubmit = () => {
    if (!foodRequirements.length) {
      Alert.alert('Error', 'Please calculate food requirements first.');
      return;
    }
    Alert.alert('Success', 'Your food requirements have been submitted!');
    setNumPeople('');
    setFoodRequirements([]);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homepage_bg.jpg')} // Background image
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Wanted Food Details</Text>
        </View>

        <Animated.View style={[styles.formContainer, animatedStyle]}>
          <Text style={styles.label}>Number of People</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of people"
            value={numPeople}
            onChangeText={setNumPeople}
            keyboardType="numeric"
            placeholderTextColor="#aaaaaa"
          />

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateFoodRequirements}
          >
            <Text style={styles.buttonText}>Calculate Food Requirements</Text>
          </TouchableOpacity>

          {foodRequirements.length > 0 && (
            <View style={styles.requirementsList}>
              <Text style={styles.listHeader}>Food Requirements:</Text>
              {foodRequirements.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.foodText}>
                    {item.food}: {item.quantity}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 16,
    fontSize: 16,
    color: '#4a4a4a',
  },
  calculateButton: {
    paddingVertical: 12,
    backgroundColor: '#A60000',
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 12,
    backgroundColor: '#A60000',
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  requirementsList: {
    marginTop: 20,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a4a4a',
  },
  listItem: {
    marginBottom: 10,
  },
  foodText: {
    fontSize: 16,
    color: '#4a4a4a',
  },
});
