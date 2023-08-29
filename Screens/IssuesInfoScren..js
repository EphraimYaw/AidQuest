import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomNavBar from '../Components/Customnavbar'; // Adjust the import path

const IssuesInfoScreen = ({ route }) => {
  const { issueInfo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue Information</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>Description</Text>
          <Text style={styles.issueInfo}>{issueInfo.Description}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>Medical Condition</Text>
          <Text style={styles.issueInfo}>{issueInfo.MedicalCondition}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>Possible Symptoms</Text>
          <Text style={styles.issueInfo}>{issueInfo.PossibleSymptoms}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>Treatment Description</Text>
          <Text style={styles.issueInfo}>{issueInfo.TreatmentDescription}</Text>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  issueInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default IssuesInfoScreen;