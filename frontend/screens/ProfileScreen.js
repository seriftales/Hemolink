// ProfileScreen.js — Arka plan görselli, şık tasarım
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

const mockDonations = [
  { id: 1, date: '12.05.2024', hospital: 'Acıbadem' },
  { id: 2, date: '08.03.2024', hospital: 'Medipol' },
];

const ProfileScreen = ({ route, navigation }) => {
  const user = route.params?.user;

  const handleLogout = () => {
    navigation.navigate('LoginSelection');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Profil Bilgisi Yüklenemedi</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Giriş Ekranına Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/tema3.png')} // 🔥 Sadece arka plan
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profilim</Text>

        {/* 👤 Kullanıcı Bilgileri */}
        <View style={styles.card}>
          <Info label="Ad Soyad" value={`${user.name} ${user.surname || ''}`} />
          <Info label="Email" value={user.email} />
          <Info label="Yaş" value={user.age || '-'} />
          <Info label="Kan Grubu" value={user.blood_type || '-'} />
          <Info
            label="Kayıt Tarihi"
            value={
              user.created_at
                ? new Date(user.created_at).toLocaleDateString('tr-TR')
                : '-'
            }
          />
        </View>

        {/* 🩸 Bağış Geçmişi */}
        <Text style={styles.subHeader}>Bağış Geçmişi</Text>
        {mockDonations.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Tarih</Text>
              <Text style={styles.tableHeaderText}>Hastane</Text>
            </View>
            {mockDonations.map((donation) => (
              <View key={donation.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{donation.date}</Text>
                <Text style={styles.tableCell}>{donation.hospital}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noData}>Henüz bağış yapılmamış.</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: '#c0392b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 10,
    textShadowColor: '#c0392b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  table: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 12,
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  noData: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
