require('dotenv').config();
const { dbConnection } = require('./DB/config');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

dbConnection();

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello to all'
    });
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ', process.env.PORT);
});

