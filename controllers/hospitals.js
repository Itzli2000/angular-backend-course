const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find({}, 'name image user');
    res.json({
        ok: true,
        msg: 'hospital'
    });
};

const createHospital = async (req, res = response) => {
    const hospital = new Hospital({
        user: req.uid,
        ...req.body
    });
    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const putHospital = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'actualizar'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const deleteHospital = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'borrar'
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
    getHospitals,
    createHospital,
    putHospital,
    deleteHospital
}