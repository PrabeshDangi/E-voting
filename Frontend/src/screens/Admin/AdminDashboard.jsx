import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken').then(() => {
      navigation.navigate('Login');
    });
  };
  return (
    <View>
      <Text>AdminDashboard</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({});
