const express = require('express');
const router = express.Router();
const { register, confirmEmail, login, randomProfiles, searchProviders  } = require('../controllers/authController');

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.get('/random-profiles', randomProfiles);
router.get('/search', searchProviders);

module.exports = router;
