const mysql = require("mysql");
const dbFunctions = require("./dbFunctions");

// Make connection to MySQL recipes database
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

function errorStatus(err, result, action) {
    if (err) console.log("Error", err);
    else console.log(action);
}

connection.query("USE recipe_app");

connection.query("select * from User", (err, result) => {
    console.log(result);
});

connection.query("select * from Recipe", (err, result) => {
    console.log(result);
});

connection.query("delete from Recipe", (err, result) => {
    console.log(result);
});

// connection.query(
//     `insert into Recipe (Name, URL, UserID) values("cake", "yahoo.com", 1);`,
//     (err, result) => {
//         errorStatus(
//             err,
//             result,
//             `added recipe`
//         );
//         //getRecipe()//get the latest and send it back
//     }
// );
