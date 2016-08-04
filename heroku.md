---
title: Heroku
layout: template
filename: heroku
---

## Setting up Heroku to host your website

This Guide is based on the [official heroku guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

1. Create [Heroku](https://www.heroku.com/) Account.

2. Install Heroku Toolbelt:

   ```bash
   wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
   ```

3. Log in to heroku:

   ```bash
   heroku login
   #Enter your Heroku credentials...
   ```

4. Preparing the app:

   Assuming you have a fully functional web application already, here are the steps to prepare it for heroku.

   If you don't, simply run:

   ```bash
   git clone https://github.com/heroku/node-js-getting-started.git
   cd node-js-getting-started
   ```
   
   Otherwise, follow the instructions below.

    1. You need a local package.json file to define your application's dependencies.

       If you have been using a global one, simply copy it over to your application's directory.

       ```bash
       cd ${APP_DIRECTORY}
       cp ${HOME}/package.json .
       ```
       
       You can also run:

       ```bash
       npm init --yes
       ```

    2. Then, you must define a Procfile :
       
       If your main app starts with server.js,

       ```bash
       web: node server.js
       ```

       If no Procfile is defined, the app will default to the start script in your package.json:

       ```bash
       "start": "node server.js"
       ```

       If there is no start script, then the default is **server.js**.

    3. In your application, make sure it listens to a port Heroku supplies:

       ```javascript
       var port = process.env.PORT || 8000;
       server.listen(port);
       ```

5. Deploying the app:

    1. Create the app on heroku:

       ```bash
       heroku create
       ```

    2. Deploy the code:

       ```bash
       git push heroku master
       ```

5. Ensure that the app instance is running:

   ```bash
   heroku ps:scale web=1
   ```

6. Check that the app is running with:

   ```bash
   heroku open
   ```

7. [Tip] if you need to configure environmental variables:

   ```bash
   heroku config:set VAR1_NAME=VAR1_VALUE VAR2_NAME=VAR2_VALUE
   ```

## Running Heroku Locally

If you have to test new features that aren't yet stable, you wouldn't want to experiment in your running instance.

That is what local instances are for.

    ```bash
    heroku local 
    ```
