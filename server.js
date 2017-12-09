const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
const token = process.env.TOKEN || 'DEMO_KEY';

app.use(express.static(__dirname));


app.get('/', (req, res) => {
	res.sendFile('index.html');
});

// If HTTP request is made to '/token' route without custom header name
// Redirect to homepage. This prevents users from directly visiting the route
app.use('/token', (req, res, next) => {
	if (!req.headers['x-custom-header-name']) {
		res.redirect('/');
	}
	next();
});

app.get('/token', (req, res) => {
	res.json({'token': token});
});

// If user tries to visit non-existent routes, redirect to hompage.
app.use((req, res, next) => {
	res.status(404).redirect('/');
});

app.listen(port, () => console.log(`App is running on port: ${port}`));