const express = require('express');
const router = express.Router();
const { register, confirmEmail, login, randomProfiles } = require('../controllers/authController');

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.get('/random-profiles', randomProfiles);

module.exports = router;
