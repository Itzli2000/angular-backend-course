/*
    Route: /api/hospitals
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/tokenVerification');
const { getHospitals, createHospital, putHospital, deleteHospital } = require('../controllers/hospitals');

const router = Router();

router.get('/', validateJWT, getHospitals);
router.post('/',
    [
        validateJWT,
        check('name', 'Hospital name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);
router.put('/:id',
    [
        validateJWT,
        check('name', 'Hospital name is required').not().isEmpty(),
        validateFields
    ],
    putHospital
);
router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;
