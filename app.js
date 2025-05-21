const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form data (like Slack sends)

const todos = [
  { id: '1', task: 'Learn React', completed: false },
  { id: '2', task: 'Build a backend', completed: true },
];

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add this POST route
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.post('/summarize', (req, res) => {
  // For now, just respond with a simple message or echo back the request body
  console.log('Request body:', req.body);
  res.json({ message: 'Summarize endpoint received your data', data: req.body });
});

app.post('/slack/add', (req, res) => {
  const { text, user_id } = req.body;
  if (!text) {
    return res.status(400).send('Missing task text');
  }

  const newTodo = {
    id: Date.now().toString(),
    task: text,
    completed: false,
  };
  todos.push(newTodo);
  res.send(`Task added: "${text}"`);
});


app.post('/slack/summary', (req, res) => {
  const incompleteTasks = todos.filter(todo => !todo.completed);
  const summary = `You have ${incompleteTasks.length} incomplete tasks.`;
  res.json({ message: 'Here is your summary', summary });
});


// Delete task by id via Slack slash command
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: `Todo with id ${id} deleted` });
  } else {
    res.status(404).json({ error: `Todo with id ${id} not found` });
  }
});

// Example Express backend route
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body.task;

  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].task = updatedTask;

    // if using file storage, save to disk here
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
