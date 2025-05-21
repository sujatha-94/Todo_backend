const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todosRoutes = require('./routes/todos');
const summarizeRoutes = require('./routes/summarize');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todosRoutes);
app.use('/summarize', summarizeRoutes);

app.listen(3001, () => console.log('Backend running on port 3001'));
