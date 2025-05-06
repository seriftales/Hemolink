import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import FormInput from '../components/FormInput';
import { loginReq , logoutReq } from '/home/kaan/hemolink-419/frontend/services/api.js'; // login API isteği için gerekli fonksiyon

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async () => {
    
    console.log("Butona basıldı") ; 
    try {
      const data = await loginReq(email, password); // login API isteğini yapıyoruz
      console.log('Login data:', data); // API'den dönen veriyi konsola yazdırıyoruz
      console.log('Token:', data.token); // Token'ı konsola yazdırıyoruz
      // if (!data.token) {
      //   throw new Error("Token alınamadı.");
      // }
  
      
    //  await asyncStorage.setItem('token', data.token); // Token'ı AsyncStorage'a kaydediyoruz
      await navigation.navigate('Home'); // Ana ekrana yönlendirme yapıyoruz
    
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Giriş Başarısız', 'Lütfen bilgilerinizi kontrol edin.'); // Hata mesajı gösteriyoruz
    }
  };
  
  
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/blood-donation.png')} style={styles.image} />
        <Text style={styles.title}>Kan Bağışı Uygulaması</Text>
        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}> 
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Arka plan resminin üzerindeki beyaz katman
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;