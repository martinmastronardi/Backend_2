const CartDAO = require('../dao/cart.dao');
const ProductDAO = require('../dao/product.dao');
const TicketService = require('../services/ticket.service');
const UserDAO = require('../dao/user.dao');

class CartController {
  static async addProductToCart(req, res) {
    try {
      const { cid } = req.params;
      const { productId, quantity } = req.body;
      const updatedCart = await CartDAO.addProductToCart(cid, productId, quantity);

      res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
    }
  }

  static async finalizePurchase(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartDAO.getCartById(cid);

      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      const user = await UserDAO.getUserById(cart.user);
      const { unavailableProducts, processedCart } = await CartDAO.verifyStockAndProcessCart(cart);

      const totalAmount = processedCart.products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

      if (totalAmount === 0) {
        return res.status(400).json({ message: 'No se puede realizar una compra sin productos' });
      }

      const ticket = await TicketService.generateTicket(processedCart, user, totalAmount);

      res.json({ 
        message: 'Compra finalizada con éxito', 
        ticket, 
        unavailableProducts 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al finalizar la compra', error: error.message });
    }
  }
}


module.exports = CartController;
