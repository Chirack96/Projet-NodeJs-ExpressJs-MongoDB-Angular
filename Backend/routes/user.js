const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/auth/users', auth, userCtrl.getAllUsers);
router.get('/auth/current', auth, userCtrl.getCurrentUser);

module.exports = router;