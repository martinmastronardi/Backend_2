const Product = require('../models/Product');

class ProductDAO {
  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProductStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    
    product.stock -= quantity;
    await product.save();
    return product;
  }

}

module.exports = new ProductDAO();
