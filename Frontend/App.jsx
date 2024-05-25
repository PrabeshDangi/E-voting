import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/Login';
import SignupScreen from './src/screens/Auth/Signup';
import Index from './src/screens/VoterFeed/Index';
import AdminDashboard from './src/screens/Admin/AdminDashboard';
import Polls from './src/screens/Admin/Polls';
import AuthContext, {AuthProvider} from './src/screens/Context/AuthContext';
import EditCandidate from './src/screens/Admin/EditCandidate';
import CreateCandidate from './src/screens/Admin/CreateCandidate';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="VoterFeed" component={Index} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="Polls" component={Polls} />
          <Stack.Screen name="EditCandidate" component={EditCandidate} />
          <Stack.Screen name="CreateCandidate" component={CreateCandidate} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
