import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSelectionScreen from './screens/LoginSelectionScreen';
import DonorLoginScreen from './screens/DonorLoginScreen';
import HospitalLoginScreen from './screens/HospitalLoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NearbyCentersScreen from './screens/NearbyCentersScreen';
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginSelection">
          <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} />
          <Stack.Screen name="DonorLogin" component={DonorLoginScreen} />
          <Stack.Screen name="HospitalLogin" component={HospitalLoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="NearbyCenters" component={NearbyCentersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}