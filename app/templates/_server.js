var express = require('express');
var app = express();
var path = require('path');

app.use('/static', express.static('public'));
app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});
