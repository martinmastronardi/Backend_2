const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretKey', 
      { expiresIn: '1h' } 
    );

    res.cookie('jwt', token, { httpOnly: true, secure: false });
    return res.json({ message: 'Login exitoso', user });
  } catch (err) {
    return res.status(500).json({ message: 'Error interno del servidor', error: err });
  }
};

const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    
    try {
      const user = new User({ first_name, last_name, email, age, password });
      await user.save();
      res.json({ message: 'Usuario registrado con éxito', user });
    } catch (err) {
      res.status(400).json({ message: 'Error al registrar el usuario', error: err });
    }
  };
module.exports = { login, register };
