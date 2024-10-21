const express = require('express');
const passport = require('passport');
const CartRepository = require('../repositories/cart.repository');
const TicketService = require('../services/ticket.service');
const router = express.Router();

router.post('/:cid/purchase', passport.authenticate('jwt-cookie', { session: false }), async (req, res) => {
  const { cid } = req.params;
  const userId = req.user._id;

  try {
    const { cart, unavailableProducts } = await CartRepository.purchaseCart(cid, userId);
    
    if (cart.products.length === 0) {
      return res.status(400).json({ message: 'No hay productos disponibles para la compra.' });
    }
    const ticket = await TicketService.generateTicket(cart, userId);
    
    return res.status(200).json({
      message: 'Compra finalizada con éxito',
      ticket,
      unavailableProducts
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al finalizar la compra', error: error.message });
  }
});

module.exports = router;
