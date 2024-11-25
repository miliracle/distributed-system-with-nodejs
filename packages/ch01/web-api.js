#!/usr/bin/env node

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

app.get('/', async (req, res) => {
  try {
    const response = await fetch(`http://${TARGET}/recipes/42`);
    const producer_data = await response.json();
    res.json({
      consumer_pid: process.pid,
      producer_data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Consumer running at http://${HOST}:${PORT}/`);
});
