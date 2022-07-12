const mysql = require("mysql");

// Make connection to MySQL recipes database
var connection = mysql.createConnection({
    host: "recipe-app-database.cf2uy9dcit2e.us-west-1.rds.amazonaws.com",
    user: "hcent",
    password: "BananaBlast118!",
    port: "3306",
    database: "recipe_app"
});

//Establish connection
connection.connect((err) => {
    if (err) throw err;
    else console.log("Connected!");
});

connection.query("show tables;", (err, result) => { 
    if(err) console.log(err)
    else{console.log(result)}
 })