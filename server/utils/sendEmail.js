const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // 587 માટે false
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.verify();
  console.log("SMTP Connected Successfully");

  const info = await transport.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });

  console.log("Mail Sent:", info.messageId);
};

module.exports = sendEmail;