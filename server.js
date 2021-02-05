const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;

const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "./db/db.json")));

app.get("/api/notes/:id", (req, res) => res.json(savedNotes[Number(req.params.id)]));

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})

app.delete("/api/notes/:id", (req, res) => {
  let noteID = req.params.id;
  let newID = 0;
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
  notes = notes.filter(currentNote => {
    return currentNote.id != noteID;
  })

  for (currentNote of notes) {
    currentNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
})

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
