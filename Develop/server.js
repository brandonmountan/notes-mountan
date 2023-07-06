const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(noteData);

    console.info(`${req.method} request recieved`)
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved`)
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);