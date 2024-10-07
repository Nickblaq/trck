const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendTelegramMessage(userDetails: UserDetails) {
  const { name, email, phone, message } = userDetails;
  
  const text = `
New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
      }),
    });

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