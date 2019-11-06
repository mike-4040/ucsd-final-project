// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'mike4040@me.com',
  from: 'bringucsd@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>Привет Костя, это письмо из нашего приложения</strong>',
};
sgMail
  .send(msg)
  .then(() => console.log('Sent'))
  .catch(({ response }) => console.log('Error: ', response.body.errors[0].message));