const express = require('express');
const router = express.Router();
const Register = require('../modules/AuthModule');

//~------------------------> Resister Router <------------------------~//

router.post('/register', Register.register);

//~------------------------> Login Router <------------------------~//

router.post('/login', Register.login);

//~------------------------> Forgot Password <------------------------~//

router.post('/forgotpassword', Register.forgotpassword);


module.exports = router;