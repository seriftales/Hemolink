// LoginSelectionScreen.js — Güncellenmiş Tam Hali
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import backgroundImage from '../assets/blood-drop.png';

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      {/* Üstüne saydam overlay */}
      <View style={styles.overlay} />

      {/* Arka planda emoji watermark */}
      <Text style={styles.watermark}>🩸</Text>

      {/* Logo */}
      <Text style={styles.logo}>HemoLink</Text>

      {/* Başlık */}
      <Text style={styles.title}>Giriş Tipi Seçin</Text>

      {/* Bağışçı Girişi */}
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

      {/* Hastane Girişi */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('HospitalLogin')}
      >
        <Text style={styles.buttonSecondaryText}>Hastane Girişi</Text>
      </TouchableOpacity>

      {/* Bilgilendirici Sayfa */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('BloodDonationInfo')}
      >
        <Text style={styles.buttonSecondaryText}>🩸Bir Damla Bir Umut</Text>
      </TouchableOpacity>

      {/* Alt bilgi */}
      <Text style={styles.tagline}>Hayat Kurtarmak Bir Tık Uzağınızda</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(143, 17, 17, 0.1)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#e74c3c',
    marginBottom: 4,
    letterSpacing: 1,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
    zIndex: 2,
    textShadowColor: '#c0392b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    zIndex: 2,
  },
  buttonText: {
    color: '#e74c3c',
    fontSize: 17,
    fontWeight: '600',
    zIndex: 2,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    zIndex: 2,
  },
  buttonSecondaryText: {
    color: '#e74c3c',
    fontSize: 17,
    fontWeight: '600',
    zIndex: 2,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    zIndex: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#fff',
    fontSize: 14,
    zIndex: 2,
  },
  tagline: {
    marginTop: 12,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    zIndex: 2,
  },
  watermark: {
    position: 'absolute',
    top: -10,
    right: -10,
    fontSize: 140,
    color: '#f2dede',
    opacity: 0.25,
    zIndex: 0,
  },
});

export default LoginSelectionScreen;
