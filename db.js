/**
 * Created by jamiecho on 6/14/16.
 */

/* Manipulate FileSystem */
var fs = require('fs');
var path = require('path');
var async = require('async');

/* Initialize Mongoose */
var mongoose = require('mongoose');
mongoose.connect('mongodb://sangue:jcho5985@ds037185.mlab.com:37185/ycho');

/* Initialize GridFS */
var gridfs = require('gridfs-stream');
gridfs.mongo = mongoose.mongo;

/* Establish Connection */
var con = mongoose.connection;
var gfs = null;

con.on('error', function (err) {
    console.log('ERROR!!');
    throw err;
});

con.once('open', function () {
    console.log('MONGODB Connection established');
    //initialize gridfs
    gfs = gridfs(con.db);
});

/* Tag Info Schema */
var ObjectId = mongoose.Schema.Types.ObjectId;

var tagSchema = mongoose.Schema({ //todo : parser fisher/tag info
    fisher : String,
    tag : String,
    img : String
});

var tagModel = mongoose.model('tag',tagSchema);


/* Create Temporary Directory */
var tmp_dir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tmp_dir))
    fs.mkdirSync(tmp_dir);


function imwrite(photo) {
    //copies from ephemeral filesystem
    var writestream = gfs.createWriteStream({
        filename: photo.name
    });
    return fs.createReadStream(photo.path).pipe(writestream);
}

function imread(name) {
    //copies to epheemral filesystem
    var readstream = gfs.createReadStream({
        filename: name
    });

    var writestream = fs.createWriteStream(path.join(tmp_dir, name));
    return readstream.pipe(writestream);
}


function write(fisher,tag,img,callback){
    console.log(fisher,tag,img);
    async.parallel([
       function(callback){
           console.log("writing image");
           return imwrite(img).on('finish',callback);
       },
       function(callback){
           console.log('Writing to tagmodel');
           var entry = new tagModel({fisher:fisher,tag:tag,img:img.name});
           entry.save(callback);
       }
    ], callback);
}

function read(id, callback){

    //callback(res)
    async.waterfall([
        function(callback){
            tagModel.findById(id, function(err,res){
                if(err) throw err;
                callback(null,res);
            })
        },
        function(res,callback){
            imread(res.img).on('close',function(file){
                callback(null,res);
            });
        }
    ], callback);
}

function find(id, callback){
    if(id)
        tagModel.find({__id:id},callback);
    else
        return tagModel.find({},callback);
}

exports.imwrite = imwrite;
exports.imread = imread;
exports.write = write;
exports.read = read;
exports.find = find;