import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
  ImageBackground
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FormInput from '../components/FormInput';
import { registerReq } from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('A+');

  const handleRegister = async () => {
    if (!name || !surname || !email || !password || !age || !bloodType) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const data = await registerReq(name, surname, email, password, age, bloodType);
      console.log('Register data:', data);
      Alert.alert('Kayıt Başarılı', 'Lütfen giriş yapın.');
      navigation.navigate('DonorLogin');
    } catch (error) {
      console.log('Register error:', error);
      Alert.alert('Kayıt Başarısız', error.message || 'Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <FormInput placeholder="Adınız" value={name} onChangeText={setName} />
        <FormInput placeholder="Soyadınız" value={surname} onChangeText={setSurname} />
        <FormInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
        <FormInput placeholder="Yaş" value={age} onChangeText={setAge} keyboardType="numeric" />

        {/* Kan Grubu Seçimi */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Kan Grubu:</Text>
          <Picker
            selectedValue={bloodType}
            style={styles.picker}
            onValueChange={(itemValue) => setBloodType(itemValue)}
          >
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="0+" value="0+" />
            <Picker.Item label="0-" value="0-" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('DonorLogin')}>
          <Text style={styles.loginButtonText}>Zaten hesabınız var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 24,
    textAlign: 'center',
  },
  pickerContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  pickerLabel: {
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
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
  loginButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
