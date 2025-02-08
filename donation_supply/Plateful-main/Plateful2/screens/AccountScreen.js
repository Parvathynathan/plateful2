import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Title, Text, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountScreen = () => {
  const handleLogout = () => {
    alert('Logout functionality will be added!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/150' }} />
        <View style={styles.profileInfo}>
          <Title style={styles.profileName}>Raveena R</Title>
          <Text style={styles.profileEmail}>raveena@example.com</Text>
        </View>
      </View>

      {/* Personal Info Section */}
      <View style={styles.section}>
        <List.Item
          title="Phone"
          description="+91 9876543210"
          left={(props) => <Icon name="phone" size={24} color="#4CAF50" {...props} />}
        />
        <List.Item
          title="Location"
          description="Coimbatore, India"
          left={(props) => <Icon name="map-marker" size={24} color="#4CAF50" {...props} />}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Settings Section */}
      <View style={styles.section}>
        <List.Item
          title="Edit Profile"
          left={(props) => <Icon name="account-edit" size={24} color="#2196F3" {...props} />}
          onPress={() => alert('Edit Profile')}
        />
        <List.Item
          title="Notifications"
          left={(props) => <Icon name="bell" size={24} color="#2196F3" {...props} />}
          onPress={() => alert('Manage Notifications')}
        />
        <List.Item
          title="Privacy & Security"
          left={(props) => <Icon name="shield-lock" size={24} color="#2196F3" {...props} />}
          onPress={() => alert('Privacy Settings')}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity 
  style={[styles.logoutButton, { backgroundColor: '#A60000' }]} 
  onPress={handleLogout}
>
  <Icon name="logout" size={24} color="#fff" />
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
    </SafeAreaView>
  );
};

// ✅ Only ONE export default statement
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#A60000', // Updated button color
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10, // Adjust spacing between icon and text
  },
});
