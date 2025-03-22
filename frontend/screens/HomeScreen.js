import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Kan Bağışı Uygulaması" />
      <View style={styles.buttonContainer}>
        <Button title="Bağış Yap" onPress={() => alert('Bağış yapıldı!')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;