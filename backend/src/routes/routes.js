const express = require('express');
const { loginUser, logOutUser } = require('/home/kaan/hemolink-419/backend/src/controllers/login.js');
const router = express.Router();

router.post('/login', loginUser); 
router.post('/logout', logOutUser); 

module.exports = router;
