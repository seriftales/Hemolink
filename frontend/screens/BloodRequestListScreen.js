import { fetchRequests } from '../services/api'; 
import React, { useState, useEffect } from 'react';
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

// Yeni: updateRequestStatus fonksiyonunu import ettim
import { updateRequestStatus } from '../services/api';

const userLocation = {
  latitude: 40.987,
  longitude: 39.720,
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const BloodRequestListScreen = () => {
  const [requests, setRequests] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState('');
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

  // Butona basıldığında çağrılacak fonksiyon
  const handleComplete = async (id) => {
    
    
    try {
      await updateRequestStatus(id, 'completed');
      // State'i güncelle, ilgili request'in durumunu completed yap
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: 'completed' } : req
        )
      );
      Alert.alert('Başarılı', '24 saat içerisinde kan bağış merkezinde kan veriniz.');
    } catch (error) {
      Alert.alert('Hata', 'Durum güncellenemedi: ' + error.message);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesBlood =
      !selectedBloodType || req.blood_type === selectedBloodType;

    const matchesUrgency =
      !selectedUrgency || req.urgency_level === selectedUrgency;

    const distance = req.latitude && req.longitude
      ? getDistance(
          userLocation.latitude,
          userLocation.longitude,
          req.latitude,
          req.longitude
        )
      : 0;

    const matchesDistance =
      !maxDistanceKm || distance <= parseFloat(maxDistanceKm);

    // Sadece active durumdaki kayıtları gösterelim (isteğe bağlı)
    return matchesBlood && matchesUrgency && matchesDistance && req.status === 'active';
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.hospital_name }</Text>
      <Text style={styles.cell}>{item.blood_type}</Text>
      <Text style={styles.cell}>{item.urgency_level}</Text>
      <Text style={styles.cell}>
        {new Date(item.created_at).toLocaleString('tr-TR')}
      </Text>
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
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kan Talep Listesi</Text>

      <View style={styles.filters}>
        <Picker
          selectedValue={selectedBloodType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedBloodType(itemValue)}
        >
          <Picker.Item label="Kan Grubu" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="0+" value="0+" />
          <Picker.Item label="0-" value="0-" />
        </Picker>

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

        <Picker
          selectedValue={maxDistanceKm}
          style={styles.picker}
          onValueChange={(itemValue) => setMaxDistanceKm(itemValue)}
        >
          <Picker.Item label="Maks. Mesafe (km)" value="" />
          <Picker.Item label="5 km" value="5" />
          <Picker.Item label="10 km" value="10" />
          <Picker.Item label="20 km" value="20" />
          <Picker.Item label="100 km" value="100" />
        </Picker>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Hastane</Text>
        <Text style={styles.headerCell}>Kan</Text>
        <Text style={styles.headerCell}>Acil</Text>
        <Text style={styles.headerCell}>Tarih</Text>
        <Text style={styles.headerCell}></Text>
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
  // ... orijinal stilleriniz burada ...
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  picker: {
    width: '32%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    color: '#444',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BloodRequestListScreen;
