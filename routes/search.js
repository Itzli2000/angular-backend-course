/*
    Route: /api/search
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/tokenVerification');
const { getSearh } = require('../controllers/search');

const router = Router();

router.get('/:search', validateJWT, getSearh);

module.exports = router;
