const Joi = require('joi') 
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: "recipe-app-database.cf2uy9dcit2e.us-west-1.rds.amazonaws.com",
    user: "hcent",
    password: "BananaBlast118!",
    port: "3306",
    database: "recipe_app",
}); 

//Establish connection
connection.connect((err) => {
  if (err) throw err;
  else console.log("Connected!");
});


exports.handler = async (event) => {
    console.log(event);
    let query = event.queryStringParameters;
    console.log(query)
    let promise = new Promise(function(resolve, reject){
        connection.query(`select * from recipe where userid = "${query.UserID}";`,
        (err, result) =>  {
            console.log("In the callback")
            if(err){ 
                console.log("Error", err)
                //reject(resultGen(204, 'Recipe not found'))
                //return resultGen(204, 'Recipe not found')
                reject('recipe not found')
            }
            if(result == null){
                console.log("Empty return set")
                //reject(resultGen(204, 'No recipe found'))
                reject('no recipe found')
            }
            let set = [] 
            Object.keys(result).forEach(function(key) {
                set.push(result[key])
            });
            console.log(set)
            resolve(set)
        })
    });
    return promise;
    promise.then()
    console.log(promise)

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    //await sleep(1000);
    return response;

};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}