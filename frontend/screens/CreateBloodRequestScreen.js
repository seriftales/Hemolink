import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createReq } from '../services/api';
const CreateBloodRequestScreen = ({ route, navigation }) => {
  const hospital = route.params?.hospital;

  const [bloodType, setBloodType] = useState('A+');
  const [urgencyLevel, setUrgencyLevel] = useState('low');

  const handleSubmit = async () => {
    console.log(hospital.name)   
    if (!bloodType || !urgencyLevel ) {
          Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
          return;
        }
      try {
        const data = await createReq(hospital.name,hospital.id, bloodType, urgencyLevel);
        console.log('createData:', data); 
        Alert.alert('Kan Talebi başarıyla oluşturuldu');
        navigation.navigate('HospitalHome',{hospital}) ;

    } catch (error) {
        console.log('Create error:', error);
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
          onValueChange={(itemValue) => setBloodType(itemValue)}
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
          onValueChange={(itemValue) => setUrgencyLevel(itemValue)}
          style={styles.picker}
        >
          {['low', 'medium', 'high', 'critical'].map((level) => (
            <Picker.Item key={level} label={level.toUpperCase()} value={level} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Talebi Oluştur</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    marginTop: 18,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default CreateBloodRequestScreen;
