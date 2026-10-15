import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext'; 

const { width } = Dimensions.get('window');

const HospitalHomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth(); 
 
  const handleCreateBloodRequest = () => navigation.navigate('CreateBloodRequest');
  const handleViewRequests = () => navigation.navigate('HospitalRequests');

 
  const handleLogout = async () => {
    await logout();
  };

  return (
    <ImageBackground source={require('../assets/backgroundOfProfile.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>🏥 Hastane Bilgileri</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Ad:</Text>
            <Text style={styles.value}>{user?.name || '---'}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email || '---'}</Text>

            <Text style={styles.label}>Adres:</Text>
            <Text style={styles.value}>{user?.address || '---'}</Text>
          </View>

          <Button title="🩸 KAN TALEBİ OLUŞTUR" onPress={handleCreateBloodRequest} />
          <Button title="📋 TALEPLERİ GÖRÜNTÜLE" onPress={handleViewRequests} />
          <Button title="➡️ ÇIKIŞ YAP" onPress={handleLogout} style={styles.buttonGray} textStyle={styles.logoutText} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: width * 0.88, backgroundColor: '#fff', borderRadius: 26, paddingVertical: 20, paddingHorizontal: 18, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 5, elevation: 3, marginTop: 40, marginBottom: 40, opacity: 0.94 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#c0392b', marginBottom: 16 },
  infoBox: { width: '100%', backgroundColor: '#f9f9f9', padding: 14, borderRadius: 16, marginBottom: 20 },
  label: { fontSize: 13, color: '#777', marginTop: 10, fontWeight: '600' },
  value: { fontSize: 15, fontWeight: '700', color: '#2c3e50' },
  buttonGray: { backgroundColor: '#a4a4a4', marginTop: 18 },
  logoutText: { color: '#fff' },
});

export default HospitalHomeScreen;
