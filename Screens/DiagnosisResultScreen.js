import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiagnosisResultScreen = ({ route }) => {
  const { diagnosisResult } = route.params;
  const navigation = useNavigation(); // Create a navigation reference

  // Extract the user-friendly diagnosis information (Name and Accuracy)
  const userFriendlyDiagnosis = diagnosisResult.map((diagnosis) => ({
    Name: diagnosis.Issue.Name,
    Accuracy: diagnosis.Issue.Accuracy,
  }));

  // Function to navigate to the DiagnosisInfoScreen
  const navigateToDiagnosisInfo = () => {
    navigation.navigate('DiagnosisInfoScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis Result</Text>
      <TouchableOpacity onPress={navigateToDiagnosisInfo}>
        <Text style={styles.searchLink}>Search for Diagnosis Info</Text>
      </TouchableOpacity>
      <ScrollView>
        {userFriendlyDiagnosis.map((diagnosis, index) => (
          <View key={index} style={styles.diagnosisItem}>
            <Text style={styles.diagnosisName}>Name: {diagnosis.Name}</Text>
            <Text style={styles.diagnosisAccuracy}>Accuracy: {diagnosis.Accuracy}%</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  diagnosisItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  diagnosisName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  diagnosisAccuracy: {
    fontSize: 14,
    color: '#555',
  },
  searchLink: {
    fontSize: 18,
    color: 'orange',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textDecorationLine: 'none',
  },
});

export default DiagnosisResultScreen;
