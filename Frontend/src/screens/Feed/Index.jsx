import {StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken').then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View>
      <Text>MainFeed</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
