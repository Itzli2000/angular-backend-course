const jwt = require('jsonwebtoken');

const createJWT = (uid) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' }, (err, token) => {
            if(err) {
                console.log(err);
                reject('Can´t create JWT');
            } else {
                resolve(token);
            }
    
        });
    });
};

module.exports = {
    createJWT
};