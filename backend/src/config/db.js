#!/usr/bin/env node

/*
    Bu dosya, PostgreSQL veritabanı bağlantısını yapılandırmak için kullanılır.
*/

const {Pool} = require('pg');  

require ('dotenv').config(); //env dosyasındaki bilgileri kullanabilmek için dotenv kütüphanesini ekliyoruz

const pool = new Pool({
  host: 'localhost' ,
  database: 'hemolink',
  user:'postgres',
  password: 'a' ,
  port: 5432,
});

module.exports = pool ; 

