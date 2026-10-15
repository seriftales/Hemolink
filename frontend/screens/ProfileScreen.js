import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { fetchDonationsByEmail } from '../services/api';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth(); 
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadDonations();
    }
  }, [user]);

  const loadDonations = async () => {
    try {
      const data = await fetchDonationsByEmail(user.email);
      setDonations(data);
    } catch (error) {
      Alert.alert('Hata', 'Bağış geçmişi alınamadı: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <ImageBackground source={require('../assets/tema3.png')} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.header}>Profil Bilgisi Yüklenemedi</Text>
          <Button title="Giriş Ekranına Dön" onPress={logout} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/tema3.png')} style={styles.background} resizeMode="cover">
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Profilim</Text>

          <View style={styles.card}>
            <Info label="Ad Soyad" value={`${user.name} ${user.surname || ''}`} />
            <Info label="Email" value={user.email} />
            <Info label="Yaş" value={user.age || '-'} />
            <Info label="Kan Grubu" value={user.blood_type || '-'} />
            <Info label="Kayıt Tarihi" value={user.created_at ? new Date(user.created_at).toLocaleDateString('tr-TR') : '-'} />
          </View>

          <Text style={styles.subHeader}>Bağış Geçmişi</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#e74c3c" />
          ) : donations.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Tarih</Text>
                <Text style={styles.tableHeaderText}>Hastane</Text>
              </View>
              {donations.map((donation) => (
                <View key={donation.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{new Date(donation.created_at).toLocaleDateString('tr-TR')}</Text>
                  <Text style={styles.tableCell}>{donation.hospital_name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noData}>Henüz bağış yapılmamış.</Text>
          )}

          <Button title="Çıkış Yap" onPress={logout} style={{ marginTop: 24, paddingVertical: 12 }} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const Info = ({ label, value }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  scrollContainer: { backgroundColor: 'rgba(255,255,255,0.1)' },
  container: { flex: 1, padding: 20, paddingBottom: 60, alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#e74c3c', marginBottom: 20 },
  card: { backgroundColor: '#fff', width: '100%', padding: 20, borderRadius: 12, elevation: 5, marginBottom: 30 },
  label: { fontSize: 15, color: '#666' },
  value: { fontSize: 17, fontWeight: '600', color: '#333' },
  subHeader: { fontSize: 20, fontWeight: 'bold', color: '#c0392b', alignSelf: 'flex-start', marginBottom: 10 },
  table: { width: '100%', backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', marginBottom: 24 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e74c3c', padding: 12 },
  tableHeaderText: { flex: 1, color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  tableCell: { flex: 1, fontSize: 15, color: '#333' },
  noData: { fontSize: 14, color: '#888', marginBottom: 20 },
});

export default ProfileScreen;
