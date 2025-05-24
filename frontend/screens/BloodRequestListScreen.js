import { fetchRequests, updateRequestStatus } from '../services/api'; 
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BloodRequestListScreen = () => {
  const route = useRoute();
  const user = route.params?.user;
  console.log("Kan Talep Listesi Ekranı gelen user:", user);

  const [requests, setRequests] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (error) {
        Alert.alert('Hata', 'Veriler alınamadı: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleComplete = async (id) => {
    try {
      await updateRequestStatus(id, 'accepted', user.email);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: 'accepted' } : req
        )
      );
      Alert.alert('Başarılı', '24 saat içinde kan bağışı merkezinde bulunun.');
    } catch (error) {
      Alert.alert('Hata', 'Bağış yapılamadı: ' + error.message);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesBlood =
      !selectedBloodType || req.blood_type === selectedBloodType;

    const matchesUrgency =
      !selectedUrgency || req.urgency_level === selectedUrgency;

    return matchesBlood && matchesUrgency && req.status === 'active';
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.hospital_name}</Text>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Kan Grubu:</Text>
        <Text style={styles.cardValue}>{item.blood_type}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Aciliyet:</Text>
        <Text style={styles.cardValue}>{item.urgency_level}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Tarih:</Text>
        <Text style={styles.cardValue}>
          {new Date(item.created_at).toLocaleString('tr-TR')}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Telefon:</Text>
        <Text style={styles.cardValue}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, item.status === 'completed' && styles.buttonDisabled]}
        onPress={() => handleComplete(item.id)}
        disabled={item.status === 'completed'}
      >
        <Text style={styles.buttonText}>
          {item.status === 'completed' ? 'Tamamlandı' : 'Bağış Yap'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kan Talep Listesi</Text>

      <View style={styles.filters}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBloodType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedBloodType(itemValue)}
          >
            <Picker.Item label="Kan Grubu" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="0+" value="0+" />
            <Picker.Item label="0-" value="0-" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedUrgency}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedUrgency(itemValue)}
          >
            <Picker.Item label="Aciliyet" value="" />
            <Picker.Item label="low" value="low" />
            <Picker.Item label="medium" value="medium" />
            <Picker.Item label="high" value="high" />
            <Picker.Item label="critical" value="critical" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            Kriterlere uygun kan talebi bulunamadı.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4', // Daha yumuşak bir arka plan rengi
    flex: 1,
  },
  header: {
    fontSize: 28,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#ccc',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c', // Sol kenar vurgusu
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BloodRequestListScreen;