// api.js
const BASE_URL = 'http://192.168.121.254:3000'; // kendi IP ve portuna göre ayarla

const loginReq = async (email, password) => {
    try {
      console.log("loginReq çalıştı");
      const response = await fetch(`http://192.168.121.254:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("loginReq çalıştı 2");
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

module.exports = {
    loginReq,
    logoutReq,
  };
