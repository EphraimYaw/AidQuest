import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavBar = () => {
  const navigation = useNavigation(); // Get navigation instance
  const route = useRoute(); // Get active route

  const handleHomePress = () => {
    navigation.navigate('HomeScreen'); // Navigate to 'Home' screen
  };

  const handleLocationPress = () => {
    navigation.navigate('MedicalFacilities'); // Navigate to 'Location' screen
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile'); // Navigate to 'Profile' screen
  };

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleHomePress}
        style={[styles.iconContainer, isActive('Home') && styles.activeButton]}
      >
        <Icon name="home-outline" size={24} color={isActive('HomeScreen') ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLocationPress}
        style={[styles.iconContainer, isActive('MedicalFacilities') && styles.activeButton]}
      >
        <Icon name="location-outline" size={24} color={isActive('MedicalFacilities') ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleProfilePress}
        style={[styles.iconContainer, isActive('Profile') && styles.activeButton]}
      >
        <Icon name="person-outline" size={24} color={isActive('Profile') ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  activeButton: {
    borderBottomColor: 'blue', // Add borderBottomColor
    borderBottomWidth: 2, // Add borderBottomWidth
    paddingBottom: 2, // Add paddingBottom to create the underline effect
  },
};

export default BottomNavBar;
