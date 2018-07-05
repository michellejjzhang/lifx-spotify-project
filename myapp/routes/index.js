var express = require('express');
var router = express.Router();

var request = require('request'); // "Request" library

router.get('/', function(req, res, next) {
    var loggedIn = false;
    var access_token = req.cookies ? req.cookies['access_token'] : null;
    var refresh_token = req.cookies ? req.cookies['refresh_token'] : null;

    if (access_token && refresh_token != 'undefined'){
        var authOptions = {
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(authOptions, function(error, response, body) {
            if (!body['error'] && response.statusCode === 200) {
                loggedIn = true;
            }
            if (!loggedIn){
                res.redirect('/spotify/refresh');
            } else {
                res.redirect('/currently-playing/');
            }
        });
    } else {
        res.redirect('/spotify/');
    }
});

module.exports = router;
