const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateFile } = require('../helpers/updateFile');

const uploadFile = async (req, res = response) => {
    const collection = req.params.collection;
    const id = req.params.id;
    const validCollections = ['hospitals', 'users', 'doctors'];
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: `${collection} is not a valid collection`
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }
    const sampleFile = req.files.image;
    const cutedName = sampleFile.name.split('.');
    const extension = cutedName[cutedName.length - 1];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: `${extension} is not a valid extension file`
        });
    }
    const newFileName = `${uuidv4()}.${extension}`;
    const fileUrl = `./uploads/${collection}/${newFileName}`;
    sampleFile.mv(fileUrl, function (err) {
        if (err)
            return res.status(500).json({
                ok: false,
                msg: err
            });
        updateFile(collection, id, newFileName);
        res.json({
            ok: true,
            msg: 'File uploaded!',
            file: newFileName
        });
    });
};

const retriveFile = async (req, res = response) => {
    const collection = req.params.collection;
    const image = req.params.imageName;
    const pathImage = path.join(__dirname, `./../uploads/${collection}/${image}`);
    if (!fs.existsSync(pathImage)) {
        res.status(404).json({
            ok: false,
            msg: 'No image found'
        });
    }
    res.sendFile(pathImage);
}


module.exports = {
    uploadFile,
    retriveFile,
}