const express = require('express');
const { loginUser, logOutUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const router = express.Router();

router.post('/login', loginUser); 
router.post('/logout', logOutUser); 
router.post ('/register',registerUser) ; 

module.exports = router;
