/*
    Route: /api/uploads
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/tokenVerification');
const { uploadFile, retriveFile } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = Router();
router.use(expressFileUpload());

router.get('/:collection/:imageName', validateJWT, retriveFile);
router.put('/:collection/:id', validateJWT, uploadFile);

module.exports = router;
