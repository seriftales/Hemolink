import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Hafızaya yazmak için ekledik
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { hospitalLoginReq } from '../services/api';
import { useAuth } from '../context/AuthContext';

const HospitalLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  const { setUser } = useAuth(); 

  const handleHospitalLogin = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setLoading(true);
      const response = await hospitalLoginReq(email, password);
  
      const hospitalData =response.user;
      const token = response.token;

      if (!hospitalData) {
        throw new Error("Hastane verisi alınamadı");
      }

      const loggedInHospital = { ...hospitalData, type: 'hospital' };

      if (token) await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(loggedInHospital));

      setUser(loggedInHospital);

    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert('Giriş Başarısız', 'Bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/hospital-background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <FormInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />

        {loading ? (
          <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 20 }} />
        ) : (
          <Button title="Giriş Yap" onPress={handleHospitalLogin} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', padding: 24, paddingTop: 100, backgroundColor: 'rgba(255, 255, 255, 0.0)' },
});

export default HospitalLoginScreen;