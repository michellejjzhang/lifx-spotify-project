var express = require('express');
var spotify_router = express.Router();

var oauthorization = require('../services/spotify_oauth');
var analysis = require('../services/spotify_analysis');


spotify_router.get('/', function(req, res){
    res.render('login');
});

spotify_router.get('/login', oauthorization.login);

spotify_router.get('/callback', oauthorization.getToken);

spotify_router.get('/refresh_token', oauthorization.getNewToken);

spotify_router.get('/update', function(req, res){
   res.send(analysis.returnDisplayData());
});

module.exports = spotify_router;
