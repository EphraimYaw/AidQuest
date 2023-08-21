import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { questions } from '../Components/questions';

const SymptomCheckerScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const randomizedQuestions = shuffleArray(questions);
    setShuffledQuestions(randomizedQuestions);
  }, []);

  const handleSymptomChange = (text) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[currentStep] = text;
    setSymptoms(updatedSymptoms);
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleDiagnose();
    }
  };

  const handleDiagnose = async () => {
    setIsLoading(true);

    try {
      // Prepare the data to send in the API request
      const requestData = {
        symptoms: symptoms, // Array of symptoms collected from user input
        // Add any other relevant data for your API request
      };

      // Make the API request
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers required by your API
        },
        body: JSON.stringify(requestData),
      });

      // Handle the response from the API
      if (response.ok) {
        const diagnosis = await response.json();
        // Perform any necessary actions with the diagnosis data
        console.log('Diagnosis:', diagnosis);
      } else {
        // Handle the error case
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while making the API request:', error);
    }

    setIsLoading(false);
  };

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.question}>{shuffledQuestions[currentStep]}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your response"
            onChangeText={handleSymptomChange}
            value={symptoms[currentStep]}
          />
          <Button title={currentStep === questions.length - 1 ? 'Diagnose' : 'Next'} onPress={handleNextStep} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SymptomCheckerScreen;