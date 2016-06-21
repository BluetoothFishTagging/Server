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

app.get('/', function (req, res) {
    res.render('upload');
});

app.post('/', function (req, res) {
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

app.get('/view', function (req, res) {
    db.find(null, function (error, tags) {
        //console.log(tags);
        async.each(tags,
            // for each tag
            function (tag, callback) {
                db.read(tag._id, function (res) {
                    callback();
                })
            },
            //on result
            function (err) {
                console.log("HERE");
                for (i in tags) {
                    var tag = tags[i];
                    console.log(tag.photo);

                    /* example parsing ... */
                    var personInfo = JSON.parse(tag.personInfo);
                    var tagInfo = JSON.parse(tag.tagInfo);
                    console.log('name : ', personInfo.name);

                    //console.log(p);
                    //console.log(p.photo);

                    //var json_tag = tags[i].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
                    //p = JSON.parse(jso2n_tag);
                    //console.log(p.photo);
                }
                res.render('view', {tags: tags});
            }
        );
    });

    //testing
    //db.imread('olin.jpg').on('finish', function () {
    //    res.render('view', {data: ['olin.jpg']});
    //});
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
