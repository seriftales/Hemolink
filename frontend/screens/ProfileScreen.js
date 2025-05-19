import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Sahte bağış geçmişi verisi (backend hazır olana kadar)
const mockDonations = [
  {
    id: 1,
    hospital: 'KTÜ Kan Merkezi',
    date: '2024-12-10',
    units: 1,
    status: 'Tamamlandı',
  },
  {
    id: 2,
    hospital: 'Trabzon Devlet Hastanesi',
    date: '2024-08-23',
    units: 2,
    status: 'Bekliyor',
  },
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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Profilim</Text>

        {/* 👤 Kullanıcı Bilgileri */}
        <View style={styles.card}>
          <Info label="Ad Soyad" value={`${user.name}  ${user.surname || ''}`} />
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
          mockDonations.map((donation) => (
            <View key={donation.id} style={styles.donationCard}>
              <Text style={styles.donationTitle}>{donation.hospital}</Text>
              <Text style={styles.donationInfo}>
                Tarih: {donation.date} | Ünite: {donation.units}
              </Text>
              <Text style={styles.donationStatus}>
                Durum: {donation.status}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Henüz bağış yapılmamış.</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Info = ({ label, value }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fdfdfd',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c0392b',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  donationCard: {
    backgroundColor: '#fefefe',
    width: '100%',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  donationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  donationInfo: {
    fontSize: 14,
    color: '#555',
  },
  donationStatus: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    marginTop: 4,
  },
  noData: {
    fontSize: 14,
    color: '#888',
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
