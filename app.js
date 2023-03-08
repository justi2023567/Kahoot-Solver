const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs')

PORT = 1000

app.get('/', (req, res) => {
	res.render('kahoot');
})

app.post('/', (req, res) => {

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