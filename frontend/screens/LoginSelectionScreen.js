import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Tipi Seçin</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DonorLogin')}
      >
        <Text style={styles.buttonText}>Bağışcı Girişi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HospitalLogin')}
      >
        <Text style={styles.buttonText}>Hastane Girişi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default LoginSelectionScreen;