const express = require('express');

// middlewares
const validateRequest = require('../middlewares/validate-request');

// controllers
const { signUpUser, validate, loginUser } = require('../controllers/auth.controllers');

const router = express.Router();


router.post('/signup', validate('signup'), validateRequest, signUpUser);
router.post('/login', validate('login'), validateRequest, loginUser);

module.exports = router;