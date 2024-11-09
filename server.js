const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
];

app.get('/random-emoji', (req, res) => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const incorrectOptions = emojis.filter(e => e.name !== randomEmoji.name);
    const distractors = incorrectOptions.slice(0, 3); 

    const options = [...distractors, randomEmoji].sort(() => Math.random() - 0.5);

    res.json({ emoji: randomEmoji.emoji, options: options.map(e => e.name) });
});

app.post('/check-guess', (req, res) => {
    const { guess, emoji } = req.body;
    const correctEmoji = emojis.find(e => e.emoji === emoji);
    const isCorrect = correctEmoji.name === guess;

    res.json({ correct: isCorrect, message: isCorrect ? 'Correct!' : 'Wrong!' });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


