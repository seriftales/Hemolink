import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Ekranlar
import LoginSelectionScreen from '../screens/LoginSelectionScreen';
import DonorLoginScreen from '../screens/DonorLoginScreen';
import HospitalLoginScreen from '../screens/HospitalLoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NearbyCentersScreen from '../screens/NearbyCentersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HospitalHomeScreen from '../screens/HospitalHomeScreen';
import HospitalRequestsScreen from './screens/HospitalRequestsScreen';
import CreateBloodRequestScreen from './screens/CreateBloodRequestScreen';
import BloodRequestListScreen from './screens/BloodRequestListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSelection" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} />
        <Stack.Screen name="BloodRequests" component={BloodRequestListScreen} />
        <Stack.Screen name="HospitalHome" component={HospitalHomeScreen} />
        <Stack.Screen name="DonorLogin" component={DonorLoginScreen} />
        <Stack.Screen name="HospitalLogin" component={HospitalLoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateBloodRequest" component={CreateBloodRequestScreen} />
        <Stack.Screen name="NearbyCenters" component={NearbyCentersScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="HospitalRequests" component={HospitalRequestsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
