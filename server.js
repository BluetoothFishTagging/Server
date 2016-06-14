/**
 * Created by jamiecho on 6/13/16.
 */

var express = require('express');
var formidable = require('formidable');
var bodyparser = require('body-parser');
var path = require('path');

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
            db.write(files.photo);
        }
    });

    form.on('end', function () {
        res.render('upload')
    });
});

app.get('/view', function (req, res) {
    //testing
    db.read('olin.jpg').on('finish', function () {
        res.render('view', {data: ['olin.jpg']});
    });
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});