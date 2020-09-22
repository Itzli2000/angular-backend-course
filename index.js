require('dotenv').config();
const { dbConnection } = require('./DB/config');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dbConnection();

// Routes
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/users', require('./routes/users'));
app.use( '/api/hospitals', require('./routes/hospitals'));
app.use( '/api/doctors', require('./routes/doctors'));

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ', process.env.PORT);
});

