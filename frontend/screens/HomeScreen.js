import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth(); 

  return (
    <ImageBackground source={require('../assets/tema2.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Hoş Geldiniz{user?.name ? `, ${user.name}` : ''}!</Text>

          <Button title="Bağış Yap" onPress={() => navigation.navigate('BloodRequests')} />
          <Button title="Kan Bağış Merkezleri" onPress={() => navigation.navigate('NearbyCenters')} />
          <Button title="Profilim" onPress={() => navigation.navigate('Profile')} />
          
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 24, textAlign: 'center' },
});

export default HomeScreen;
