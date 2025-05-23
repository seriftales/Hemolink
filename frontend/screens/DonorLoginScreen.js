import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ImageBackground, Alert
} from 'react-native';
import FormInput from '../components/FormInput';
import { loginReq } from '../services/api';

const DonorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginReq(email, password);
      console.log('Login data:', data);
      navigation.navigate('Home', { user: data.user }); // ✅ user'ı gönder
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Giriş Başarısız', 'Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
      
        {/* 📥 Giriş Alanları */}
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

        {/* 🔘 Giriş Butonu */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* 🟰 Kayıt Butonu */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonSecondaryText}>Kayıt Ol</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3a',
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
 buttonSecondary: {
  backgroundColor: '#e3f2fd',    
  borderWidth: 2,
  borderColor: '#e3f2fd',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 12,
},

buttonSecondaryText: {
  color: '#e74c3c',               
  fontWeight: 'bold',
  fontSize: 16,
}

});

export default DonorLoginScreen;
