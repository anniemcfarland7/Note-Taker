const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes

// Basic route that sends the user first to the AJAX Page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Displays a single character, or returns false
app.get('/api/notes/:id', (req, res) => {
  const chosen = req.params.id;

  console.log(chosen)

})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
  