import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomNavBar from '../Components/Customnavbar'; // Adjust the import path

const SymptomCheckerScreen= ({ navigation }) => {
  const [showConfirmation, setShowConfirmation] = useState(true); // Start with the confirmation prompt

  const handleProceed = () => {
    setShowConfirmation(true); // Just in case user navigates back and forth
    navigateToNextScreen();
  };

  const handleCancel = () => {
    // Handle cancel action (e.g., navigate back or exit the app)
    // For demonstration, let's navigate back in this example
    navigation.goBack();
  };

  const navigateToNextScreen = () => {
    // Navigate to the next screen (e.g., BasicInformationScreen)
    navigation.navigate('Symptomquestionnaire');
  };

  return (
    <View style={styles.container}>
      {/* Content View */}
      <View style={styles.contentView}>
        <Text style={styles.title}>
          This app helps you understand your symptoms, but it's not a substitute for professional medical advice.
        </Text>
        {showConfirmation && (
          <View>
            <Text style={styles.subtitle}>Do you want to proceed?</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleProceed} style={[styles.button, styles.proceedButton]}>
                <Text style={[styles.buttonText, styles.proceedButtonText]}>Yes, Proceed</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacing} />
              <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        )}
      </View>

      {/* Custom NavBar */}
      <CustomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'center', // Center buttons
    alignItems: 'center', // Align buttons vertically
  },
  buttonSpacing: {
    width: 20, // Add spacing width
  },
  button: {
    paddingVertical: 20, // Adjust padding
    paddingHorizontal: 40, // Adjust padding
    borderRadius: 40, // Make buttons rounded
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16, // Adjust font size
    fontWeight: 'bold', // Make text bold
  },
  cancelButton: {
    borderColor: 'red', // Red border color
    borderWidth: 1, // Add border
    backgroundColor: '#fff', // Change background color
  },
  cancelButtonText: {
    color: 'red', // Red text color
  },
  proceedButton: {
    backgroundColor: '#4682B4', // Blue background color
  },
  proceedButtonText: {
    color: 'white', // White text color
  },
});

export default SymptomCheckerScreen;
