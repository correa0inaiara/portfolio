var express = require('express')
var app = express()

// var port = 8000

app.use(express.static('www'));

var server = app.listen(process.env.PORT || 8000, function () {
	var host = server.address().address
	var port = server.address().port
})