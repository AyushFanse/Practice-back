const express = require('express');
const router = express.Router();
const Register = require('../modules/AuthModule');

//~------------------------> Resister Router <------------------------~//

router.post('/register', Register.Register);

//~------------------------> Login Router <------------------------~//

router.post('/login', Register.Login);

//~------------------------> Forgot Password <------------------------~//

// router.post('/forgot', Register.ForgotPassword);


module.exports = router;