const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new error('Error al iniciar la DB, ver logs');
    }
};

module.exports = {
    dbConnection
}
