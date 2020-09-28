const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDb = await User.findOne({ email });
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Credentials are not valid'
            });
        }
        const validPassword = bcryptjs.compareSync(password, userDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials are not valid'
            });
        }
        const token = await createJWT(userDb.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, talk to the administrator'
        });
    }
};

const loginGoogle = async (req, res = response) => {
    const { token } = req.body;
    try {
        const { email, name, picture } = await googleVerify(token);
        const userDb = await User.findOne({ email });
        let user;
        if (!userDb) {
            user = new User({
                name,
                email,
                password: '@@@',
                image: picture,
                google: true
            });
        } else {
            user = userDb;
            user.google = true;
        }
        await user.save();
        const newToken = await createJWT(user.id);
        res.json({
            ok: true,
            newToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, talk to the administrator'
        });
    }
};

module.exports = {
    login,
    loginGoogle
};
