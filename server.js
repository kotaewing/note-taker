const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes')
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;

const app = express();

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.post('/api/notes', (req, res) => {  
    req.body.id = uniqid();

    const note = createNewNote(req.body, notes);
    res.json(note)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`);
});
