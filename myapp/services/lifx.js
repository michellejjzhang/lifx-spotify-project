var lifx = require('lifx-http-api'),
    client;

client = new lifx({
    bearerToken: ''
});

var control = {
    setColor: function(color){
        client.setState('all', {
            power: 'on',
            color: color,
            duration: 1.5
        }, function(err) {
            if(err) {
                console.error(err);
                return;
            }
        });
    }
};

module.exports = control;
