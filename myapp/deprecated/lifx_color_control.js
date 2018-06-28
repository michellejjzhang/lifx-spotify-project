var control = {
    changeColor: function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var access_token = body.access_token;
            var options = {
                url: 'https://api.lifx.com/v1/lights/all/state',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true,
                form: {
                    power: 'on',
                    color: 'rgb:150,217,155 saturation:0.85355',
                    duration: '0.1',
                }
            };

            // use the access token to access the Spotify Web API
            request.put(options, function(error, response, body) {
                console.log(body);
            });
        } else {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        }
    }
};
module.exports = control;