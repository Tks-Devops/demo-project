const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const emailsFilePath = 'emails.txt';

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/save-email', (req, res) => {
    const { email } = req.body;
    fs.appendFile(emailsFilePath, `${email}\n`, (err) => {
        if (err) throw err;
        console.log('Email saved:', email);
        res.redirect('/');
    });
});

app.get('/get-emails', (req, res) => {
    fs.readFile(emailsFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const emails = data.split('\n').filter(Boolean);
        res.json({ emails });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
