var express = require('express');
var lifx_router = express.Router();

var oauthorization = require('./lifx_oauth');
var lifx = require('../services/lifx');

lifx_router.get('/', function(req, res, next){
    console.log("hello");
    //res.render('lifx_display');
    next();
});

lifx_router.get('/login', oauthorization.step1);

lifx_router.get('/callback', oauthorization.step3);

module.exports = lifx_router;
