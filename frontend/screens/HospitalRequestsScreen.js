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
  TouchableOpacity,
  ImageBackground,
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

      // Eğer talepler boşsa uyarı mesajı göster
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
    <ImageBackground
      source={require('../assets/background.png')} // Arka plan resmi
      style={styles.background}
    >
      <View style={styles.overlay}>

        {loading ? (
          <ActivityIndicator size="large" color="#e74c3c" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {requests.map((request) => (
              <View key={request.id} style={styles.card}>
                <Text style={styles.cardTitle}>Talep ID: {request.id}</Text>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Kan Grubu:</Text>
                  <Text style={styles.cardValue}>{request.blood_type}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Aciliyet:</Text>
                  <Text style={styles.cardValue}>{request.urgency_level}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Durum:</Text>
                  <Text
                    style={[
                      styles.cardValue,
                      request.status === 'completed'
                        ? styles.statusCompleted
                        : styles.statusActive,
                    ]}
                  >
                    {request.status}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Tarih:</Text>
                  <Text style={styles.cardValue}>
                    {new Date(request.created_at).toLocaleString('tr-TR')}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  {request.status === 'accepted' && (
                    <TouchableOpacity
                      style={[styles.button, styles.completeButton]}
                      onPress={() => handleUpdate(request.id, 'completed')}
                    >
                      <Text style={styles.buttonText}>Tamamla</Text>
                    </TouchableOpacity>
                  )}
                  {(request.status === 'completed' ||
                    request.status === 'active') && (
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleDelete(request.id)}
                    >
                      <Text style={styles.buttonText}>Sil</Text>
                    </TouchableOpacity>
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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hafif beyaz bir katman
    padding: 16,
  },
  header: {
    fontSize: 24, // Font boyutu küçültüldü
    fontWeight: '600', // Daha hafif bir font ağırlığı
    color: '#d35400', // Daha yumuşak bir renk tonu
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Hafif beyaz bir arka plan
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8, // Yuvarlatılmış köşeler
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Hafif gölge efekti
  },
  scrollContainer: {
    paddingBottom: 20,
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
  },
  cardTitle: {
    fontSize: 18,
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
  statusCompleted: {
    color: '#27ae60', // Yeşil renk (Tamamlandı)
    fontWeight: 'bold',
  },
  statusActive: {
    color: '#e74c3c', // Kırmızı renk (Aktif)
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: '#27ae60', // Yeşil renk
  },
  deleteButton: {
    backgroundColor: '#c0392b', // Kırmızı renk
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HospitalRequestsScreen;