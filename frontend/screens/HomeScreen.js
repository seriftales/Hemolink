import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const userFromRoute = route.params?.user;
  console.log("🏠 HomeScreen gelen user:", userFromRoute);

  const sendTestNotification = async () => {
    try {
      const response = await fetch('http://localhost:3000/notifications/blood-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
          hospitalId: 1, // Test için sabit bir hastane ID'si
          bloodType: "A+", // Test için sabit bir kan grubu
          requestId: 1 // Test için sabit bir talep ID'si
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Başarılı', 'Bildirim gönderildi!');
      } else {
        Alert.alert('Hata', data.message || 'Bildirim gönderilemedi');
      }
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
      Alert.alert('Hata', 'Bildirim gönderilirken bir hata oluştu');
    }
  };

  return (
    <ImageBackground source={require('../assets/tema2.png')} style={styles.background}>
      <View style={styles.container}>
        

        <View style={styles.content}>
          
          <Text style={styles.welcomeText}>
            Hoş Geldiniz{userFromRoute?.name ? `, ${userFromRoute.name}` : ''}!
          </Text>

          <Button title="Bağış Yap" onPress={() => navigation.navigate('BloodRequests',{user:userFromRoute})}/>


          <Button
            title=" Kan Bağış Merkezleri"
            onPress={() => navigation.navigate('NearbyCenters')}
          />

          <Button
            title="Profilim"
            onPress={() => navigation.navigate('Profile', { user: userFromRoute })}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={sendTestNotification}
          >
            <Text style={styles.buttonText}>Test Bildirimi Gönder</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  headerText: {
    color: '#e74c3c',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
