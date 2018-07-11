var querystring = require('querystring');
var request = require('request'); // "Request" library
var analysis = require('./spotify_analysis');
var cookie = require('cookie');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://localhost:8888/spotify/callback';
var stateKey = 'spotify_auth_state';

var oauthorization = {
    generateRandomString: function(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    login: function(req, res) {
        var state = oauthorization.generateRandomString(16);
        res.cookie(stateKey, state);

        var scope = 'user-read-private user-read-email user-read-currently-playing';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    },
    getToken: function(req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter
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
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };
            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    oauthorization.setCookies(res, body);
                    res.redirect('.././currently-playing/');
                } else {
                    console.log("error");
                    console.log(error);
                    console.log(response.statusCode);
                }
            });
        }
    },
    getNewToken: function(req, res) {
        // requesting access token from refresh token
        var refresh_token = req.cookies ? req.cookies['refresh_token'] : null;
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };
        console.log(refresh_token);

        request.post(authOptions, function(error, response, body) {
            console.log(error);
            console.log(body);
            if (!error && response.statusCode === 200) {
                oauthorization.setCookies(res, body);
                console.log(body);
                res.redirect('.././currently-playing/');
            } else {
                res.redirect('/spotify/login');
            }
        });
    },
    setCookies: function(res, body){
        var set_cookies = [];
        set_cookies.push(oauthorization.serializeCookie('access_token', body.access_token, 1.5, {"path":"/"}));
        set_cookies.push(oauthorization.serializeCookie('refresh_token', body.refresh_token, 10, {"path":"/spotify"}));
        res.header("Set-Cookie", set_cookies);
    },
    serializeCookie: function(key, value, hrs, path) {
        // This is res.cookie’s code without the array management and also ignores signed cookies.
        if ('number' == typeof value) value = val.toString();
        if ('object' == typeof value) value = JSON.stringify(val);
        return cookie.serialize(key, value, path, {maxAge: (1000 * 60 * 60 * hrs), httpOnly:true});
    }
};

module.exports = oauthorization;