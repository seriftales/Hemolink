// screens/BloodRequestListScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const mockRequests = [
  {
    id: 1,
    hospital: 'KTÜ Kan Merkezi',
    blood_type: 'A+',
    urgency: 'high',
    date: '2025-05-10',
  },
  {
    id: 2,
    hospital: 'Trabzon Devlet',
    blood_type: '0-',
    urgency: 'critical',
    date: '2025-05-17',
  },
  {
    id: 3,
    hospital: 'Ankara Şehir Hastanesi',
    blood_type: 'B+',
    urgency: 'medium',
    date: '2025-05-15',
  },
];

const BloodRequestListScreen = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');

  const filteredRequests = mockRequests.filter((req) => {
    const matchesBlood = selectedBloodType ? req.blood_type === selectedBloodType : true;
    const matchesUrgency = selectedUrgency ? req.urgency === selectedUrgency : true;
    return matchesBlood && matchesUrgency;
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.hospital}</Text>
      <Text style={styles.cell}>{item.blood_type}</Text>
      <Text style={styles.cell}>{item.urgency}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <TouchableOpacity style={styles.donateButton}>
        <Text style={styles.donateText}>Bağış Yap</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kan Talep Listesi</Text>

      <View style={styles.filterRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBloodType}
            onValueChange={(value) => setSelectedBloodType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Tüm Kan Grupları" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="0+" value="0+" />
            <Picker.Item label="0-" value="0-" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedUrgency}
            onValueChange={(value) => setSelectedUrgency(value)}
            style={styles.picker}
          >
            <Picker.Item label="Tüm Aciliyetler" value="" />
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Critical" value="critical" />
          </Picker>
        </View>
      </View>

      {/* Başlık Satırı */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Hastane</Text>
        <Text style={[styles.cell, styles.headerCell]}>Kan</Text>
        <Text style={[styles.cell, styles.headerCell]}>Acil</Text>
        <Text style={[styles.cell, styles.headerCell]}>Tarih</Text>
        <Text style={[styles.cell, styles.headerCell]}></Text>
      </View>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  pickerContainer: {
    flex: 1,
    minWidth: '48%',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  donateButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  donateText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default BloodRequestListScreen;
