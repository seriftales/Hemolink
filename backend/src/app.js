const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/routes.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', loginRoute);

app.listen(port, () => {
    console.log('Sunucu çalışıyor...');
});
