import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import VoteIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';
import AuthContext from '../screens/Context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const ActiveCandidates = ({name, party, id, pollID}) => {
  const {auth, setAuth} = useContext(AuthContext);

  const navigation = useNavigation();

  const castVote = (candidateId, pollId) => {
    Alert.alert(
      'Confirm Vote',
      'Are you sure you want to vote for this candidate?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            const createVote = await axios.post(
              `${BASE_URL}:${SERVER_PORT}/vote/createvote`,
              {
                pollId: pollId,
                cid: candidateId,
              },
              {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              },
            );

            if (createVote.status === 200) {
              Alert.alert('', createVote.data.message, [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('VotingBooth');
                  },
                },
              ]);
            }
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('No vote casted');
          },
        },
      ],
    );
    // Alert.alert('Detail:', voteCountMessage, [
    //   {
    //     text: 'OK',
    //     onPress: () => {},
    //   },
    // ]);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={40} color="gray" style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.party}>Party: {party}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>

      <TouchableOpacity onPress={() => castVote(id, pollID)}>
        <VoteIcon name="vote" size={28} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default ActiveCandidates;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  party: {
    fontSize: 14,
    color: '#666',
  },
  id: {
    fontSize: 12,
    color: '#999',
  },
});
