#!/usr/bin/env node

import express from 'express';
const app = express();
const port = 4000;

console.log(`worker pid=${process.pid}`);

app.get('/', (req, res) => {
  res.send('Recipe hello');
});

app.get('/recipes/:id', (req, res) => {
  console.log(`worker request pid=${process.pid}`);
  const id = Number(req.params.id);
  if (id !== 42) {
    res.status(400).json({ error: 'not_found' });
  }
  res.json({
    producer_pid: process.pid,
    recipe: {
        id, name: "Chicken Tikka Masala",
        steps: "Throw it in a pot...",
        ingredients: [
            { id: 1, name: "Chicken", quantity: "1 lb", },
            { id: 2, name: "Sauce", quantity: "2 cups", }
        ]
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
