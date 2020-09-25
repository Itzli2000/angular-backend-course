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

const getSearhCollection = async (req, res = response) => {
    const search = req.params.search;
    const collection = req.params.collection;
    const regex = new RegExp(search, 'i');
    let results;
    let total;
    switch (collection) {
        case 'doctors':
            results = await Doctor.find({ name: regex })
                .populate('user', 'name image')
                .populate('hospital', 'name image');
            total = await Doctor.countDocuments();
            break;

        case 'hospitals':
            results = await Hospital.find({ name: regex })
                .populate('user', 'name image');
            total = await Hospital.countDocuments();
            break;

        case 'users':
            results = await User.find({ name: regex });
            total = await User.countDocuments();
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'no collection found'
            });
            break;
    }
    res.json({
        ok: true,
        total,
        results
    });
};


module.exports = {
    getSearh,
    getSearhCollection,
}