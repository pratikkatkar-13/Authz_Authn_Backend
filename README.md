# Authz_Authn_Backend
npm init -y  - To install all package.json file
npm i express - To install all nodes modules and express 
node <filename>.js -  Generally to run all the server 


npm i nodemon - Same as frontend liveserver auto sync and up to date 
makes changes in pacakage.json files as follows:
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
npm run dev - to run server 

npm i dotenv - to export enviornment variables seperately
npm  i mongoose - to connect server or application with MongoDB database

npm install jwtwebtoken - to use verify() and sign() function
npm install bcrypt - to hash the password to Datbase entry
npm install cookie-parser - to parse the cookies

Additionally project needs 
1. MongoDB setup
2. MongoDB Shell
3. MongoDB compass
4. Postman API setup


//routes to test
http://localhost:3000/api/v1/signup
http://localhost:3000/api/v1/login
http://localhost:3000/api/v1/test
http://localhost:3000/api/v1/student
http://localhost:3000/api/v1/admin
