// screens/BloodRequestListScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// 🔻 Sahte kan talepleri (backend hazır olana kadar)
const mockRequests = [
  {
    id: 1,
    hospital: 'KTÜ Kan Merkezi',
    blood_type: 'A+',
    urgency: 'high',
    date: '2025-05-10',
    latitude: 40.986,
    longitude: 39.718,
  },
  {
    id: 2,
    hospital: 'Trabzon Devlet',
    blood_type: '0-',
    urgency: 'critical',
    date: '2025-05-17',
    latitude: 40.984,
    longitude: 39.723,
  },
  {
    id: 3,
    hospital: 'Ankara Şehir Hastanesi',
    blood_type: 'B+',
    urgency: 'medium',
    date: '2025-05-15',
    latitude: 39.925,
    longitude: 32.8369,
  },
];

// Kullanıcının sahte konumu (gerçek uygulamada geolocation alınmalı)
const userLocation = {
  latitude: 40.987,
  longitude: 39.720,
};

// Mesafeyi hesaplayan fonksiyon (Haversine)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
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
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState('');

  // 🔍 Filtreleme işlemi
  const filteredRequests = mockRequests.filter((req) => {
    const matchesBlood =
      !selectedBloodType || req.blood_type === selectedBloodType;
    const matchesUrgency = !selectedUrgency || req.urgency === selectedUrgency;
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      req.latitude,
      req.longitude
    );
    const matchesDistance =
      !maxDistanceKm || distance <= parseFloat(maxDistanceKm);

    return matchesBlood && matchesUrgency && matchesDistance;
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.hospital}</Text>
      <Text style={styles.cell}>{item.blood_type}</Text>
      <Text style={styles.cell}>{item.urgency}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Bağış Yap</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kan Talep Listesi</Text>

      {/* 🔻 Filtreler */}
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

      {/* 📋 Tablo */}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BloodRequestListScreen;
