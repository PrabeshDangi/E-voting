import {StyleSheet, Text, Touchable, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';
import ActiveVotingPoll from '../../components/ActiveVotingPoll';
import AuthContext from '../Context/AuthContext';

const Index = () => {
  const {auth, setAuth} = useContext(AuthContext);

  useEffect(() => {
    // console.log(auth.user);
    // console.log(auth.token);
  }, []);
  const navigation = useNavigation();
  const handleLogout = async () => {
    setAuth({user: null, token: null});
    navigation.replace('Login');
  };

  return (
    <View
      style={{
        padding: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <ProfileIcon name="user-circle-o" size={30} />
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

export default Index;

const styles = StyleSheet.create({});
