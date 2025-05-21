import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mockRequests = [
  {
    id: 1,
    blood_type: 'A+',
    urgency_level: 'high',
    status: 'active',
    created_at: '2025-05-20 14:33',
  },
  {
    id: 2,
    blood_type: 'B-',
    urgency_level: 'critical',
    status: 'active',
    created_at: '2025-05-18 09:12',
  },
  {
    id: 3,
    blood_type: '0+',
    urgency_level: 'medium',
    status: 'completed',
    created_at: '2025-05-10 17:45',
  },
];

const HospitalRequestsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Talepler</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.cellHeader}>ID</Text>
        <Text style={styles.cellHeader}>Kan Grubu</Text>
        <Text style={styles.cellHeader}>Aciliyet</Text>
        <Text style={styles.cellHeader}>Durum</Text>
        <Text style={styles.cellHeader}>Tarih</Text>
      </View>

      {mockRequests.map((request) => (
        <View key={request.id} style={styles.tableRow}>
          <Text style={styles.cell}>{request.id}</Text>
          <Text style={styles.cell}>{request.blood_type}</Text>
          <Text style={styles.cell}>{request.urgency_level}</Text>
          <Text style={styles.cell}>{request.status}</Text>
          <Text style={styles.cell}>{request.created_at}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8d7da',
    padding: 12,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#c0392b',
    fontSize: 14,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
  },
});

export default HospitalRequestsScreen;
