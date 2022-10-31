const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) email options
  const mailOptions = {
    from: 'nomadic.pesto@gmail.com',
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  // 3) send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
