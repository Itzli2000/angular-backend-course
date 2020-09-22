const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'get Doctor'
    });
};

const createDoctor = async (req, res = response) => {
    const doctor = new Doctor({
        user: req.uid,
        hospital: '5f6a312a5acc217f778e760c',
        ...req.body
    });
    try {
        const doctorDb = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const putDoctor = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'actualizar doctor'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexcpected error'
        });
    }
};

const deleteDoctor = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'borrar doctor'
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
    getDoctors,
    createDoctor,
    putDoctor,
    deleteDoctor
}