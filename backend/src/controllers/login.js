const pool = require('../config/db.js');

const loginUser = async (email, password) => {
    try {
        // Kullanıcıyı email ile sorguluyoruz
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            // Kullanıcı bulunamadıysa
            return { success: false, message: 'Kullanıcı bulunamadı!' };
        }

        const user = result.rows[0];

        // Şifreyi kontrol ediyoruz
        if (user.password === password) {
            return { success: true, message: 'Giriş başarılı!', user };
        } else {
            return { success: false, message: 'Yanlış şifre!' };
        }

    } catch (error) {
        console.error('Giriş hatası:', error);
        return { success: false, message: 'Bir hata oluştu!' };
    }
};

module.exports = { loginUser };
