---
title: MongoDB
layout: template
filename: mongodb
---

# MongoDB Documentation

## Installing MongoDB

## Using MongoDB with Node.js

 - Installing: 

   ```bash
   npm install mongoose
   ```

It is quite easy to use mongoose. I suggest following the docs [here](http://mongoosejs.com/docs/).

## Cloud-based Storage with MLab

[MLab](https://mlab.com) (formerly MongoLab) is a cloud-based provider for MongoDB.

You get 500 MB for free when you sign up, which is quite nice of them.


### Creating a DB Instance

1. Sign up at the mLab website given above. 

2. After you sign up, click "+ create new". This redirects you the creation page.

3. In your plans, select "single-node", and "sandbox". Supply the name of the database and create.

4. In order to use the database, a database user is required. Click your database to go to management page.

5. Select "Users" in the tab below and click "+ Add database user".

6. Enter the desired credentials and save it somewhere so that you can remember it later.

### Connecting to the DB Instance

MLab Website has instructions too, but here is a copy of it:

 - Mongo shell:

   ```bash
   mongo ds139735.mlab.com:39735/<dbname> -u <dbuser> -p <dbpassword
   ```

 - Mongoose:

   ```javascript
   mongoose.connect(mongodb://<dbuser>:<dbpassword>@ds139735.mlab.com:39735/<dbname>)
   ```
      
## Support for Complex File Types with GridFS

GridFS allows you to store files such as images into MongoDB.

### Installing GridFS

 - With NPM: 

   ```base
   npm install gridfs-stream
   ```

### Using GridFS

[GridFS](https://docs.mongodb.com/manual/core/gridfs/) is a specification for storing and retrieving files that exceed the BSON-document size limit of 16 MB.

Documentation on accessing GridFS through the shell is in the link above.

 - Connecting (with Mongoose)

   ```javascript

   var mongoose = require('mongoose');
   mongoose.connect('YOUR DATABASE ENDPOINT');

   var gridfs = require('gridfs-stream')
   gridfs.mongo = mongoose.mongo;

   var con = mongoose.connection;
   var gfs = null;
   con.once('open', function () {
       console.log('MONGODB Connection established');
       //initialize gridfs
       gfs = gridfs(con.db);
   });
   ```

 - Writing to GridFS

   ```javascript
   function gfsWrite(filename){
      var writestream = gfs.createWriteStream({
         filename: filename
      });
      return fs.createReadstream(filename).pipe(writestream);
   }
   ```

 - Reading from GridFS

   ```javascript
   function gfsRead(filename){
      var readstream = gfs.createdReadStream({
         filename: filename 
      });
      return readstream.pipe(writestream);
   }
   ```

 - Deleting from GridFS

   ```javascript
   function gfsDelete(filename){
      gfs.remove({filename : filename},function(err){
          if(err){
              console.log(err);
          }else{
              doc.remove();
              console.log("REMOVE SUCCESS");
          }
      });
   
   }
   ```
