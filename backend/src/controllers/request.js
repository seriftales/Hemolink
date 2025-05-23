const {connectDB} = require('../config/db.js');


const getRequestForHospital = async (req, res) => {
  try {
     const query = 'SELECT * FROM blood_requests'; 
     const data = await connectDB() ; 
     const result = await data.query(query);
     res.status(200).json(result.rows);
  } catch (err) {
    console.error('getRequest error:', err);
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};

const getRequestForDonor = async (req, res) => {
  try {
     const query = 'SELECT * FROM blood_requests WHERE status = "active" '; 
     const data = await connectDB() ; 
     const result = await data.query(query);
     res.status(200).json(result.rows);
  } catch (err) {
    console.error('getRequest error:', err);
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};

const updateRequest = async (req, res) => {
  
  const {id, status,userEmail } = req.body; // "completed" bekliyoruz
  console.log(req.body) ; 

  try {
    
    const data = await connectDB() ;  
    const result = await data.query('UPDATE blood_requests SET status = $1, donor_email = $2 WHERE id = $3', [status, userEmail,id]);
    console.log(result) ; 
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const updateRequest2 = async (req, res) => {
  
  const {id, status } = req.body; // "completed" bekliyoruz
  console.log(req.body) ; 

  try {
    
    const data = await connectDB() ;  
    const result = await data.query('UPDATE blood_requests SET status = $1 WHERE id = $2', [status,id]);
    console.log(result) ; 
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getPastDonations = async (req, res) => {
  
  const email = req.body.email;
  console.log('İstenen email:', email);

  try {
    const data = await connectDB();

    const query = {
      text: 'SELECT * FROM blood_requests WHERE donor_email = $1 AND status = $2',
      values: [email, 'completed'],
    };

    const result = await data.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('getPastDonations error:', err);
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};



module.exports = {
  getRequestForHospital,
  getRequestForDonor,
  updateRequest,
  updateRequest2,
  getPastDonations
};