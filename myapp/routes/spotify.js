var express = require('express');
var spotify_router = express.Router();

var oauthorization = require('../services/spotify_oauth');
var analysis = require('../services/spotify_analysis');

spotify_router.get('/', function(req, res){
    var refresh_token = req.cookies ? req.cookies['refresh_token'] : null;

    if(refresh_token && refresh_token != 'undefined'){
        res.redirect('/spotify/refresh');
    } else {
        res.render('.././views/login')
    }
});

spotify_router.get('/login', oauthorization.login);

spotify_router.get('/callback', oauthorization.getToken);

spotify_router.get('/refresh', oauthorization.getNewToken);

spotify_router.get('/update', function(req, res){
   res.send(analysis.returnDisplayData());
});

module.exports = spotify_router;
