import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import AuthContext from '../Context/AuthContext'; // Adjust the import path as necessary
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';

const EditCandidate = ({route, navigation}) => {
  const {auth} = useContext(AuthContext);
  const {candidateId} = route.params;
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  useEffect(() => {
    // Fetch candidate details when the component mounts
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}:${SERVER_PORT}/poll/getcandidate/${candidateId}`,

          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );

        const candidate = response.data.data[0];
        console.log('Candidate:', candidate.name);
        setIcon(candidate.icon);
        setName(candidate.name);
        setParty(candidate.party);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };
    fetchCandidate();
  }, [auth.token, candidateId]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}:${SERVER_PORT}/poll/updatecandidate/${candidateId}`,
        {name, party, icon},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log('Candidate updated successfully:', response.data);
      Alert.alert('Success', 'Candidate updated successfully', [{text: 'OK'}]);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter candidate name"
      />
      <Text style={styles.label}>Party</Text>
      <TextInput
        style={styles.input}
        value={party}
        onChangeText={setParty}
        placeholder="Enter candidate party"
      />
      <Text style={styles.label}>Icon</Text>
      <TextInput
        style={styles.input}
        value={icon}
        onChangeText={setIcon}
        placeholder="Enter candidate ID"
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 18,
  },
});

export default EditCandidate;
