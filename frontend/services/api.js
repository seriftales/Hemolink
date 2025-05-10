// api.js
const BASE_URL = 'http://192.168.121.254:3000'; // kendi IP ve portuna göre ayarla

const loginReq = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }
  
      return data; // { token, user }
    
    } catch (error) {
      alert('Email veya Şifre yanlış tekrar deneyiniz!:', error.message);
      throw error;
    }
  };
  

const registerReq = async (name, email, password) => {
    console.log("registerReq çalıştı");
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log("registerReq çalıştı 2");
      
      const data  = await response.json(); 
      
      if (!response.ok) {
        throw new Error(data.message || 'Kayıt başarısız');
      }
  
      return data; // { token, user }
    } catch (error) {
      console.error('Kayıt işlemi sırasında bir hata oluştu:', error.message);
      alert('Kayıt işlemi sırasında bir hata oluştu: ' + error.message);
      throw error; // Hata yakalama
    }
  };
  
const hospitalReq = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hospital`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Hastane verisi alınamadı');
    }

    return data;
  } catch (error) {
    console.error('Hastane verisi alma hatası:', error.message);
    return [];
  }
};





  module.exports = {
    loginReq,
    registerReq,
    hospitalReq
  };
