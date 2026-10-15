import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRequests, updateRequestStatus2, deleteRequest } from '../services/api';
import Button from '../components/Button';

const HospitalRequestsScreen = () => {
  const route = useRoute();
  const hospital = route.params?.hospital;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const data = await fetchRequests();
      const filteredRequests = data.filter((req) => req.hospital_id === hospital?.id);
      setRequests(filteredRequests);

      if (filteredRequests.length === 0) {
        Alert.alert('Bilgi', 'Şu anda hiçbir talep bulunmamaktadır.');
      }
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
      setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: status } : req)));
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
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 50 }} />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {requests.map((request) => (
              <View key={request.id} style={styles.card}>
                <Text style={styles.cardTitle}>Talep ID: {request.id}</Text>
                <View style={styles.cardRow}><Text style={styles.cardLabel}>Kan Grubu:</Text><Text style={styles.cardValue}>{request.blood_type}</Text></View>
                <View style={styles.cardRow}><Text style={styles.cardLabel}>Aciliyet:</Text><Text style={styles.cardValue}>{request.urgency_level}</Text></View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Durum:</Text>
                  <Text style={[styles.cardValue, request.status === 'completed' ? styles.statusCompleted : styles.statusActive]}>
                    {request.status}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Tarih:</Text>
                  <Text style={styles.cardValue}>{new Date(request.created_at).toLocaleString('tr-TR')}</Text>
                </View>

                <View style={styles.buttonContainer}>
                  {request.status === 'accepted' && (
                    <Button title="Tamamla" onPress={() => handleUpdate(request.id, 'completed')} style={styles.completeButton} />
                  )}
                  {(request.status === 'completed' || request.status === 'active') && (
                    <Button title="Sil" onPress={() => handleDelete(request.id)} style={styles.deleteButton} />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 16 },
  scrollContainer: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardLabel: { fontSize: 14, color: '#555', fontWeight: '600' },
  cardValue: { fontSize: 14, color: '#333', fontWeight: '600' },
  statusCompleted: { color: '#27ae60', fontWeight: 'bold' },
  statusActive: { color: '#e74c3c', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  completeButton: { backgroundColor: '#27ae60', flex: 1, marginRight: 5, marginTop: 0 },
  deleteButton: { backgroundColor: '#c0392b', flex: 1, marginLeft: 5, marginTop: 0 },
});

export default HospitalRequestsScreen;
