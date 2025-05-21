const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET todos
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('created_at');
  error ? res.status(400).json(error) : res.json(data);
});

// POST todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ task }]);
  error ? res.status(400).json(error) : res.json(data[0]);
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  error ? res.status(400).json(error) : res.sendStatus(204);
});

module.exports = router;
