const User = require('../models/User');

class UserDAO {
  async getUserById(id) {
    return await User.findById(id);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }
}

module.exports = new UserDAO();
