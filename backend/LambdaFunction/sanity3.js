const mysql = require("mysql");
//master
//dummy123
// Make connection to MySQL recipes database
var connection = mysql.createConnection({
    host: "tester.citfbq5zpu73.us-west-2.rds.amazonaws.com",
    user: "master",
    password: "dummy123",
    port: "3306",
    //database: "tester",
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