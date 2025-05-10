const express = require('express');
const { loginUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const router = express.Router();

router.post('/login', loginUser); 
router.post ('/register',registerUser) ; 

module.exports = router;
