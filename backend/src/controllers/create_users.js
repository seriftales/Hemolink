const pool = require('../config/db.js');

const passwords = ['parolaBagisci', 'parolaHasta', 'parolaHastane'];

const createUsers = async () => {

    const users = [
        { name: 'bagisci', surname: 'test', email: 'bagisci@gmail.com', password: passwords[0] },
        { name: 'hasta', surname: 'test', email: 'hasta@gmail.com', password: passwords[1] },
        { name: 'hastane', surname: 'test', email: 'hastane@gmail.com', password: passwords[2] }
               
         
    ];

    for (let i = 0; i < users.length; i++) {
        const random_password = passwords[i];  // Şifreyi diziden alıyoruz

        try {
            const query = `INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)`;
            const values = [users[i].name, users[i].surname, users[i].email, random_password];

            await pool.query(query, values);  // Veritabanına kullanıcı ekliyoruz
            console.log('Kullanıcı başarıyla oluşturuldu:', users[i]);
        } catch (error) {
            console.error('Kullanıcı oluşturma hatası:', error);
        }
    }
};

createUsers().finally(() => {
    pool.end();  // Bağlantıyı kapatıyoruz
});
