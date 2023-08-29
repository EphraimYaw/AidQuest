import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import CustomNavBar from '../Components/Customnavbar'; // Adjust the import path

const ApiMedicSymptoms = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [gender, setGender] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await fetch(
        'https://healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcGdyb3VwMDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5NDY5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wNC0wNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5MzMxMzMzMywibmJmIjoxNjkzMzA2MTMzfQ.StsVKyeI6b_53ksWfmkdv0-xOZDlY1E36mLTeeWdUJo&format=json&language=en-gb'
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setSymptoms(data);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      Alert.alert('Error', 'An error occurred while fetching symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSymptomSelect = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleDiagnosis = async () => {
    if (!selectedSymptoms.length || !gender || !yearOfBirth) {
      console.error('Please fill in all required fields');
      return;
    }

    const encodedSymptoms = JSON.stringify(selectedSymptoms);

    try {
      const queryString = `symptoms=${encodedSymptoms}&gender=${gender}&year_of_birth=${yearOfBirth}`;
      const apiUrl = `https://healthservice.priaid.ch/diagnosis?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcGdyb3VwMDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5NDY5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wNC0wNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5MzMxMzMzMywibmJmIjoxNjkzMzA2MTMzfQ.StsVKyeI6b_53ksWfmkdv0-xOZDlY1E36mLTeeWdUJo&format=json&language=en-gb&${queryString}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const diagnosisResult = await response.json();

      navigation.navigate('DiagnosisResult', { diagnosisResult });
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
      Alert.alert('Error', 'An error occurred while fetching diagnosis. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>List of Symptoms</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender:</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={text => setGender(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Year of Birth:</Text>
          <TextInput
            style={styles.input}
            value={yearOfBirth}
            onChangeText={text => setYearOfBirth(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Symptom:</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search symptoms..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />

          {isLoading ? (
            <ActivityIndicator style={styles.loadingIndicator} size="small" color="#000000" />
          ) : (
            <FlatList
              data={symptoms.filter(symptom => symptom.Name.toLowerCase().includes(searchQuery.toLowerCase()))}
              keyExtractor={item => item.ID.toString()}
              renderItem={({ item }) => (
                <View style={styles.symptomItem}>
                  <Text>{item.Name}</Text>
                  <Button
                    title={selectedSymptoms.includes(item.ID) ? 'Deselect' : 'Select'}
                    onPress={() => handleSymptomSelect(item.ID)}
                  />
                </View>
              )}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleDiagnosis}
            style={styles.diagnosisButton}
          >
            <Text style={styles.buttonText}>Get Diagnosis</Text>
          </TouchableOpacity>
        </View>
      </View>
     
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
    flex: 1,
    marginTop:40,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    overflow: 'hidden',
  },
  diagnosisButton: {
    backgroundColor: '#FF5733',
    fontSize: 20,
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  
});

export default ApiMedicSymptoms;
