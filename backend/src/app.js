const express = require('express');
const authRoute = require('/home/kaan/hemolink-419/backend/src/routes/routes.js');
const app = express();

app.use(express.json());
app.use('/', authRoute); // login ve logout rotaları burada

app.listen(3000, () => {
    console.log(`Sunucu 3000 portunda çalışıyor`);
  });
  