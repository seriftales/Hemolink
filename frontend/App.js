import 'react-native-gesture-handler'; // KRİTİK: Her zaman en tepede olmak zorunda
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- CONTEXT ---
import { AuthProvider, useAuth } from './context/AuthContext';

// --- EKRANLAR (Dosya isimlerinin senin projenle birebir aynı olduğundan emin ol) ---
import LoginSelectionScreen from './screens/LoginSelectionScreen';
import DonorLoginScreen from './screens/DonorLoginScreen';
import HospitalLoginScreen from './screens/HospitalLoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NearbyCentersScreen from './screens/NearbyCentersScreen';
import HospitalHomeScreen from './screens/HospitalHomeScreen';
import HospitalRequestsScreen from './screens/HospitalRequestsScreen';
import CreateBloodRequestScreen from './screens/CreateBloodRequestScreen';
import BloodRequestListScreen from './screens/BloodRequestListScreen';
import BloodDonationInfoScreen from './screens/BloodDonationInfoScreen';

const Stack = createNativeStackNavigator();

// --- 1. YIĞIN: GİRİŞ YAPMAMIŞ KULLANICILAR İÇİN (AuthStack) ---
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginSelection">
    <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} />
    <Stack.Screen name="DonorLogin" component={DonorLoginScreen} />
    <Stack.Screen name="HospitalLogin" component={HospitalLoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="BloodDonationInfo" component={BloodDonationInfoScreen} />
  </Stack.Navigator>
);

// --- 2. YIĞIN: GİRİŞ YAPMIŞ KULLANICILAR İÇİN (MainStack) ---
const MainStack = () => {
  const { user } = useAuth();
  
  // Kullanıcı tipine göre başlangıç ekranını dinamik belirliyoruz
  const initialRoute = user?.type === 'hospital' ? 'HospitalHome' : 'Home';

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HospitalHome" component={HospitalHomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NearbyCenters" component={NearbyCentersScreen} />
      <Stack.Screen name="HospitalRequests" component={HospitalRequestsScreen} />
      <Stack.Screen name="CreateBloodRequest" component={CreateBloodRequestScreen} />
      <Stack.Screen name="BloodRequests" component={BloodRequestListScreen} />
      <Stack.Screen name="BloodDonationInfo" component={BloodDonationInfoScreen} />
    </Stack.Navigator>
  );
};

// --- YÖNLENDİRME MOTORU ---
const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  // AsyncStorage veriyi okurken beyaz ekran yerine profesyonel yükleme çarkı
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  // user state'ine göre uygulama anında ilgili yığına geçiş yapar
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// --- UYGULAMA KÖKÜ ---
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}