const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ticketSchema = new mongoose.Schema({
  code: { type: String, default: uuidv4, unique: true },
  amount: { type: Number, required: true },
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchase_datetime: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
