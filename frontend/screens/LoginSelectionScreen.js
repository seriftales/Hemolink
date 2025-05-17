import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Hafif arka plan süsü */}
      <Text style={styles.watermark}>🩸</Text>

      {/* Logo */}
      <Text style={styles.logo}>HemoLink</Text>

      {/* Başlık */}
      <Text style={styles.title}>Giriş Tipi Seçin</Text>

      {/* Bağışçı Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DonorLogin')}
      >
        <Text style={styles.buttonText}>Bağışçı Girişi</Text>
      </TouchableOpacity>

      {/* Ayırıcı */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>veya</Text>
        <View style={styles.line} />
      </View>

      {/* Hastane Butonu */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('HospitalLogin')}
      >
        <Text style={styles.buttonSecondaryText}>Hastane Girişi</Text>
      </TouchableOpacity>

      {/* Alt bilgi */}
      <Text style={styles.tagline}>Hayat Kurtarmak Bir Tık Uzağınızda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#e74c3c',
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonSecondaryText: {
    color: '#e74c3c',
    fontSize: 17,
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  tagline: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  watermark: {
    position: 'absolute',
    top: -10,
    right: -10,
    fontSize: 140,
    color: '#f2dede',
    opacity: 0.25,
    zIndex: -1,
  },
});

export default LoginSelectionScreen;
