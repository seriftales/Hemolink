# Hemolink Kan Bağışı Uygulaması 

HemoLink, kan bağışçıları ile hastaneleri veya bağış merkezlerini bir araya getirmeyi amaçlayan bir mobil uygulamadır.Bu uygulama sayesinde kan ihtiyacı olan hastalara yardım daha kolay ulaşabilir.

## Özellikler 
HemoLink, modüler ve genişletilebilir bir sistem mimarisine sahiptir.

Frontend : React Native ve Expo altyapısıyla geliştirilmiştir. Kullanıcı oturumları ve sayfa yönlendirmeleri Context API üzerinden merkezi olarak yönetilmektedir.Backend istekleri de api.js den yonetilmektedir.

Backend : Node.js ve Express ile inşa edilmiştir.Güvenlik JWT tabanlı yetkilendirme ile sağlanırken veri kalıcılığı güçlü ilişkisel veritabanı PostgreSQL üzerinden yürütülmektedir.

## Gereksinimler 
Sistemi ayağa kaldırmak için aşağıdaki yazılımların sisteminizde kurulu olması gerekmektedir:
  * Node.js ve npm
  * PostgreSQL
  * Expo CLI

## Backend Kurulumu

Backend servisini ayağa kaldırmak için backend/src dizininde işlem yapılmalıdır.

### 1. Çevre Değişkenlerinin (.env) Oluşturulması
Backend kök dizininde bir .env dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```bash 
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=hemolink
DB_PASSWORD=hemolink123
DB_PORT=5432
JWT_SECRET=anahtar
JWT_EXPIRES_IN=7d
```
### 2. Veritabanı Yapılandırması 

Uygulamanın çalışabilmesi için veritabanı ve kullanıcının doğru yapılandırılmış olması gerekir.

Ubuntu terminalinde şifre belirlemek için:

```bash

sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'hemolink123';"
```

Veritabanı oluşturmak için:
```bash
sudo -u postgres psql -c "CREATE DATABASE hemolink;"
```
### 3. Bağımlılıkların Kurulumu
Backend dizinindeyken gerekli modülleri kurun:
```bash
npm install express pg jsonwebtoken cors dotenv axios bcrypt
```
Not:Geliştirme sürecini hızlandırmak için npm install -D nodemon kurabilirsiniz. Böylece her kod değişiminde sunucuyu manuel yeniden başlatmak zorunda kalmazsınız.

### 4. Veritabanı İnşası 
Tabloları oluşturmak ve test verilerini eklemek için kurulum betiğini çalıştırın:
```bash
node database/setup.js
```
Terminalde "Veritabanı şeması ve test verileri başarıyla oluşturuldu" mesajını almalısınız.

### 5. Sunucuyu Başlatma
Veritabanı hazırlandıktan sonra sunucuyu başlatın:
```bash
node server.js
```

## Frontend Kurulumu

Frontend arayüzünü ayağa kaldırmak için frontend dizinine geçin.

### 1. Bağımlılıklar ve Çalıştırma
```bash
cd frontend
npm install
npx expo start
```

### 2. Sık Karşılaşılan Hatalar ve Çözümleri
**Hata 1 : Genel npm Kurulum Hataları**
Temiz bir kurulum için:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```
**Hata 2: Sürüm Çakışmaları**

Expo sürümünü sabitleyin ve uyumsuz paketleri otomatik onarın:

```bash

npx expo install expo@~57.0.0

npx expo install --fix

npx expo start -c
```

**Hata 3: Beyaz Ekran veya Paket Eksikliği**
Gerekli temel paketlerin yüklü olduğundan emin olun:
```bash
npx expo install @react-native-async-storage/async-storage axios
```
**Hata 4: Ubuntu 24.04 AppArmor FATAL Crash**
Ubuntu'nun yeni güvenlik politikaları Expo DevTools'u engellediğinde:
```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
npx expo start -c
```
## Teknik Borçlar
**Harita Entegrasyonu:** react-native-maps için Google Maps API entegrasyonu tamamlanacak. 
**Bildirim Sistemi:** Bildirim sistemi eklenmesi gerekmektedir.

## Dizin Yapısı 

```text
HemoLink/
├── backend/                 # Node.js & Express Sunucusu
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/          # Veritabanı ve ortam değişkeni yapılandırmaları
│       ├── controllers/     # API iş mantığı ve ana fonksiyonlar
│       ├── database/        # Kurulum betikleri ve şemalar
│       ├── middlewares/     # JWT yetkilendirme ve güvenlik katmanları
│       ├── routes/          # API uç noktaları 
│       ├── server.js        # Sunucuyu başlatan ana giriş dosyası
│       └── utils/           # Ortak yardımcı fonksiyonlar
├── frontend/                # React Native (Expo) İstemcisi
│   ├── App.js               # Uygulama giriş noktası ve ana sarmalayıcı
│   ├── app.json             # Expo proje ve paket konfigürasyonu
│   ├── assets/              # İkonlar, logolar ve statik görseller
│   ├── components/          # Tekrar kullanılabilir UI parçaları 
│   ├── context/             # Global state yönetimi (AuthContext.js)
│   ├── navigation/          # Yönlendirme ayarları (AppNavigator.js)
│   ├── screens/             # Kullanıcı arayüzü sayfaları 
│   └── services/            # Axios API ağ istekleri (api.js)
└── SECURITY.md              # Proje güvenlik politikaları
```







