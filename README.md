# TeamUp
TeamUp is a web application for teams to collaborate. Built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Original repo
View the original repo with the project I submitted here: https://github.com/upsmancsr/CameronRayMakerSightsHW

## Current Features

- Sign up and sign in as an indivudual
- view all users who have signed up.
- User info is stored in a MondoDB database provisioned through Heroku and MLab.

### How to install and run the app

#### Dependencies
In the root directory, run the command `npm install` to install dependencies for the backend.

cd into the msights-client directory, and run the command `npm install` to install dependencies for the front end React App

#### Front End App
To start a development server running the React App front end, cd into the frontend directory, and run the command `npm start` to start the development server at localhost:3000.

#### Back End server
To start the express server locally (development environment), from the root directory, run the command `npm run dev` to start the development server using nodemon.

#### How to access the database
The Dtabase was provisioned using Heroku's MLab add-on feature. The Backend server connects to the database using the DB URI, which is in the .env file at /backend/.env. As a production app, all of the files containing secret keys would be included in .gitignore.

#### Database schema/design
The Database has a collection called 'users.' Each User has a first name, last name, email, password, and creation date. From the root directory, cd into the 'schemas' directory and see the file 'User.js.'




