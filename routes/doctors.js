/*
    Route: /api/doctors
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/tokenVerification');
const { getDoctors, createDoctor, putDoctor, deleteDoctor } = require('../controllers/doctors');

const router = Router();

router.get('/', getDoctors);
router.post('/',
    [
        validateJWT,
        check('name', 'Doctor name is required').not().isEmpty(),
        check('hospital', 'The hospital ID must be valid').isMongoId(),
        validateFields
    ],
    createDoctor
);
router.put('/:id',
    [],
    putDoctor
);
router.delete('/:id', deleteDoctor);

module.exports = router;
