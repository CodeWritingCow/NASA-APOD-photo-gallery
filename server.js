var express = require('express'),
	app = express();

var port = process.env.PORT || 8080;

var gulp = require('gulp');
require('./gulpfile');

gulp.start('config');


app.use(express.static(__dirname));

/*app.get('/', function(req, res) {
	res.render('index');
});*/

app.listen(port, function(){
	console.log('App is running on http://localhost:' + port);
});