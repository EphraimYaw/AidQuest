import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DiagnosisResultScreen = ({ route }) => {
  const { diagnosisResult } = route.params;

  // Format the diagnosis result for display
  const formattedDiagnosis = JSON.stringify(diagnosisResult, null, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis Result</Text>
      <ScrollView>
        <Text style={styles.diagnosisText}>{formattedDiagnosis}</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  diagnosisText: {
    fontSize: 16,
  },
});

export default DiagnosisResultScreen;
