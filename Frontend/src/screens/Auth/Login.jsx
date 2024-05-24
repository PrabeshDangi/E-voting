import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {BASE_URL, SERVER_PORT} from '@env';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import jestConfig from '../../../jest.config';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const loginData = {
        phone,
        email,
        password,
      };
      const responseData = await axios
        .post(`${BASE_URL}:${SERVER_PORT}/user/login`, loginData)
        .then(resp => {
          setPhone('');
          setEmail('');
          setPassword('');

          return resp.data;
        });

      // if (responseData.success) {
      //     const { user, token } = loginResponse;

      //     if (user.role === 'admin') {
      //       navigation.navigate('AdminScreen', { user, token });
      //     } else {
      //       navigation.navigate('UserScreen', { user, token });
      //     }
      //   } else {
      //     Alert.alert('Login Failed', loginResponse.message);
      //   }

      // .then(resp => {
      //   console.log(resp);
      // });
      //     .then(async token => {
      //       await AsyncStorage.setItem('authToken', token);
      //       console.log(jwtDecode(token));
      //       //   navigation.replace('MainFeed');
      //       //   Alert.alert('Welcome', 'Login Successful', [
      //       //     {
      //       //       text: 'Thanks',
      //       //       onPress: () => {},
      //       //     },
      //       //   ]);
      //     });
      // }
    } catch (error) {}

    Alert.alert('Login Details', JSON.stringify(loginData, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>E-Voting</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text>First time?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: 'blue'}}> Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
