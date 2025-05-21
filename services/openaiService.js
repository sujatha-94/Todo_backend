const axios = require('axios');

module.exports = async function summarizeWithOpenAI(todos) {
  const prompt = `Summarize these pending todos:\n${todos.map((t, i) => `${i + 1}. ${t.task}`).join('\n')}`;
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });
  return res.data.choices[0].message.content.trim();
};