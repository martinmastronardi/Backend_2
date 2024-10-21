const Ticket = require('../models/Ticket');
const UserDAO = require('../dao/user.dao');
const MailService = require('./mail.service');

class TicketService {
  async generateTicket(cart, userId) {
    const user = await UserDAO.getUserById(userId);
    const amount = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

    const ticket = new Ticket({
      amount,
      purchaser: user.email
    });

    await ticket.save();

    await MailService.sendPurchaseConfirmation(user.email, ticket);

    return ticket;
  }
}

module.exports = new TicketService();
