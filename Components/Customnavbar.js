import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomNavBar = () => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleMedicalFacilitiesPress = () => {
    navigation.navigate('MedicalFacilities');
  };
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // Add more button handlers as needed

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePress} style={styles.button}>
        <MaterialIcons name="home" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMedicalFacilitiesPress} style={styles.button}>
        <MaterialIcons name="location-on" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMedicalFacilitiesPress} style={styles.button}>
        <MaterialIcons name="location-on" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress} style={styles.button}>
        <MaterialIcons name="person" size={32} color="black" />
      </TouchableOpacity>
      {/* Add more buttons here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 8,
   
  },
  button: {
    alignItems: 'center',
  },
});

export default CustomNavBar;
