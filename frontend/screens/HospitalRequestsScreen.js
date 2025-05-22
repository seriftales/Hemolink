import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { fetchRequests } from '../services/api'; // doğru yolu yaz

const HospitalRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data); // veritabanından gelen gerçek veriler
      } catch (error) {
        Alert.alert('Hata', 'Veriler alınamadı: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Talepler</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e74c3c" />
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.cellHeader}>ID</Text>
            <Text style={styles.cellHeader}>Kan Grubu</Text>
            <Text style={styles.cellHeader}>Aciliyet</Text>
            <Text style={styles.cellHeader}>Durum</Text>
            <Text style={styles.cellHeader}>Tarih</Text>
          </View>

          {requests.map((request) => (
            <View key={request.id} style={styles.tableRow}>
              <Text style={styles.cell}>{request.id}</Text>
              <Text style={styles.cell}>{request.blood_type}</Text>
              <Text style={styles.cell}>{request.urgency_level}</Text>
              <Text style={styles.cell}>{request.status}</Text>
              <Text style={styles.cell}>
                {new Date(request.created_at).toLocaleString('tr-TR')}
              </Text>
            </View>
          ))}
        </>
      )}
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
