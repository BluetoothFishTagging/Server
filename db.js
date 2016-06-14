/**
 * Created by jamiecho on 6/14/16.
 */

/* Manipulate FileSystem */
var fs = require('fs');
var path = require('path');

/* Initialize Mongoose */
var mongoose = require('mongoose');
mongoose.connect('mongodb://sangue:jcho5985@ds037185.mlab.com:37185/ycho');
// --> replace with mongolab

/* Establish Connection */
var con = mongoose.connection;

con.on('error', function (err) {
    console.log('ERROR!!');
    throw err;
});

con.on('open', function () {
    console.log('MONGODB Connection established');
});


/* Initialize GridFS */
var gridfs = require('gridfs-stream');
gridfs.mongo = mongoose.mongo;

var gfs = gridfs(con.db);


/* Create Temporary Directory */
var tmp_dir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tmp_dir))
    fs.mkdirSync(tmp_dir);

exports.find = function () {
    //not supported yet
};

exports.write = function (photo) {
    //copies from ephemeral filesystem
    var writestream = gfs.createWriteStream({
        filename: photo.name
    });
    return fs.createReadStream(photo.path).pipe(writestream);
};

exports.read = function (name, func) {
    //copies to epheemral filesystem
    var readstream = gfs.createReadStream({
        filename: name
    });

    var writestream = fs.createWriteStream(path.join(tmp_dir, name));
    return readstream.pipe(writestream);
};