const bot_id = process.env.TELEGRAM_BOT_ID;
const chat_id = process.env.TELEGRAM_CHAT_ID;

export const sendMessage = async (msg: string) => {
  if (!bot_id || !chat_id) {
    return null;
  }
  const response = await fetch(
    `https://api.telegram.org/bot${bot_id}/sendMessage?chat_id=${chat_id}&text=${msg}`,
  );
  return response;
};
