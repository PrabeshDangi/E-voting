import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import PollsCandidate from '../../components/PollsCandidate';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';
import AuthContext from '../Context/AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Polls = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const {auth, setAuth} = useContext(AuthContext); // Correctly use useContext here
  const [totalVotesMessage, setTotalVotesMessage] = useState(''); // Correctly use useState here

  const navigation = useNavigation();

  const getTotalVotes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}:${SERVER_PORT}/vote/totalvote`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log(response.data.message);
      setTotalVotesMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('aa', auth);
    // Fetch all candidates
    const fetchCandidates = async () => {
      try {
        const candidates = await axios.get(
          `${BASE_URL}:${SERVER_PORT}/poll/getallcandidate`,
        );
        // console.log(candidates.data.data);

        setAllCandidates(candidates.data.data);
        console.log('all', allCandidates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCandidates();
    getTotalVotes();
  }, []);

  const pollPage = () => {
    navigation.navigate('CreateCandidate');
  };

  return (
    <View>
      <Text>Polls</Text>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20}}>{totalVotesMessage}</Text>
      </View>
      {allCandidates?.map((candidate, index) => (
        <PollsCandidate
          name={candidate.name}
          party={candidate.party}
          id={candidate.cid}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={pollPage}>
        <Text style={styles.buttonText}>Create Poll</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Polls;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Background color of the button
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Border radius
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    elevation: 3, // Android elevation to give a raised look
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 18, // Font size
    fontWeight: 'bold', // Font weight
  },
});
