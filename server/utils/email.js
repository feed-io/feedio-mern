const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = sendEmail;
