import express from 'express';
import bodyParser from 'body-parser';

import todoRoutes from './routes/todos.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const app = express();
app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.listen(3009, () => {
  console.log('Server is running on port 3009');
});