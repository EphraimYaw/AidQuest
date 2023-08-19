import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import AuthenticationScreen from './AuthenticationScreen';

const GetStartedScreen = () => {
  const carouselItems = [
    {
      caption: 'Connect with Healthcare Professionals',
      image: require('../assets/Doctors.jpg'),
    },
    {
      caption: 'Access Your Health Records Anytime',
      image: require('../assets/Last.jpg'),
    },
    {
      caption: 'Stay Up-to-Date on the Latest Medical News',
      image: require('../assets/Patient.jpg'),
    },
  ];

  const carouselRef = React.useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAuthentication, setShowAuthentication] = useState(false);

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselCaption}>{item.caption}</Text>
      </View>
    );
  };

  const handleGetStarted = () => {
    setShowAuthentication(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showAuthentication ? (
        <AuthenticationScreen onClose={() => setShowAuthentication(false)} />
      ) : (
        <>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={carouselRef}
              data={carouselItems}
              renderItem={renderCarouselItem}
              sliderWidth={300}
              itemWidth={280}
              loop={true}
              autoplay={true}
              autoplayInterval={5000}
              onSnapToItem={(index) => setActiveSlide(index)}
              contentContainerCustomStyle={styles.carouselContentContainer}
            />
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>

          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    marginTop: 150,
  },
  carouselItem: {
    alignItems: 'center',
  },
  carouselImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  carouselCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    color: '#333333',
    paddingHorizontal: 20,
  },
  getStartedButton: {
    width: 200,
    height: 50,
    backgroundColor: '#00CED1',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 100,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paginationContainer: {
    paddingVertical: 25,
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00CED1',
    marginHorizontal: 4,
  },
  paginationInactiveDot: {
    backgroundColor: '#CCCCCC',
  },
});

export default GetStartedScreen;






