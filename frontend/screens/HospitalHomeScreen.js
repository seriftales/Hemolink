import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const HospitalHomeScreen = ({ route, navigation }) => {
  const hospital = route.params?.hospital;

  const handleCreateBloodRequest = () => {
    navigation.navigate('CreateBloodRequest', { hospital });
  };

  const handleViewRequests = () => {
    navigation.navigate('HospitalRequests', { hospital });
  };

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'LoginSelection' }] });
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundOfProfile.png')} // 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>🏥 Hastane Bilgileri</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Ad:</Text>
            <Text style={styles.value}>{hospital?.name || '---'}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{hospital?.email || '---'}</Text>

            <Text style={styles.label}>Adres:</Text>
            <Text style={styles.value}>{hospital?.address || '---'}</Text>

            <Text style={styles.label}>Telefon:</Text>
            <Text style={styles.value}>{hospital?.phone || '---'}</Text>

            <Text style={styles.label}>Enlem:</Text>
            <Text style={styles.value}>
              Enlem: {hospital?.latitude || '---'} | Boylam: {hospital?.longitude || '---'}
            </Text>
          </View>

          <TouchableOpacity style={styles.buttonRed} onPress={handleCreateBloodRequest}>
            <Text style={styles.buttonText}>🩸 KAN TALEBİ OLUŞTUR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRed} onPress={handleViewRequests}>
            <Text style={styles.buttonText}>📋 TALEPLERİ GÖRÜNTÜLE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonGray} onPress={handleLogout}>
            <Text style={styles.logoutText}>➡️ ÇIKIŞ YAP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: width * 0.88,
    backgroundColor: '#fff',
    borderRadius: 26,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 40,
    marginBottom: 40,
    opacity: 0.94,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 16,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 10,
    fontWeight: '600',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2c3e50',
  },
  buttonRed: {
    width: '100%',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonGray: {
    width: '100%',
    backgroundColor: '#a4a4a4',
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 18,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HospitalHomeScreen;
