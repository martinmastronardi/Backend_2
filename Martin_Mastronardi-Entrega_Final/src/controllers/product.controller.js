const Product = require('../models/Product');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, price, stock } = req.body;
      const newProduct = new Product({ name, price, stock });
      await newProduct.save();
      res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const updates = req.body;
      const product = await Product.findByIdAndUpdate(pid, updates, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  }
  static async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const product = await Product.findByIdAndDelete(pid);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
}

module.exports = ProductController;
