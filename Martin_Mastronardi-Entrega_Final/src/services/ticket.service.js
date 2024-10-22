const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');
const MailService = require('./mail.service');

class TicketService {
    async generateTicket(cart, userId, totalAmount) {
    const ticket = new Ticket({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: userId,
      purchase_datetime: new Date()
    });

    await ticket.save();
    await MailService.sendPurchaseConfirmation(userId.email, ticket);
    return ticket;
  }
}

module.exports = new TicketService();
