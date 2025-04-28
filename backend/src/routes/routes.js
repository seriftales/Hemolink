const express = require('express');
const { loginUser } = require('/home/kaan/hemolink-419/backend/src/controllers/login.js');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

module.exports = router;
