var express = require('Express');
var app = express();

app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
});

app.get('/', function(req, res){
    res.send("/");
});

app.get('/hello', function(req, res){
    res.send("hello");
});

var things = require('./things.js');

//both testing.js and things.js should be in same directory
app.use('/things', things);

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
