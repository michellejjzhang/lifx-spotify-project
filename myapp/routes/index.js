var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Michelle' });
  res.send("hello");
});

const secureMiddlewares = {
    msgAdder: function (req, res, next) {
        req.mzhang = req.mzhang || {};
        req.mzhang.msg = req.mzhang.msg || '';
        req.mzhang.msg += 'secure';
        next();
    }
};

router.use('/secure', secureMiddlewares.msgAdder);

router.get('/secure/info',
    function(req, res){
        req.mzhang.msg += ' info';
        res.send(req.mzhang.msg);
    }
);
router.get('/secure/about',
    function(req, res){
        req.mzhang.msg += ' about';
        res.send(req.mzhang.msg);
    }
);

module.exports = router;
