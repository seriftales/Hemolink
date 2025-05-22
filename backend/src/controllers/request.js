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
  
  const {id, status } = req.body; // "completed" bekliyoruz
  console.log(req.body) ; 

  try {
    
    const data = await connectDB() ;  
    const result = await data.query('UPDATE blood_requests SET status = $1 WHERE id = $2', [status, id]);
    console.log(result) ; 
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {getRequestForHospital,getRequestForDonor,updateRequest};