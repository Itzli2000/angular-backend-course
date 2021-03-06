/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { getUsers, createUsers, putUsers, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/tokenVerification');

const router = Router();

router.get('/', validateJWT, getUsers);
router.post('/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        validateFields,
    ],
    createUsers
);
router.put('/:id',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields,
    ],
    putUsers
);
router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
