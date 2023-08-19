import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animation effect when the splash screen is mounted
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Simulating an asynchronous task, e.g., loading app data
    const loadData = async () => {
      // Wait for some data loading or other initialization tasks

      // After loading is complete, navigate to the next screen
      navigation.navigate('GetStartedScreen'); // Replace 'Home' with your desired screen name
    };

    // Simulating a delay before navigating to the next screen
    setTimeout(loadData, 3000); // Adjust the delay time as needed
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image source={require('../assets/AidQuest.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
