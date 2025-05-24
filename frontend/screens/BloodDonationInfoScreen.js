// BloodDonationInfoScreen.js — Duygusal ve Emoji Destekli
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function BloodDonationInfoScreen() {
  return (
    <ImageBackground
      source={require('../assets/info1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🩸 Bir Damla, Bir Umut</Text>

        <View style={styles.card}>
          <Text style={styles.title}>💡 Neden Kan Bağışı?</Text>
          <Text style={styles.text}>
            Her 4 saniyede bir kişi kana ihtiyaç duyuyor. 🕒 Bir damla kan, bir hayat demek. Belki de hiç tanımadığın biri senin bağışınla hayata tutunacak. 🤝
          </Text>

          <Text style={styles.title}>👤 Kimler Bağış Yapabilir?</Text>
          <Text style={styles.text}>
            ✔️ 18-65 yaş arası
            {'\n'}✔️ 50 kg üzeri
            {'\n'}✔️ Genel sağlık durumu iyi olan herkes
            {'\n'}
            Kan vermek için süper kahraman olmana gerek yok — sadece insan ol yeter ❤️
          </Text>

          <Text style={styles.title}>🔄 Süreç Nasıl İşliyor?</Text>
          <Text style={styles.text}>
            1️⃣ Kayıt
            {'\n'}2️⃣ Mini sağlık kontrolü
            {'\n'}3️⃣ 10-15 dakikalık bağış süreci
            {'\n'}4️⃣ Dinlenme ve küçük bir ikram ☕🍪
          </Text>

          <Text style={styles.title}>📅 Ne Sıklıkla Bağış Yapabilirim?</Text>
          <Text style={styles.text}>
            👨 Erkekler: 3 ayda bir
            {'\n'}👩 Kadınlar: 4 ayda bir
            {'\n'}Vücudun kendini hızla yeniler, her bağışta sen de güçlenirsin.
          </Text>

          <Text style={styles.title}>💖 Kan Bağışı Sana da İyi Gelir</Text>
          <Text style={styles.text}>
            • Fiziksel olarak: Kan hücrelerin yenilenir 🔄
            {'\n'}• Ruhsal olarak: Birine hayat verdiğini bilmek tarifsizdir 🌈
            {'\n'}• Toplumsal olarak: Dayanışmayı büyütürsün 🤗
          </Text>

          <Text style={styles.textFooter}>Bir damla senden, bir umut bizden. 🙏</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#c0392b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#c0392b',
    marginTop: 18,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    lineHeight: 22,
  },
  textFooter: {
    fontSize: 16,
    color: '#c0392b',
    marginTop: 24,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
