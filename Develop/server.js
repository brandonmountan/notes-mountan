const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {

        const { title, text } = req.body

        const newNote = {
            title: title,
            text: text,
            id: uuid.v4()
        };
    
        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {

                noteData.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 4),
                (writeErr) =>
                writeErr ? console.error(writeErr) : console.info('Successfully updated notes')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);