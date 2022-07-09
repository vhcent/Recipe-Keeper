const Joi = require('joi') 
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: "recipe-app-database.cf2uy9dcit2e.us-west-1.rds.amazonaws.com",
    user: "hcent",
    password: "BananaBlast118!",
    port: "3306",
    databse: "recipe-app-database",
}); 

//Establish connection
connection.connect((err) => {
  if (err) throw err;
  else console.log("Connected!");
});
