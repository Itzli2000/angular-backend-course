const { response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getSearh = async (req, res = response) => {
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex })
    ]);
    res.json({
        ok: true,
        uid: req.uid,
        users,
        hospitals,
        doctors
    });
};


module.exports = {
    getSearh,
}