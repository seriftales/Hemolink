import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Header title="HemoLink-419" style={styles.headerText} />
        <View style={styles.content}>
          <Image source={require('../assets/blood-drop.png')} style={styles.image} />
          <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
          <Button title="Bağış Yap" onPress={() => alert('Bağış yapıldı!')} />
          {/* Yeni Buton */}
          <Button
            title="En Yakın Kan Bağış Merkezlerini Gör"
            onPress={() => navigation.navigate('NearbyCenters')}
          />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Arka plan resminin üzerindeki beyaz katman
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
    color: '#e74c3c',
    marginBottom: 24,
    textAlign: 'center',
  },
  headerText: {
    color: '#e74c3c',
  },
});

export default HomeScreen;