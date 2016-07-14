/**
 * Created by jamiecho on 6/13/16.
 */

var express = require('express');
var formidable = require('formidable');
var bodyparser = require('body-parser');
var path = require('path');
var async = require('async');

var app = express();
var db = require('./db'); //deals with database connection

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'tmp'))); //static resources like images.

app.set('view engine', 'jade');

app.get('/upload', function (req, res) {
    res.render('upload');
});

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/tmp';
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        if (!err) {
            console.log('Fields: ', fields);
            console.log('Files Uploaded: ' + files.photo);

            db.write(fields.personInfo, fields.tagInfo, files.photo, function () {
                res.render('upload');
            });
        } else {
            //set header, error handling, etc.
            res.end('ERROR');
        }
    });
});

app.get('/', function(req,res){
    res.render('login');
});

app.get('/view',function(req,res){
   res.render('login');
   //
});

app.post('/view', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields,files){
        if(fields.id == 'TunaDr3ams'){
        //really really unsafe to embed id in js and put on github,
        // but better than nothing
            db.find(null, function (error, entries) {
                //console.log(tags);
                async.each(entries,
                    // for each tag
                    function (entry, callback) {
                        db.read(entry._id, function (res) {
                            callback();
                        })
                    },

                    //on result
                    function (err) {
                        console.log("HERE");
                        var entries_reform = entries.map(function(entry){

                            var entry_reform = {
                                photo : entry.photo,
                                personInfo : JSON.parse(entry.personInfo),
                                tagInfo : JSON.parse(entry.tagInfo)
                            };

                            return entry_reform;
                        });
                        res.render('view', {entries: entries_reform});
                    }
                );
            });
        }else{
            res.end('INVALID LOGIN');
        }
    });

    //testing
    //db.imread('olin.jpg').on('finish', function () {
    //    res.render('view', {data: ['olin.jpg']});
    //});
});

app.get('/query', function(req,res){
    var name = req.query.name; //person name
    db.find(null, function(err,entries){
        var mytags = [];

        for(i in entries){
            var entry = entries[i];
            var personInfo = JSON.parse(entry.personInfo);

            if(personInfo.name == name){
                mytags.push(entry.tagInfo);
            }

        }

        res.end(JSON.stringify(mytags));
    });

});

app.post('/delete',function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/tmp';
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        db.delete(fields.id);
        res.end("DELETE COMPLETE");
    });

});

app.listen(process.env.PORT || 8000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
