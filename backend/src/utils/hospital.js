const {connectDB} = require('../config/db.js');

const getHospitals = async (req, res) => {

    try {
        const query = 'SELECT * FROM hospitals'; 
        const data = await connectDB() ; 
        const result = await data.query(query);
        res.status(200).json(result.rows);


    }catch (error) {
        console.error('Error fetching hospitals:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}; 

module.exports = { getHospitals }; 