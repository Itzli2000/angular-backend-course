/*
    Route: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/tokenVerification');

const router = Router();

router.post('/',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields,
    ],
    login
);

router.post('/google',
    [
        check('token', 'Google token is required').not().isEmpty(),
        validateFields,
    ],
    loginGoogle
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
