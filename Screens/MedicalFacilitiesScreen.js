import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const BasicPage = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const apiKey = 'AIzaSyCa_bWN-0wh_Zishi1-Fea2HjA6hkG0mYI';
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}`
          );
          const data = await response.json();

          if (data.status === 'OK' && data.results.length > 0) {
            const locationName = data.results[0].formatted_address;
            setUserLocation(locationName);
          } else {
            setUserLocation('Location not available');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Geolocation error');
        }
      );
    } catch (error) {
      console.error('Error fetching user location:', error);
      setUserLocation('Location fetch error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.livelocation}>Your location</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{userLocation || 'Fetching location...'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingLeft: 2,
    backgroundColor: '#F6F8FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  livelocation: {
    fontSize: 16,
    marginTop: 10,
    color: '#888888',
  },
  locationContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BasicPage;
