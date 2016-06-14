/**
 * Created by jamiecho on 6/14/16.
 */

/* Initialize Mongoose */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// --> replace with mongolab

var con = mongoose.connection;

/* Initialize GridFS */
var gridfs = require('gridfs-stream');
gridfs.mongo = mongoose.mongo;


var fs = require('fs');
var gfs = gridfs(con.db);

//error
con.on('error',function(err){
    console.log('ERROR!!');
    throw err;
});

con.on('open',function(){
    console.log('MONGODB Connection established');
});

exports.find = function(){
    //not supported yet

};

exports.write = function(photo){
    //copies from ephemeral filesystem
    var writestream = gfs.createWriteStream({
        filename: photo.name
    });
    return fs.createReadStream(photo.path).pipe(writestream);
};

exports.read = function(name, func){
    //copies to epheemral filesystem
    var readstream = gfs.createReadStream({
        filename: name
    });
    var writestream = fs.createWriteStream(__dirname + '/tmp/' + name);
    return readstream.pipe(writestream);
 };