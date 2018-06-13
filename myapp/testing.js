var express = require('Express');
var app = express();

app.get('/hello', function(req, res){
    res.send("Hello World!");
});
app.get('/things/:name/:id', function(req, res) {
    res.send('id:sadasd ' + req.params.id + ' and name: ' + req.params.name);
});
app.listen(3000);