#!/usr/bin/env node

import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {
  fetchRequests,
  updateRequestStatus2,
  deleteRequest,
} from '../services/api';

const HospitalRequestsScreen = () => {
  const route = useRoute();
  let hospital = route.params?.hospital;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const data = await fetchRequests();
      const filteredRequests = data.filter(
        (req) => req.hospital_id === hospital.id
      );
      setRequests(filteredRequests);
    } catch (error) {
      Alert.alert('Hata', 'Veriler alınamadı: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateRequestStatus2(id, status);
      Alert.alert('Başarılı', `Talep "${status}" olarak güncellendi.`);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: status } : req))
      );
    } catch (error) {
      Alert.alert('Hata', 'Güncelleme başarısız: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(id);
      Alert.alert('Başarılı', 'Talep silindi.');
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      Alert.alert('Hata', 'Silme başarısız: ' + error.message);
    }
  };

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
            <Text style={styles.cellHeader}>İşlem</Text>
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
              <View style={styles.buttonContainer}>
                {request.status === 'accepted' && (
                  <
                    Button
                    title="✅"
                    onPress={() => handleUpdate(request.id, 'completed')}
                    color="#27ae60"
                  />
                )}
                {(request.status === 'completed' ||
                  request.status === 'active') && (
                  <Button
                    title="🗑️"
                    onPress={() => handleDelete(request.id)}
                    color="#c0392b"
                  />
                )}
              </View>
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
    alignItems: 'center',
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HospitalRequestsScreen;
