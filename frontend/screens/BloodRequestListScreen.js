import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchRequests, updateRequestStatus, getPhones } from '../services/api';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext'; 

const BloodRequestListScreen = () => {
  const { user } = useAuth(); 
  
  const [requests, setRequests] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        const allHospitalID = data.map(req => req.hospital_id);
        const phoneData = await getPhones(allHospitalID);
        
        const mappedRequests = data.map(req => ({
          ...req,
          phone: phoneData[req.hospital_id] || 'Bilinmiyor',
        }));
        setRequests(mappedRequests);
      } catch (error) {
        Alert.alert('Hata', 'Veriler alınamadı: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const handleComplete = async (id) => {
    try {
      await updateRequestStatus(id, 'accepted', user.email);
      setRequests((prev) => prev.map((req) => req.id === id ? { ...req, status: 'accepted' } : req));
      Alert.alert('Başarılı', '24 saat içinde kan bağışı merkezinde bulunun.');
    } catch (error) {
      Alert.alert('Hata', 'Bağış yapılamadı: ' + error.message);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesBlood = !selectedBloodType || req.blood_type === selectedBloodType;
    const matchesUrgency = !selectedUrgency || req.urgency_level === selectedUrgency;
    return matchesBlood && matchesUrgency && req.status === 'active';
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.hospital_name}</Text>
      <View style={styles.cardRow}><Text style={styles.cardLabel}>Kan Grubu:</Text><Text style={styles.cardValue}>{item.blood_type}</Text></View>
      <View style={styles.cardRow}><Text style={styles.cardLabel}>Aciliyet:</Text><Text style={styles.cardValue}>{item.urgency_level}</Text></View>
      <View style={styles.cardRow}><Text style={styles.cardLabel}>Tarih:</Text><Text style={styles.cardValue}>{new Date(item.created_at).toLocaleString('tr-TR')}</Text></View>
      <View style={styles.cardRow}><Text style={styles.cardLabel}>Telefon:</Text><Text style={styles.cardValue}>{item.phone}</Text></View>
      
      {}
      <Button 
        title={item.status === 'completed' ? 'Tamamlandı' : 'Bağış Yap'}
        onPress={() => handleComplete(item.id)}
        disabled={item.status === 'completed'}
        style={{ marginTop: 12, padding: 10 }}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/tema4.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>Kan Talep Listesi</Text>
        <View style={styles.filters}>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedBloodType} style={styles.picker} onValueChange={setSelectedBloodType}>
              <Picker.Item label="Kan Grubu" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="0+" value="0+" />
              <Picker.Item label="0-" value="0-" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedUrgency} style={styles.picker} onValueChange={setSelectedUrgency}>
              <Picker.Item label="Aciliyet" value="" />
              <Picker.Item label="low" value="low" />
              <Picker.Item label="medium" value="medium" />
              <Picker.Item label="high" value="high" />
              <Picker.Item label="critical" value="critical" />
            </Picker>
          </View>
        </View>

        <FlatList
          data={filteredRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#fff' }}>Kriterlere uygun kan talebi bulunamadı.</Text>}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 16, textAlign: 'center', textShadowColor: '#c0392b', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.95)', padding: 10, borderRadius: 8 },
  pickerContainer: { flex: 1, marginHorizontal: 5 },
  picker: { backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  card: { backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 12, padding: 16, marginBottom: 16, borderLeftWidth: 5, borderLeftColor: '#e74c3c' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardLabel: { fontSize: 14, color: '#555', fontWeight: '600' },
  cardValue: { fontSize: 14, color: '#333', fontWeight: '600' },
});

export default BloodRequestListScreen;
