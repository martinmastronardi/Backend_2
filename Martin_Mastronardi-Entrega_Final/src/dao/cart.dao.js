const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartDAO {
  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const product = await Product.findById(productId);

    if (!cart || !product) {
      throw new Error('Carrito o producto no encontrado');
    }

    const productInCart = cart.products.find(item => item.product.toString() === productId);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
  }
  async verifyStockAndProcessCart(cart) {
    const unavailableProducts = [];
    const processedCart = {
      products: []
    };

    for (const item of cart.products) {
      const product = await Product.findById(item.product);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
        processedCart.products.push(item);
      } else {
        unavailableProducts.push(item.product);
      }
    }

    return { unavailableProducts, processedCart };
  }

  async getCartById(cartId) {
    return await Cart.findById(cartId).populate('products.product');
  }
}

module.exports = new CartDAO();
