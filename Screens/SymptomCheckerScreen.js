import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomNavBar from '../Components/Customnavbar';

const SymptomCheckerScreen = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [symptoms, setSymptoms] = useState([]); // State for storing symptoms
  const navigation = useNavigation();

  useEffect(() => {
    fetchSymptoms(); // Fetch symptoms when the component mounts
  }, []);

  const fetchSymptoms = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual API key from API Medic Live
      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcGdyb3VwMDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5NDY5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wNC0wNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5Mjc4MDQ4NSwibmJmIjoxNjkyNzczMjg1fQ.X7Bt5BPJ3ojMb9g14hystEZLNnQWG4Pm4s9A1vbfcCg';
      const response = await fetch(`https://healthservice.priaid.ch/symptoms`);
      if (response.ok) {
        const data = await response.json();
        setSymptoms(data); // Update the symptoms state with fetched data
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching symptoms:', error);
    }
  };

  // Rest of the component code remains the same

  return (
    <View style={styles.container}>
      {/* Rest of the component JSX */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  symptomList: {
    width: '80%',
  },
  symptomItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedSymptomItem: {
    backgroundColor: '#3F51B5', // Update to your selected color
  },
  symptomText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SymptomCheckerScreen;
