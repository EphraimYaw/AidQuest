import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, ActivityIndicator, FlatList } from 'react-native';

const DiagnosisInfoScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [issueInfo, setIssueInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch issues based on searchQuery
  const fetchIssues = async () => {
    setIsLoading(true);

    try {
      const apiUrl = `https://healthservice.priaid.ch/issues?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcGdyb3VwMDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5NDY5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wNC0wNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5MzA4MjY3MywibmJmIjoxNjkzMDc1NDczfQ.NULDf7UEAzhOpqJyOjjGard-RFsuaU1Dj09EAUxuAVw&format=json&language=en-gb&name=${searchQuery}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        console.error('Unexpected response format for issues:', data);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      Alert.alert('Error', 'An error occurred while fetching issues. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch issue information based on selectedIssues
  const fetchIssueInfo = async () => {
    setIsLoading(true);

    try {
      const issueIds = selectedIssues.join(',');
      const apiUrl = `https://healthservice.priaid.ch/issues/${issueIds}/info?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcGdyb3VwMDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI5NDY5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0wNC0wNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5MzA4MjY3MywibmJmIjoxNjkzMDc1NDczfQ.NULDf7UEAzhOpqJyOjjGard-RFsuaU1Dj09EAUxuAVw&language=en-gb`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the response is an object (not an array)
      if (typeof data === 'object' && !Array.isArray(data)) {
        // Handle the issue information as needed
        setIssueInfo(data);
      } else {
        console.error('Unexpected response format for issue info:', data);
      }
    } catch (error) {
      console.error('Error fetching issue info:', error);
      Alert.alert('Error', 'An error occurred while fetching issue info. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle selecting/deselecting issues
  const toggleIssueSelection = (issueId) => {
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter(id => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  // Function to filter search results based on the search query
  const filterResults = () => {
    return searchResults.filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis Information</Text>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for issues..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* Search button */}
      <Button title="Search" onPress={fetchIssues} />

      {/* Display live search results */}
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="small" color="#000000" />
      ) : (
        <FlatList
          data={filterResults()} // Use the filtered results
          keyExtractor={item => item.ID.toString()}
          renderItem={({ item }) => (
            <View style={styles.issueItem}>
              <Text>{item.Name}</Text>
              <Button
                title={selectedIssues.includes(item.ID) ? 'Deselect' : 'Select'}
                onPress={() => toggleIssueSelection(item.ID)}
              />
            </View>
          )}
        />
      )}

      {/* Button to fetch issue info */}
      <Button
        title="Get Issue Info"
        onPress={fetchIssueInfo}
        disabled={selectedIssues.length === 0}
      />

      {/* Display issue info (you can customize this section) */}
      {issueInfo && (
        <ScrollView>
          <Text style={styles.issueInfo}>
            Description: {issueInfo.Description}
          </Text>
          <Text style={styles.issueInfo}>
            Medical Condition: {issueInfo.MedicalCondition}
          </Text>
          <Text style={styles.issueInfo}>
            Possible Symptoms: {issueInfo.PossibleSymptoms}
          </Text>
          <Text style={styles.issueInfo}>
            Treatment Description: {issueInfo.TreatmentDescription}
          </Text>
        </ScrollView>
      )}
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
  issueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  issueInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DiagnosisInfoScreen;
