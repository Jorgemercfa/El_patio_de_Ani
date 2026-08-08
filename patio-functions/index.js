const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // puerto 465 siempre usa SSL desde el inicio
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Se dispara automáticamente cada vez que se crea un documento
// nuevo en la colección 'mail' de Firestore.
exports.sendMailOnCreate = onDocumentCreated('mail/{mailId}', async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data();

  const mailOptions = {
    from: `"El Patio de Ani" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: data.message.subject,
    html: data.message.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado a:', data.to);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
});