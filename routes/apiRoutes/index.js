const router = require('express').Router();
const { notes } = require('./../../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function findId(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function removeNote(notesArray, id) {
    const newList = notesArray.filter(function (obj) {
        return obj.id !== id
    });
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: newList }, null, 2)
    );

    return newList
}

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();

    const note = createNewNote(req.body, notes);
    res.json(note)
})

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id
    const note = removeNote(notes, noteId)
    res.json(note);

})

module.exports = router;