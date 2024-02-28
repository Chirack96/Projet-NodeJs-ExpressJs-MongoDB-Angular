const express = require("express");
const router = express.Router();

const userProductCtrl = require('../controllers/userProduct');
const auth = require("../middleware/auth");

router.get('/products', userProductCtrl.getAllUserProduct);
router.get('/product', userProductCtrl.getProductUser);
router.post('/',userProductCtrl.createUSerProduct);
router.delete('/delete', userProductCtrl.deleteProductUser);
router.put('/update', userProductCtrl.updateProductUser);

module.exports = router;