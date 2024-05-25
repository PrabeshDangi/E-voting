import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';
import AuthContext from '../Context/AuthContext';

const CreateCandidate = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [icon, setIcon] = useState('');

  const {auth, setAuth} = useContext(AuthContext); // Correctly use useContext here

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}:${SERVER_PORT}/poll/createcandidate`,
        {cid: id, icon: icon, name: name, party: party},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log('Candidate created successfully:', response.data);
      Alert.alert('Success', 'Candidate created successfully!', [{text: 'OK'}]);
      // Reset the form after successful submission
      setId('');
      setName('');
      setParty('');
      setIcon('');
    } catch (error) {
      console.error('Error creating candidate:', error);
      Alert.alert('Error', 'Failed to create candidate. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="Enter candidate ID"
        keyboardType="numeric"
      />
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
        placeholder="Enter candidate icon"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Candidate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateCandidate;
