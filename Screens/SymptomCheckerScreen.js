import React from 'react';
import { View, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Content of the home screen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Very light grey background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default HomeScreen;
