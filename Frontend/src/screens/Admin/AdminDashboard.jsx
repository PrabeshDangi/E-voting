import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ActiveVotingPoll from '../../components/ActiveVotingPoll';
import AuthContext from '../Context/AuthContext';
const AdminDashboard = ({route}) => {
  const {user, token} = route.params;
  const {auth, setAuth} = useContext(AuthContext); // Correctly use useContext here
  // useEffect(() => {
  //   AsyncStorage.setItem("adminToken", token);

  // }, []);
  // console.log(user, token);
  const navigation = useNavigation();
  const handleLogout = async () => {
    setAuth({user: null, token: null});
    navigation.replace('Login');
  };
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>AdminDashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: 'orange',
              color: 'white',
              padding: 5,
              borderRadius: 10,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <ActiveVotingPoll electionName={'Swa.bhi.yu'} />
    </View>
  );
};

export default AdminDashboard;
