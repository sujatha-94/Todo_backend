const axios = require('axios');

module.exports = async function sendToSlack(summary) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `📝 *Pending Todo Summary:*\n${summary}`
  });
};
