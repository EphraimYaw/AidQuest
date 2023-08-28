import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import CustomNavBar from '../Components/Customnavbar';

const NewsDetailScreen = ({ route }) => {
  const { title, content, imageUri } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: imageUri }} style={styles.newsImage} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </ScrollView>
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
    flexGrow: 1, // Allow the content to grow and take up remaining space
    marginTop: 60,
    paddingHorizontal: 20,
  },
  newsImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
  },
});

export default NewsDetailScreen;
