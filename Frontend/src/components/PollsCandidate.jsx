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

const PollsCandidate = ({name, party, id}) => {
  const {auth, setAuth} = useContext(AuthContext);

  const navigation = useNavigation();

  const getVoteById = async candidateId => {
    console.log(candidateId);
    console.log('auth', auth);
    const voteCount = await axios.get(
      `${BASE_URL}:${SERVER_PORT}/vote/getvotecount/${candidateId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    // console.log('Vote for candidate with id:', id);
    const voteCountMessage = voteCount.data.message;
    Alert.alert('Detail:', voteCountMessage, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const handleEditButton = () => {
    navigation.navigate('EditCandidate', {candidateId: id});
    console.log('Edit button pressed');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={40} color="gray" style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.party}>Party: {party}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => getVoteById(id)}>
          <VoteIcon name="vote" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditButton()}>
          <EditIcon name="account-edit" size={28} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PollsCandidate;

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
