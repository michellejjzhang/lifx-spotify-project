var querystring = require('querystring');
var request = require('request'); // "Request" library
var analysis = require('../services/spotify_analysis');
var control = require('./lifx_color_control');

//TODO remove client id and secret before pushing to github
var client_id = 'cc84ab873d2412bfb8a2006151adac674e199c9276a2d650bea0e70e7ff30d04'; // Your client id
var redirect_uri = 'http://localhost:8888/lifx/callback'; // Your redirect uri
var stateKey = 'lifx_auth_state';

var oauthorization = {
    generateRandomString: function(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    step1: function(req, res) {
        console.log("checkpoint 1");
        var state = oauthorization.generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        //CALL 1
        var scope = 'remote_control:all';
        res.redirect('https://cloud.lifx.com/oauth/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
        console.log("checkpoint 2");
    },
    step3: function(req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter
        console.log("checkpoint 3");
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(stateKey);
            var authOptions = {
                url: 'https://cloud.lifx.com/oauth/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id).toString('base64'))
                },
                json: true
            };
            console.log("checkpoint 4");
            request.post(authOptions, control.changeColor);
        }
    }

};

module.exports = oauthorization;