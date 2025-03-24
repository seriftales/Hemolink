import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Kan Bağışı Uygulaması" />
      <View style={styles.content}>
        <Image source={require('../assets/blood-drop.png')} style={styles.image} />
        <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
        <Button title="Bağış Yap" onPress={() => alert('Bağış yapıldı!')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 24,
  },
});

export default HomeScreen;