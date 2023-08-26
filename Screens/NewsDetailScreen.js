import React from 'react';
import { View, Text } from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { title, content } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
};

export default NewsDetailScreen;
