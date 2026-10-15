import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const DonorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isActionLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await login(email, password); 
    } catch (error) {
      Alert.alert('Giriş Başarısız', error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <FormInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />

        {isActionLoading ? (
          <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 20 }} />
        ) : (
          <Button title="Giriş Yap" onPress={handleLogin} />
        )}

        <Button 
          title="Kayıt Ol" 
          onPress={() => navigation.navigate('Register')} 
          style={styles.buttonSecondary} 
          textStyle={styles.buttonSecondaryText} 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  buttonSecondary: { backgroundColor: '#e3f2fd', borderWidth: 2, borderColor: '#e3f2fd', marginTop: 12 },
  buttonSecondaryText: { color: '#e74c3c' },
});

export default DonorLoginScreen;
