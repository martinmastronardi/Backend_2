const express = require('express');
const passport = require('passport');
const UserDTO = require('../dtos/user.dto');
const router = express.Router();
const {register} = require('../controllers/authController');

router.post('/register', register);


router.get('/current', passport.authenticate('jwt-cookie', { session: false }), (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
});

module.exports = router;
