var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

try{
    var server = app.listen(3014, function () {
        console.log("Listening on port %$3014", server.address().port);
    })
}   catch (error) {
    console.error(error);
}