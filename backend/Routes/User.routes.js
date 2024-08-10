const express = require('express');
const router = express.Router();
const { register ,login, getAllUsers } = require('../Controllers/User.Controller');
const { check  } = require('express-validator');


router.post(
    '/register',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
      check('username', 'Username is required').not().isEmpty(),
      check('fullname', 'Full Name is required').not().isEmpty(),
    ],
    register
  );

router.post('/login', login);


router.get('/getUsers' , getAllUsers)



module.exports = router;
