const CartDAO = require('../dao/cart.dao');
const ProductDAO = require('../dao/product.dao');

class CartRepository {
  async getCartById(id) {
    return await CartDAO.getCartById(id);
  }

  async purchaseCart(cartId, userId) {
    const cart = await CartDAO.getCartById(cartId);
    const unavailableProducts = [];

    for (let item of cart.products) {
      const product = await ProductDAO.getProductById(item.product);
      
      if (product.stock >= item.quantity) {
        await ProductDAO.updateProductStock(item.product, item.quantity);
      } else {
        unavailableProducts.push(item.product);
      }
    }

    const filteredProducts = cart.products.filter((item) => unavailableProducts.includes(item.product));
    cart.products = filteredProducts;
    await cart.save();

    return { cart, unavailableProducts };
  }
}

module.exports = new CartRepository();
