const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const summarizeWithOpenAI = require('../services/openaiService');
const sendToSlack = require('../services/slackService');

router.post('/', async (req, res) => {
  const { data: todos } = await supabase.from('todos').select('*').eq('completed', false);
  try {
    const summary = await summarizeWithOpenAI(todos);
    await sendToSlack(summary);
    res.json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
