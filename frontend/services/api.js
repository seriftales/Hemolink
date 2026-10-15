const BASE_URL = 'http://192.168.142.254:5000/api/v1';
// kendi IP ve portuna göre ayarla

const loginReq = async (email, password) => {
  try {
    
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

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
    const requestBody = { 
      name, 
      surname, 
      email, 
      password, 
      age: parseInt(age), // age'i number'a çevir
      bloodType // bloodType'ı olduğu gibi gönder
    };

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

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

const createReq = async (name,id,bloodType,urgencyLevel) => {
  try {
    
    const requestBody = {
      name,
      id,
      bloodType,
      urgencyLevel
    };

    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Talep başarısız');
    }

    return data;
  } catch (error) {
    console.error('Create API Error:', error);
    alert('Talep işlemi hatası:\n' + error.message);
    throw error;
  }
};
 const fetchRequests = async () => {
  try {
    const response = await fetch(`${BASE_URL}/request/donor`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Veriler alınamadı');
    }

    return data;
  } catch (error) {
    console.error('Fetch Requests Error:', error);
    throw error;
  }
};

const updateRequestStatus = async (id, status,userEmail) => {
  
  const updateBody= {
    id,
    status ,
    userEmail
  } 
  const response = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBody),
  });
  if (!response.ok) throw new Error('Durum güncellenemedi');
  return response.json();
};


const updateRequestStatus2 = async (id, status) => {
  
  const updateBody= {
    id,
    status 
  } 
  const response = await fetch(`${BASE_URL}/update2`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBody),
  });
  if (!response.ok) throw new Error('Durum güncellenemedi');
  return response.json();
};


const deleteRequest = async (id) => {
  
  const deleteBody = { id };
  try {
    const response = await fetch(`${BASE_URL}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteBody ),
    
    });
    if (!response.ok) throw new Error('Talep silinemedi');
    return response.json();
  } catch (error) {
    console.error('Delete Request Error:', error);
    throw error;
  }
};

const fetchDonationsByEmail = async (email) => {

  const fetchBody = {email} 

  const response = await fetch (`${BASE_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fetchBody),
  });
  if (!response.ok) throw new Error('Bağışlar alınamadı');
  return response.json();
}

const getPhones = async (hospitalIds) => {
  
  const response = await fetch(`${BASE_URL}/phones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: hospitalIds }),
  });
  return await response.json(); // [{ hospital_id: 1, phone: '555-1234' }, ...]
};

export { 
  loginReq, 
  registerReq, 
  hospitalReq, 
  hospitalLoginReq ,
  createReq,
  fetchRequests,
  updateRequestStatus,
  updateRequestStatus2,
  fetchDonationsByEmail,
  deleteRequest,
  getPhones
}; 