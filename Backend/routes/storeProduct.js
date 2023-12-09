const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const storeProductCtrl = require('../controllers/storeProduct');

router.get('/', storeProductCtrl.getAllProducts);//auth
router.post('/', auth, multer, storeProductCtrl.createProduct);
router.get('/:id', storeProductCtrl.getOneProduct);
router.put('/:id', auth, multer, storeProductCtrl.modifyProduct);
router.delete('/:id', auth, storeProductCtrl.deleteProduct);

module.exports = router;