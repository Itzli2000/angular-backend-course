const fs = require('fs');
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateFile = async (collection, id, fileName) => {
    switch (collection) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('Doctor dont found');
                return false;
            }
            const doctorOldPath = `./uploads/${collection}/${doctor.image}`;
            deleteImage(doctorOldPath);
            doctor.image = fileName;
            await doctor.save();
            return true;
            break;

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('User dont found');
                return false;
            }
            const userOldPath = `./uploads/${collection}/${user.image}`;
            deleteImage(userOldPath);
            user.image = fileName;
            await user.save();
            return true;
            break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital dont found');
                return false;
            }
            const hospitalOldPath = `./uploads/${collection}/${hospital.image}`;
            deleteImage(hospitalOldPath);
            hospital.image = fileName;
            await hospital.save();
            return true;
            break;

        default:
            break;
    }
}

module.exports = {
    updateFile
}