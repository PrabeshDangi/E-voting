import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import AuthContext from '../Context/AuthContext';
import {BASE_URL, SERVER_PORT} from '@env';
import ActiveCandidates from '../../components/ActiveCandidates';
import axios from 'axios';

const VotingBooth = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const {auth, setAuth} = useContext(AuthContext); // Correctly use useContext here

  useEffect(() => {
    // Fetch all candidates
    const fetchCandidates = async () => {
      try {
        const candidates = await axios.get(
          `${BASE_URL}:${SERVER_PORT}/poll/getallcandidate`,
        );
        // console.log(candidates.data.data);

        setAllCandidates(candidates.data.data);
        console.log('alll', allCandidates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <View>
      <Text>VotingBooth</Text>
      {allCandidates?.map((candidate, index) => (
        <ActiveCandidates
          name={candidate.name}
          party={candidate.party}
          id={candidate.cid}
          pollID={candidate._id}
        />
      ))}
    </View>
  );
};

export default VotingBooth;

const styles = StyleSheet.create({});
