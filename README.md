# Recipe Keeper
### Built by [Aroop Biswal](https://github.com/AroopBiswal), [Jason Fu](https://github.com/nboadcodes), and [Vincent Huang](https://github.com/vhcent) ###

# Description #
An android recipe keeper app that allows for the searching and storage of recipes and groceries. Using the Spoonacular API for a database of recipes and a user login system for user-based storage, Recipe Keeper is a convenient way to discover and organize recipes. 

# Installation #
[Download and try the app here.](whatever google play link it publishes)
<!-- [Aroop Biswal](https://github.com/AroopBiswal) -->



### Video Demo ##

# How we built this app #
### *Tech Stack*
Node.js, AWS, MySQL, Expo (React Native), 
### *Backend*
For the backend, we initially used <span style="color:lightblue"> Node.JS</span> with an Express framework, as we were most familiar with those. However, we soon realized that in order to keep our server running, we would have to integrate our code with a third party service. That service ended up being Amazon Web Services, as their products are relatively well documented, work well together, and their free tier provides more than enough resources.  

The core of our backend is a <u>MySQL</u> database hosted on <u>Amazon RDS</u>. An <u>AWS Lambda</u> function written in <u>Node.JS</u> runs SQL commands to modify the database. Finally, a front-facing HTTP API that integrated the Lambda function was created using <u>Amazon API Gateway</u> . Through this process, we created a multi-endpoint HTTP API that could manipulate the MySQL database based on the features and needs of the frontend. 

### *Frontend*
For the frontend, we used <u>[Expo](https://expo.dev/)</u>, which utilizes <u>React Native</u> to create an app that is compatible with both ios and android environments natively. We separated each component of our app into their own .js/.jsx files to minimize redundant code and make our project more modular. To update and delete from the tables in our MySQL database, we called our api in response to certain user actions in the frontend. We also designed a cache system to store data from recent api calls to reduce load times from frequent calls.

### *Authorization*
To further enhance our app, we wanted to create an account login system. This was implemented using <u>Auth0</u>, which provides its own login/logout UI, and manages its own user database. Besides this, Auth0 uses <u>OAuth</u> protocols, which allowed us to protect our API endpoints with a JWT token. Upon logging in, a series of calls are made to various Auth0 endpoints that allow our app to retrieve a UserID and a Bearer Access Token, both of which are passed to and used by the backend API. 
<!-- 
We also wanted to protect our API endpoints and incorporate a 3rd party login system.
To authorize and project our multi-endpoint API, we decided to follow OAuth 2.0 prodedures  -->
### *Features*


| Searching for Recipes by their Names| Grocery List  |
| :-------------: | :-------------: | 
|<img alt="image" width="400" src="https://github.com/vhcent/Recipe-Keeper/blob/main/frontend/src/assets/phone%20screenshot%201.jpg?raw=true">  | <img alt="image" width="400" src="https://github.com/vhcent/Recipe-Keeper/blob/main/frontend/src/assets/phone%20screenshot%202.jpg?raw=true">  |

| Saved Recipes | Recipe View with Ingredients and Integrated Grocery List |
| :-------------: | :-------------: |
|<img alt="image" width="400" src="https://github.com/vhcent/Recipe-Keeper/blob/main/frontend/src/assets/phone%20screenshot%203.jpg?raw=true">  | <img alt="image" width="400" src="https://github.com/vhcent/Recipe-Keeper/blob/main/frontend/src/assets/phone%20screenshot%204.jpg?raw=true">  |