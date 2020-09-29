const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find().populate('user', 'name').populate('hospital', 'name');
    res.json({
        ok: true,
        doctors
    });
};

const createDoctor = async (req, res = response) => {
    const doctor = new Doctor({
        user: req.uid,
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
        const id = req.params.id;
        const uid = req.uid;
        const doctorDb = await Doctor.findById(id);
        if (!doctorDb) {
            return res.status(404).json({
                ok: false,
                msg: `There is not a doctor with id: ${id}`
            });
        }
        const doctorChanges = {
            ...req.body,
            user: uid
        };
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true });
        res.json({
            ok: true,
            doctor: updatedDoctor
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
        const id = req.params.id;
        const doctorDb = await Doctor.findById(id);
        if (!doctorDb) {
            return res.status(404).json({
                ok: false,
                msg: `There is not a doctor with id: ${id}`
            });
        }
        await Doctor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: `Doctor whit id: ${id} has been deleted`
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