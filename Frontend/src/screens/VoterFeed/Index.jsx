import {StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken').then(() => {
      navigation.replace('Login');
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
