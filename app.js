const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { redirect } = require('statuses');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }));

PORT = 1000

app.get('/', (req, res) => {
	res.render('kahoot');
})

app.post('/kahoot', urlencodedParser, async (req, res) => {
    try {
        if (req.body.kahoot) {
            const response = await fetch('https://play.kahoot.it/rest/kahoots/' + req.body.kahoot);
            const data = await response.json();
            const choices = data.questions.map(q => q.choices).reduce((acc, c) => acc.concat(c), []);
            const answers = [];
            for (const choice of choices) {
                if (choice && choice.correct) {
                    answers.push(choice.answer);
                }
            }
            res.render('answers', { answers });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

app.set('view engine', 'ejs');
app.use(express.static('./static'))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Running on port ${PORT}`);
	}
});