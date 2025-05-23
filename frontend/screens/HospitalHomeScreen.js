import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HospitalHomeScreen = ({ route, navigation }) => {
  const hospital = route.params?.hospital;

  const handleCreateBloodRequest = () => {
    navigation.navigate('CreateBloodRequest', { hospital });
  };

  const handleViewRequests = () => {
    navigation.navigate('HospitalRequests',{hospital});
  };

  // Çıkış yap ve LoginSelection sayfasına git
  const handleLogout = () => {
    // Burada istersen AsyncStorage gibi yerel oturum temizliği yapılabilir
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginSelection' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏥 Hastane Bilgileri</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ad:</Text>
        <Text style={styles.value}>{hospital?.name || '---'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{hospital?.email || '---'}</Text>

        <Text style={styles.label}>Adres:</Text>
        <Text style={styles.value}>{hospital?.address || '---'}</Text>

        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.value}>{hospital?.phone || '---'}</Text>

        <Text style={styles.label}>Konum:</Text>
        <Text style={styles.value}>
          Enlem: {hospital?.latitude || '---'} | Boylam: {hospital?.longitude || '---'}
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCreateBloodRequest}>
        <Text style={styles.buttonSecondaryText}>🩸 Kan Talebi Oluştur</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleViewRequests}>
        <Text style={styles.buttonSecondaryText}>📋 Talepleri Görüntüle</Text>
      </TouchableOpacity>

      {/* Çıkış Butonu */}
      <TouchableOpacity style={[styles.buttonSecondary, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonSecondaryText, styles.logoutText]}>🚪 Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#777',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  buttonSecondary: {
    borderColor: '#e74c3c',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonSecondaryText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    borderColor: '#555',
    marginTop: 30,
  },
  logoutText: {
    color: '#555',
  },
});

export default HospitalHomeScreen;
