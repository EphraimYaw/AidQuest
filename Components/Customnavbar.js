import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleHomePress = () => {
    navigation.navigate('HomeScreen');
  };

  const handleLocationPress = () => {
    navigation.navigate('MedicalFacilities');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const isActive = (screenName) => route.name === screenName;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      {!keyboardVisible && (
        <View style={styles.content}>
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
      )}
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  content: {
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
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
};

export default BottomNavBar;
