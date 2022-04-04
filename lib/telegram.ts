const bot_id = process.env.BOT_ID;
const chat_id = process.env.CHAT_ID;

export const sendMessage = async (msg: string) => {
  const response = await fetch(
    `https://api.telegram.org/bot${bot_id}/sendMessage?chat_id=${chat_id}&text=${msg}`,
  );
  return response;
};
