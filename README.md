# CameronRayMakerSightsHW2
Take home assignment for Makersights Full Stack Engineering. This is a second version/refactor of the project I submitted. I wanted to improve several areas that were sub-optimal, both as additional practice and to have an alternate version to show during my onsite visit. This was a useful exercise in comparing pros and cons of 2 different approaches.

## Original repo
View the original repo with the project I submitted here: https://github.com/upsmancsr/CameronRayMakerSightsHW

## Assignment prompt and description
The task: Create a new web app and implement authentication. 

Required objectives: 

- The app should have pages for sign up and sign in, and an admin page to view all users. 
- The app should integrate with one OAUTH provider (facebook, twitter, google, github, etc.).
- The app should save users to a database (cloud provider preferred) with their OAUTH credentials.

## Overview of this version

For this version of the project, the major change I made was to use Firebase Authentication in place of the previous strategy, which involved a more 'custom' approach of encrypting passwords, storing passwords along with other user details in a MongoDB database, comparing against thosed stored credentials for log-in, and managing user sessions with json web tokens saved in local storage.

### How to install and run the app

#### Dependencies
In the root directory, run the command `npm install` to install dependencies for the backend.

cd into the msights-client directory, and run the command `npm install` to install dependencies for the front end React App

#### Front End App (msights-client)
To start a development server running the React App front end, cd into the msights-client directory, and run the command `npm start` to start the development server at localhost:3000.

#### Back End server
To start the express server locally (development environment), from the root directory, run the command `npm run dev` to start the development server using nodemon.

#### How to access the database
The DAtabase was provisioned using Heroku's MLab add-on feature. The Backend server connects to the database using the DB URI, which is saved at the filepath `/config/configVars` and named mongoURI. This foncigVars file, as well as the .env files are not included in the .gitignore file, so that assessment of this project will be easier. As a production app, all of the files containing secret keys would be included in .gitignore.

#### Database schema/design
The Database has a collection called 'users.' Each User has the contains a name, email, password, and date (for the creationg date of the User). From the root directory, cd into the 'schemas' directory and see the file 'User.js.'




