const nodemailer = require('nodemailer');
require('dotenv').config();
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS  
      }
    });
  }

  async sendPurchaseConfirmation(toEmail, ticket) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: toEmail,
      subject: 'Confirmación de compra',
      text: `Gracias por tu compra! \n\nDetalles del ticket: \nCode: ${ticket.code}\nTotal: $${ticket.amount}\nFecha: ${ticket.purchase_datetime}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar correo: ', error);
    }
  }
}

module.exports = new MailService();
