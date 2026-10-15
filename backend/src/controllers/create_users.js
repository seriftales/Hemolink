const { query } = require('../config/db');

const passwords = ['parolaBagisci', 'parolaHasta', 'parolaHastane'];

// Test kullanıcıları oluştur
const createUsers = async () => {
    const users = [
        { name: 'bagisci', surname: 'test', email: 'bagisci@gmail.com', password: passwords[0] },
        { name: 'hasta', surname: 'test', email: 'hasta@gmail.com', password: passwords[1] },
        { name: 'hastane', surname: 'test', email: 'hastane@gmail.com', password: passwords[2] }
    ];

    for (let i = 0; i < users.length; i++) {
        try {
            await query(
                `INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)`,
                [users[i].name, users[i].surname, users[i].email, passwords[i]]
            );
            console.log('Kullanıcı başarıyla oluşturuldu:', users[i].email);
        } catch (error) {
            console.error('Kullanıcı oluşturma hatası:', error);
        }
    }
    process.exit(0); 
};

createUsers();