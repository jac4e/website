import nodemailer from 'nodemailer';
import fs from 'fs';

const secret = JSON.parse(fs.readFileSync('secret.json'));

async function send({
  name,
  email,
  subject,
  message
}) {
  const transporter = nodemailer.createTransport({
    host: secret.email.server,
    port: secret.email.port,
    secure: true,
    auth: {
      user: secret.email.user,
      pass: secret.email.pass,
    },
  });
  let info = await transporter.sendMail({
    from: `"[Contact Form] ${name}" <${secret.email.user}>`,
    replyTo: email,
    to: secret.email.receiver,
    subject: subject,
    text: message,
  });
  if(info.response == '250 Message received'){
    return 200;
  } else {
    return 500;
  }
}

export default {
  send
}
