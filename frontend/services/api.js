// api.js
const BASE_URL = 'http://192.168.98.184:3000'; // kendi IP ve portuna göre ayarla

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
  
const logoutReq = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('logoutUser API error:', error.message);
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
  




  module.exports = {
    loginReq,
    logoutReq,
    registerReq
  };
