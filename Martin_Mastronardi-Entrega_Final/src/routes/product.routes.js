const express = require('express');
const passport = require('passport');
const authorize = require('../middlewares/authorization');
const ProductController = require('../controllers/product.controller');
const router = express.Router();

router.post('/', 
  passport.authenticate('jwt-cookie', { session: false }),
  authorize('admin'), 
  ProductController.createProduct
);

router.put('/:pid', 
  passport.authenticate('jwt-cookie', { session: false }), 
  authorize('admin'),
  ProductController.updateProduct
);

router.delete('/:pid', 
  passport.authenticate('jwt-cookie', { session: false }), 
  authorize('admin'),
  ProductController.deleteProduct
);

module.exports = router;
