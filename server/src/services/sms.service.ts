const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to: string|undefined, code: number) => {
  return client.messages.create({
    body: `Votre code de vérification : ${code}`,
    from: `whatsapp:+14155238886`,
    to: `whatsapp:${to}`
  });
};
