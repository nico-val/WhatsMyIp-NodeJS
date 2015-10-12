var express = require('express');
var app = express();
var router = express.Router();
var o2x = require('object-to-xml');
/* GET home page. */


router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    if ( req.headers["user-agent"].substr(0,4) == "curl")
    {
        res.set("Connection", "close");
        res.set("Content-Type", "text/plain");
        res.send(req.ip);
    }
    else {
        var path = require('path');
        res.sendfile(path.resolve('../web-ui/index.html'));
        //res.redirect('/content');
    }
})
/*
.get('/host',function(req,res,next){
       res.send(req.get("origin"));
    })

    .get('/object',function(req,res,next){
        res.json(req.headers);
    })
 */

.get('/json',function(req,res,next){
        var response = {
            ip: req.ip,
            //"host": req.headers["host"],
            userAgent: req.headers["user-agent"],
            encoding: req.headers["accept-encoding"],
            language: req.headers["accept-language"],
            connection: req.headers["connection"],
        };
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(response);
    })

    .get('/xml',function(req,res,next){
        var response = {
            "ipAddress": req.ip,
            //"host": req.headers["host"],
            "userAgent": req.headers["user-agent"],
            encoding: req.headers["accept-encoding"],
            language: req.headers["accept-language"],
            connection: req.headers["connection"],
        };

        var o2x = require('object-to-xml');

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.set('Content-Type', 'text/xml');
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,

                root: response

        }));

        //res.send(xml(response));
    })

    .get('/yml',function(req,res,next){
        var response = {};
        response["ipAddress"] = req._remoteAddress ? req._remoteAddress : "";
        //response["host"] = req.headers["host"] ? req.headers["host"] : "";
        response["userAgent"] = req.headers["user-agent"] ? req.headers["user-agent"] : "";
        response["encoding"] = req.headers["accept-encoding"] ? req.headers["accept-encoding"] : "";
        response["language"] = req.headers["accept-language"] ? req.headers["accept-language"] : "";
        response["connection"] = req.headers["connection"] ? req.headers["connection"] : "";


        var yaml = require('js-yaml');

        //res.set('Content-Type', 'text/xml');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "text/x-yaml");
        var test = yaml.safeDump({"ifconfig.host":response}).toString();

        res.send(test);

        //res.send(xml(response));
    })



;
module.exports = router;
