const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/routes/router');
const mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

mongoose.connect(process.env.DATABASE_HOST)
  .then(() => {
    console.log('bd conectado...')
    app.listen(process.env.DATABASE_PORT, () => {
      console.log('Conet...')
    })
  })
  .catch((err) => { console.log(err) })