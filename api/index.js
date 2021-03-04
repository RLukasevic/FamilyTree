const express = require('express');

const data = require('./data.json');


const app = express();

const PORT = 5555;

app.get('/api/init', (req, res) => {
    res.send(data)
});

app.listen(PORT);
console.log('server running', PORT)