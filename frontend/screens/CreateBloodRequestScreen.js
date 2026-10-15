import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createReq } from '../services/api';
import Button from '../components/Button';

const CreateBloodRequestScreen = ({ navigation }) => {

  const hospital = { name: "Test Hastanesi", id: 1 }; 

  const [bloodType, setBloodType] = useState('A+');
  const [urgencyLevel, setUrgencyLevel] = useState('low');

  const handleSubmit = async () => {
    if (!bloodType || !urgencyLevel) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    
    try {
      await createReq(hospital.name, hospital.id, bloodType, urgencyLevel);
      Alert.alert('Başarılı', 'Kan Talebi başarıyla oluşturuldu');
      navigation.navigate('HospitalHome'); 
    } catch (error) {
      Alert.alert('Talep Başarısız', error.message || 'Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Kan Talebi Oluştur</Text>

      <Text style={styles.label}>Kan Grubu</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={bloodType}
          onValueChange={setBloodType}
          style={styles.picker}
        >
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'].map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Aciliyet Durumu</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={urgencyLevel}
          onValueChange={setUrgencyLevel}
          style={styles.picker}
        >
          {['low', 'medium', 'high', 'critical'].map((level) => (
            <Picker.Item key={level} label={level.toUpperCase()} value={level} />
          ))}
        </Picker>
      </View>

      {}
      <Button title="Talebi Oluştur" onPress={handleSubmit} style={{ marginTop: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#e74c3c', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, color: '#555', marginBottom: 6, marginTop: 18 },
  pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden', backgroundColor: '#f2f2f2' },
  picker: { height: 50, width: '100%' },
});

export default CreateBloodRequestScreen;
