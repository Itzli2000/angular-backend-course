const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const [users, totalUsers] = await Promise.all([
        User.find({}, 'name email password google')
            .skip(from)
            .limit(5),
        User.count()
    ]);
    res.json({
        ok: true,
        uid: req.uid,
        users,
        totalUsers
    });
};

const createUsers = async (req, res = response) => {
    const { password, email } = req.body;
    try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email exists'
            });
        }
        const user = new User(req.body);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        const token = await createJWT(user.id);
        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const putUsers = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: `No user with id: ${uid}`
            });
        }
        const { password, google, email, ...fields } = req.body;
        if (userDb.email !== email) {
            const emailExists = await User.findOne({ email: email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email exists in DB'
                });
            }
        }
        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });
        res.json({
            ok: true,
            updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: `No user with id: ${uid}`
            });
        }
        await User.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'User deleted'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};


module.exports = {
    getUsers,
    createUsers,
    putUsers,
    deleteUser
}