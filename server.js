const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.json(__dirname, "./db/db.json")));





app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
  