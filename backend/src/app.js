//app.js
const express = require('express');
const authRoute = require('./routes/routes.js');
const app = express();

app.use(express.json());
app.use('/', authRoute); // login ve logout rotaları burada
//connectDB()
app.listen(3000, () => {
    console.log(`Sunucu 3000 portunda çalışıyor`);
  });
  