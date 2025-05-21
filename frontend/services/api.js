const BASE_URL = 'http://192.168.124.85:3000';
// kendi IP ve portuna göre ayarla

const loginReq = async (email, password) => {
  try {
    console.log('Login attempt started');
    console.log('Sending request to:', `${BASE_URL}/login`);
    
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response received:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Giriş başarısız');
    }

    return data; // { token, user }
  } catch (error) {
    console.error('Login error:', error);
    alert('Giriş hatası: ' + error.message);
    throw error;
  }
};

const registerReq = async (name, surname, email, password, age, bloodType) => {
  try {
    // Debug için request body'yi yazdır
    const requestBody = { 
      name, 
      surname, 
      email, 
      password, 
      age: parseInt(age), // age'i number'a çevir
      bloodType // bloodType'ı olduğu gibi gönder
    };
    console.log('Register Request Body:', requestBody);

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('Register Response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Kayıt başarısız');
    }

    return data;
  } catch (error) {
    console.error('Register API Error:', error);
    alert('Kayıt işlemi hatası:\n' + error.message);
    throw error;
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

const hospitalLoginReq = async (email, password) => {
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

export { loginReq, registerReq, hospitalReq, hospitalLoginReq }; 