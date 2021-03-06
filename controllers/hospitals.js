const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find().populate('user', 'name image');
    res.json({
        ok: true,
        hospitals
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
        const id = req.params.id;
        const uid = req.uid;
        const hospitalDb = await Hospital.findById(id);
        if (!hospitalDb) {
            return res.status(404).json({
                ok: false,
                msg: `There is not a hospital with id: ${id}`
            });
        }
        const hospitalChanges = {
            ...req.body,
            user: uid
        };
        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });
        res.json({
            ok: true,
            hospital: updatedHospital

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
        const id = req.params.id;
        const hospitalDb = await Hospital.findById(id);
        if (!hospitalDb) {
            return res.status(404).json({
                ok: false,
                msg: `There is not a hospital with id: ${id}`
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: `Hospital whit id: ${id} has been deleted`
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