import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import FormInput from '../components/FormInput';
import { hospitalLoginReq } from '../services/api';

const HospitalLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleHospitalLogin = async () => {
    try {
      const data = await hospitalLoginReq(email, password);
      console.log('Hospital login:', data);
      navigation.navigate('HospitalHome', { hospital: data.user });
    } catch (error) {
      console.log('Hospital login error:', error);
      Alert.alert('Giriş Başarısız', 'Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/hospital-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleHospitalLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt butonu bilinçli olarak eklenmedi */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 100, // 👈 BU satırı ekle! (40 = hafif kayma)
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HospitalLoginScreen;
