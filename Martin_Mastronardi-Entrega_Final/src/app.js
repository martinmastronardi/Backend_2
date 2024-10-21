require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sessionRoutes = require('./routes/sessionRoutes');
const authController = require('./controllers/authController');
const productRoutes = require('./routes/product.routes');
require('./config/passport')(passport);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.post('/api/sessions/login', authController.login);
app.use('/api/sessions', sessionRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
