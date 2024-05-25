import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ActiveVotingPoll = ({electionName}) => {
  const navigation = useNavigation();
  const handleViewDetails = () => {
    navigation.navigate('Polls');
  };
  return (
    <View style={styles.container}>
      <View style={styles.liveIndicator}>
        <Ionicons
          name="ellipse"
          size={12}
          color="red"
          style={styles.liveIcon}
        />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
      <Text style={styles.electionName}>{electionName}</Text>
      <TouchableOpacity style={styles.button} onPress={handleViewDetails}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveVotingPoll;

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
    margin: 10,
    marginTop: 30,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  liveIcon: {
    marginRight: 5,
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
  },
  electionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
