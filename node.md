---
title: Node.js 
layout: template
filename: node 
---

### Installing Node

1. Install Node Version Manager (NVM):

   ```bash
   wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
   ```

2. Verify the installation:

   ```baash
   command -v nvm
   ```

3. Install the latest version of node:

   ```bash
   nvm install node
   ```

4. Install Express to make life easier:

   ```bash
   npm install --save express
   ```

### Hello World Example

 - server.js:

   ```javascript
   var express = require('express');
   var app = express();
   
   app.get('/', function(req, res){
     res.end('hello world');
   });
   
   app.listen(3000);
   console.log("listening on port 3000");
   ```
 - Test on terminal:

   ```bash
   node server.js &
   # WAIT A BIT ...
   wget localhost:3000
   cat index.html
   ```

 - To end testing:

   ```bash
   kill -9 $(pgrep node) 
   ```
