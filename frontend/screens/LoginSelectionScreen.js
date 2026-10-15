import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/Button';
import backgroundImage from '../assets/blood-drop.png';

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <Text style={styles.watermark}>🩸</Text>
      <Text style={styles.logo}>HemoLink</Text>
      <Text style={styles.title}>Giriş Tipi Seçin</Text>

      <Button title="Bağışçı Girişi" onPress={() => navigation.navigate('DonorLogin')} style={styles.btn} textStyle={styles.btnText} />

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>veya</Text>
        <View style={styles.line} />
      </View>

      <Button title="Hastane Girişi" onPress={() => navigation.navigate('HospitalLogin')} style={styles.btn} textStyle={styles.btnText} />
      <Button title="🩸 Bir Damla Bir Umut" onPress={() => navigation.navigate('BloodDonationInfo')} style={styles.btn} textStyle={styles.btnText} />

      <Text style={styles.tagline}>Hayat Kurtarmak Bir Tık Uzağınızda</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(143, 17, 17, 0.1)', zIndex: 1 },
  logo: { fontSize: 34, fontWeight: '900', color: '#e74c3c', marginBottom: 4, zIndex: 2 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 30, zIndex: 2, textShadowColor: '#c0392b', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  btn: { backgroundColor: '#fff', width: '100%', marginBottom: 12, zIndex: 2 },
  btnText: { color: '#e74c3c', fontSize: 17 },
  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, zIndex: 2, width: '100%' },
  line: { flex: 1, height: 1, backgroundColor: '#fff' },
  separatorText: { marginHorizontal: 10, color: '#fff', fontSize: 14 },
  tagline: { marginTop: 12, fontSize: 14, color: '#fff', textAlign: 'center', zIndex: 2 },
  watermark: { position: 'absolute', top: -10, right: -10, fontSize: 140, color: '#f2dede', opacity: 0.25, zIndex: 0 },
});

export default LoginSelectionScreen;
