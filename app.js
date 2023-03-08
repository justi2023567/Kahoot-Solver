const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }));

PORT = 1000

app.get('/', (req, res) => {
	res.render('kahoot');
})

app.post('/kahoot', urlencodedParser, async (req, res) => {
	if (req.body.kahoot) {
		const response = await fetch('https://play.kahoot.it/rest/kahoots/' + req.body.kahoot);
		const data = await response.json();
		const questions = data.questions[1];
		console.log(questions);
		res.send(questions.choices);
	}
})

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