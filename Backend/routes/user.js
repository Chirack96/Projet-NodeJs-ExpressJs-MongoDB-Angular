const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/auth/users', auth, userCtrl.getAllUsers);
router.get('/current', auth, userCtrl.getCurrentUser);
router.post('/reset/:token', userCtrl.resetPassword);
router.post('/request-reset-password', userCtrl.requestPasswordReset);

module.exports = router;