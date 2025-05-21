import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HospitalHomeScreen = ({ route, navigation }) => {
  const hospital = route.params?.hospital;

  const handleCreateBloodRequest = () => {
    // İstek oluşturma fonksiyonu (ileride API eklenecek)
    alert('Kan talebi oluşturuldu!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏥 Hastane Paneli</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hastane Adı:</Text>
        <Text style={styles.value}>{hospital?.name || '-'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{hospital?.email || '-'}</Text>

        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.value}>{hospital?.phone || '-'}</Text>

        <Text style={styles.label}>Adres:</Text>
        <Text style={styles.value}>{hospital?.address || '-'}</Text>

        <Text style={styles.label}>Konum (Lat, Long):</Text>
        <Text style={styles.value}>
          {hospital?.latitude}, {hospital?.longitude}
        </Text>

        <Text style={styles.label}>Kayıt Tarihi:</Text>
        <Text style={styles.value}>
          {hospital?.created_at ? new Date(hospital.created_at).toLocaleString() : '-'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateBloodRequest}>
        <Text style={styles.buttonText}>Kan Talebi Oluştur</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HospitalHomeScreen;
