const nodemailer = require("nodemailer");
const config = require("../config");

exports.sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP.host,
    port: config.SMTP.port,
    auth: {
      user: config.SMTP.user,
      pass: config.SMTP.pass,
    },
  });

  await transporter.sendMail({
    from: "no-reply@example.com",
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });
};
