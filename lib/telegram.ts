const TELEGRAM_BOT_TOKEN = '8121797104:AAHrasWqjwrLdPrKjx6SGwhGkKTjgH89waw'
// process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = '6969954401'
// process.env.TELEGRAM_CHAT_ID;

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendTelegramMessage(userDetails: UserDetails) {
  const { name, email, phone, message } = userDetails;
  console.log('this is the user details', userDetails)
  
  const text = `
New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
  `.trim();
  console.log('this is the trimmed text', text)

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id:  TELEGRAM_CHAT_ID,
        text: text,
      }),
    });
    console.log('this is the response', response)
    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

export async function getChatId () {
  // const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`)
  // console.log('this is the getUpdates response', response)
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('this is the getUpdates response', response)
  } catch (error) {
    console.error('Error getting getUpdates:', error);
  }
}
