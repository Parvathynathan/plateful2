import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import foodListings from '../foodListing.json'; // Ensure correct path

const MapScreen = () => {
  const [mapKey, setMapKey] = useState(1); // Key to force re-render

  // When the screen is focused (visited again), force re-render
  useFocusEffect(
    React.useCallback(() => {
      setMapKey((prevKey) => prevKey + 1);
    }, [])
  );

  return (
    <View style={styles.container}>
      <MapView
        key={mapKey} // Ensures the map reloads when navigating back
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {foodListings.map((listing) => (
          <Marker
            key={listing.id}
            coordinate={{
              latitude: listing.latitude,
              longitude: listing.longitude,
            }}
            pinColor={listing.category === 'wanted' ? 'red' : 'green'}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.title}>{listing.type}</Text>
                <Text>Category: {listing.category === 'wanted' ? 'Wanted' : 'Available'}</Text>
                <Text>Price: {listing.price}</Text>
                <Text>Location: {listing.place}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    width: 200, // Adjust the width to fit content
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MapScreen;
