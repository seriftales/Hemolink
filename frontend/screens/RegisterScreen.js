import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { registerReq } from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('A+');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !surname || !email || !password || !age || !bloodType) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setLoading(true);
      await registerReq(name, surname, email, password, age, bloodType);
      Alert.alert('Kayıt Başarılı', 'Lütfen giriş yapın.');
      navigation.navigate('DonorLogin');
    } catch (error) {
      Alert.alert('Kayıt Başarısız', error.message || 'Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <FormInput placeholder="Adınız" value={name} onChangeText={setName} />
        <FormInput placeholder="Soyadınız" value={surname} onChangeText={setSurname} />
        <FormInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
        <FormInput placeholder="Yaş" value={age} onChangeText={setAge} keyboardType="numeric" />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={bloodType} style={styles.picker} onValueChange={setBloodType}>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'].map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 20 }} />
        ) : (
          <Button title="Kayıt Ol" onPress={handleRegister} />
        )}

        <Button title="Zaten hesabınız var mı? Giriş Yap" onPress={() => navigation.navigate('DonorLogin')} style={styles.loginBtn} textStyle={styles.loginBtnText} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(255,255,255,0.1)' },
  pickerContainer: { marginTop: 10, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' },
  picker: { height: 50, backgroundColor: '#fff' },
  loginBtn: { backgroundColor: 'transparent', marginTop: 12 },
  loginBtnText: { color: '#e74c3c', fontSize: 16 },
});

export default RegisterScreen;
