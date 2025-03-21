import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* LOGO ve Başlık */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('./assets/logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>HemoLink-419</Text>
      </View>

      {/* Bilgilendirme Kısmı */}
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>Kan Bağışı Takip ve Eşleştirme</Text>
        <Text style={styles.description}>
          HemoLink-419, kan bağışı süreçlerini kolaylaştırmayı hedefler. 
          Buradan bağış yapmak isteyenler ve ihtiyaç duyanlar hızlıca 
          bir araya gelebilir.
        </Text>
      </View>

      {/* İstatistik Kartları */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Toplam Bağışçı</Text>
        <Text style={styles.cardValue}>1,234</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aktif İlanlar</Text>
        <Text style={styles.cardValue}>56</Text>
      </View>

      {/* Butonlar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Bağış Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>İhtiyaç Duyuru</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ScrollView içindeki bileşenleri dikeyde ortalıyoruz
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },

  // Logo ve başlık
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b71c1c',
  },

  // Uygulama açıklaması
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },

  // İstatistik kartları
  card: {
    width: '90%',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',

    // Android gölgesi için
    elevation: 3, 
    // iOS gölgesi için (isteğe bağlı)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b71c1c',
  },

  // Ana butonlar
  button: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '90%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#c62828',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  // Çerçeveli buton (Outline)
  outlineButton: {
    borderWidth: 2,
    borderColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '90%',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
});
