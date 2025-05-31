const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Puedes usar otros proveedores, por ejemplo Outlook, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,  // tu email (de Gmail o similar)
    pass: process.env.EMAIL_PASS,  // tu contraseña o app password si usas 2FA
  },
});

const sendConfirmationEmail = (email, token) => {
  const url = `http://localhost:3000/confirm/${token}`;  // Cambia por tu URL frontend donde reciba el token

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirma tu correo para completar el registro',
    html: `<p>Gracias por registrarte.</p>
           <p>Por favor haz click en el siguiente enlace para confirmar tu cuenta:</p>
           <a href="${url}">${url}</a>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
