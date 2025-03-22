import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Profile Screen" />
      <View style={styles.content}>
        <Text style={styles.text}>This is the profile screen.</Text>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default ProfileScreen;