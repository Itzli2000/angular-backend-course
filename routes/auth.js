/*
    Route: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields,
    ],
    login
);

module.exports = router;
