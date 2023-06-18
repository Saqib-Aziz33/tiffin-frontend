import nodemailer from "nodemailer";

// config
const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.YAHOO_EMAIL,
    pass: process.env.YAHOO_PASSWORD,
  },
});

export default async function handler(req, res) {
  try {
    const { name, email, message } = req.body;
    const body = createBody(name, email, message);
    const mailOptions = {
      from: process.env.YAHOO_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: "Message from Tiffin",
      text: body,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function createBody(name, email, message) {
  return `
        Received Message from Tiffin🍖
        Name: ${name}
        Email: ${email}
        Message: ${message}
    `;
}
