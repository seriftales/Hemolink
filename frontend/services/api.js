const BASE_URL = 'http://192.168.170.43:3000'; // kendi IP ve portuna göre ayarla

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
    alert('Email veya Şifre yanlış tekrar deneyiniz!\n' + error.message);
    throw error;
  }
};

export const registerReq = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Kayıt başarısız');
    }

    return data; // { token, user }
  } catch (error) {
    alert('Kayıt işlemi hatası:\n' + error.message);
    throw error;
  }
};

export const hospitalReq = async () => {
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

export const hospitalLoginReq = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/hospital-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Giriş başarısız');
    return data;
  } catch (error) {
    alert('Hastane girişi hatası:\n' + error.message);
    throw error;
  }
};