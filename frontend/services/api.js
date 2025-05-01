
const BASE_URL = 'http://192.168.1.47:3000'; // kendi IP ve portuna göre ayarla


export const loginReq = async (email, password) => {
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
      console.error('loginUser API error:', error.message);
      throw error;
    }
  };
  
  export const logoutReq = async () => {
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
