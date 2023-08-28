import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Carousel from 'react-native-snap-carousel';
import CustomNavBar from '../Components/Customnavbar'; // Adjust the import path

const apiKey = 'AIzaSyCa_bWN-0wh_Zishi1-Fea2HjA6hkG0mYI'; 

import categories from '../Components/healthcategories.json'; // Adjust the path

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [healthFacilities, setHealthFacilities] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&keyword=clinic&key=${apiKey}`
        );
        const data = await response.json();

        setHealthFacilities(data.results);

        // Fetch and set the address using reverse geocoding
        const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
        setAddress(addressResponse.length > 0 ? addressResponse[0] : null);
      }
    })();
  }, []);

  const HealthFacilityCard = ({ item }) => {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
      const fetchPhoto = async () => {
        if (item.photos && item.photos.length > 0) {
          const photoReference = item.photos[0].photo_reference;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
          );
          setPhotoUrl(response.url);
        }
      };

      fetchPhoto();
    }, [item]);

    return (
      <View style={styles.healthFacilityCard}>
        {photoUrl && <Image source={{ uri: photoUrl }} style={styles.healthFacilityImage} />}
        <Text style={styles.healthFacilityName}>{item.name}</Text>
        <Text style={styles.healthFacilityAddress}>{item.vicinity}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.locationText}>Your Location</Text>
        <View style={styles.currentLocationContainer}>
          <MaterialIcons name="location-on" size={16} style={styles.locationIcon} />
          <Text style={styles.currentLocationText}>
            {address ? `${address.subregion}, ${address.region}` : 'Fetching address...'}
          </Text>
        </View>

        <Text style={styles.carouselCaption}>Explore</Text>
        <Carousel
          data={healthFacilities}
          renderItem={HealthFacilityCard}
          sliderWidth={300}
          itemWidth={200}
        />

<View style={styles.textCarouselContainer}>
          <Carousel
            data={categories}
            renderItem={({ item }) => (
              <View style={styles.textCarouselItem}>
                <Text style={styles.textCarouselTextWrapper}>
                  <Text style={styles.textCarouselText}>{item.name}</Text>
                </Text>
              </View>
            )}
            sliderWidth={300}
            itemWidth={100} // Adjust the item width as needed
          />
        </View>

        <Text style={styles.carouselCaption}>Places Near You</Text>
        <Carousel
          data={healthFacilities}
          renderItem={HealthFacilityCard}
          sliderWidth={300}
          itemWidth={200}
        />
      </View>
      <CustomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FF',
  },
  content: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  locationText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  currentLocationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 0,
  },
  carouselCaption: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  healthFacilityCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  healthFacilityImage: {
    width: 180,
    height: 120,
    borderRadius: 10,
  },
  healthFacilityName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 10,
  },
  healthFacilityAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  textCarouselItem: {
    padding: 2,
    marginBottom: 10,
    alignItems: 'center',
  },
  textCarouselTextWrapper: {
    width: 200, // Adjust the width as needed
    padding: 20,
  },
  textCarouselText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 10,
  },
});



