const express = require("express");
const router = express.Router();

const userProductCtrl = require('../controllers/userProduct');
const auth = require("../middleware/auth");

router.get('/products', userProductCtrl.getAllUserProduct);
router.get('/product', userProductCtrl.getProductUser);
router.post('/',userProductCtrl.createUSerProduct);

module.exports = router;