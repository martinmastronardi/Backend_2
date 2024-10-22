const express = require('express');
const passport = require('passport');
const CartController = require('../controllers/cart.controller');
const router = express.Router();

router.post('/:cid/products', 
  passport.authenticate('jwt-cookie', { session: false }),
  CartController.addProductToCart
);

router.post('/:cid/purchase', 
  passport.authenticate('jwt-cookie', { session: false }),
  CartController.finalizePurchase
);

module.exports = router;
