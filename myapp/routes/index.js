var express = require('express');
var router = express.Router();

var request = require('request'); // "Request" library
var spotify_router = require('./spotify');
var analysis = require('../services/spotify_analysis');

/* GET home page. */
router.get('/', function(req, res) {
    var loggedIn = false;
    var access_token = req.cookies ? req.cookies['access_token'] : null;
    console.log(req.cookies);
    if (access_token){
        var authOptions = {
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(authOptions, function(error, response) {
            console.log(response.statusCode);
            if (!error && response.statusCode === 200) {
                console.log("reaching here");
                loggedIn = true;
            }
            if (!loggedIn){
                res.redirect('/spotify/');
            } else {
                res.redirect('/currently-playing/')
            }
        });
    } else {
        res.redirect('/spotify/');
    }
});

router.use('/spotify', spotify_router);

router.get('/currently-playing', function(req, res){
    var access_token = req.cookies ? req.cookies['access_token'] : null;
    analysis.findTrackName(access_token);
    var data = analysis.returnDisplayData();
    res.render('currently_playing', {data : data});
});

module.exports = router;
