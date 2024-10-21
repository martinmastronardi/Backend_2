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
  const { first_name, last_name, email, age, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password,
      role: role || 'user'
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (err) {
    return res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
  }
};
module.exports = { login, register };
