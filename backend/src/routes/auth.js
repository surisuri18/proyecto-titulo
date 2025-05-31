const express = require('express');
const router = express.Router();
const { register, confirmEmail, login } = require('../controllers/authController');

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);

module.exports = router;
