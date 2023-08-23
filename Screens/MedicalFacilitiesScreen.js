import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import CustomNavBar from '../Components/Customnavbar'; // Adjust the import path

const App = () => {
  const carouselItems = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    // Add more items as needed
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselItemText}>{item.title}</Text>
    </View>
  );

  const basicHealthFacilities = [
    'Emergency Room',
    'Pharmacy',
    'Laboratory',
    'Radiology',
    'ICU',
    'Outpatient Services',
    // Add more basic health facilities as needed
  ];

  const nearbyHealthFacilities = [
    'Clinic',
    'Urgent Care Center',
    'Dental Clinic',
    'Medical Imaging Center',
    // Add more nearby health facilities as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.locationText}>Your Location</Text>
        <View style={styles.currentLocationContainer}>
          <MaterialIcons name="location-on" size={16} style={styles.locationIcon} />
          <Text style={styles.currentLocationText}>Current Location</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a location"
            // Add any necessary onChangeText or onSubmitEditing handlers here
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerCaption}>Places</Text>
          <TouchableOpacity style={styles.seeAllTouchable}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Carousel */}
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={300} // Customize based on your design
          itemWidth={200} // Customize based on your design
          inactiveSlideShift={0} // Set to 0 for smooth sliding
          inactiveSlideScale={1} // Set to 1 for no scaling of inactive slides
        />

        {/* Health Facilities */}
        <Text style={styles.healthFacilitiesText}>Health Facilities</Text>
        
        {/* Basic Health Facilities Carousel */}
        <Carousel
          data={basicHealthFacilities}
          renderItem={({ item }) => (
            <View style={styles.basicHealthFacilityItem}>
              <Text style={styles.basicHealthFacilityText}>{item}</Text>
            </View>
          )}
          sliderWidth={300} // Customize based on your design
          itemWidth={150} // Customize based on your design
          inactiveSlideShift={0} // Set to 0 for smooth sliding
          inactiveSlideScale={1} // Set to 1 for no scaling of inactive slides
        />
        
        {/* Nearby Health Facilities */}
        <Text style={styles.nearbyHealthFacilitiesText}>Nearby Hospital</Text>
        <Carousel
          data={nearbyHealthFacilities}
          renderItem={renderCarouselItem}
          sliderWidth={300} // Customize based on your design
          itemWidth={200} // Customize based on your design
          inactiveSlideShift={0} // Set to 0 for smooth sliding
          inactiveSlideScale={1} // Set to 1 for no scaling of inactive slides
        />
      </View>
      <CustomNavBar />
    </View>
  );
};

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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerCaption: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  seeAllTouchable: {
    flex: 1, // Expand to the right
  },
  seeAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#007AFF', // Set text color to match your design
    textAlign: 'right', // Align the text to the right
  },
  carouselItem: {
    backgroundColor: '#ddd', // Customize based on your design
    borderRadius: 8,
    padding: 50,
    marginTop: 20,
    marginHorizontal: 10, 
  },
  carouselItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333', // Customize based on your design
  },
  healthFacilitiesText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 10,
  },
  basicHealthFacilityItem: {
    backgroundColor: '#f0f0f0', // Customize based on your design
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicHealthFacilityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#333', // Customize based on your design
  },
  nearbyHealthFacilitiesText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default App;
