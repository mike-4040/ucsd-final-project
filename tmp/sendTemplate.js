const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'mike4040@me.com',
  from: 'bringucsd@gmail.com',
  templateId: 'd-259500ad24ca45d0891e0d0cc93111af',
  dynamic_template_data: {
    subject: 'Testing Templates',
    name: 'Mike',
    city: 'San Diego',
  },
};
sgMail.send(msg);