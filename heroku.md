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
    1. You need a local package.json file to define your application's dependencies.

        If you have been using a global one, simply copy it over to your application's directory.

    2. Then, you must define a Procfile :

        ```bash
        web: node index.js
        ```

    Assuming you have a fully functional web application already, here are the steps to prepare it for heroku.

    If you don't, simply run:

    ```bash
    git clone https://github.com/heroku/node-js-getting-started.git
    cd node-js-getting-started
    ```

4. Deploying the app:
