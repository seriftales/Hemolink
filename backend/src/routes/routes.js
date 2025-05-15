const express = require('express');
const { loginUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const { getHospitals } = require('../utils/hospital.js');
const router = express.Router();

router.post('/login', loginUser); 
router.post ('/register',registerUser) ; 
router.get ('/hospital', getHospitals) ; 

module.exports = router;
