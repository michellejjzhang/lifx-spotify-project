var express = require('express');
var router = express.Router();

var analysis = require('../services/spotify_analysis');

router.get('/', function(req, res){
    var access_token = req.cookies ? req.cookies['access_token'] : null;
    analysis.findTrackName(access_token);
    var data = analysis.returnDisplayData();
    res.render('currently_playing', {data : data});
});

module.exports = router;