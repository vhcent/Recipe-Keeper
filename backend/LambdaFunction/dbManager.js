const mysql = require('mysql');

// Make connection to MySQL recipes database
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

function errorStatus(err, result, action){
    if(err) console.log("Error", err)
    else console.log(action);
}

/*
function contained(name, URL){
    connnection.query(`select exists(select * from saved where name = ${name} and url = ${URL})`, 
    (err, result) =>  { errorStatus(err, result, `failed to check for recipe ${name} with URL ${URL}`) })
}
*/

function addRecipe(name, URL, UserID){
    return new Promise(function(resolve, reject){
        connection.query(`select exists(select * from Recipe where name = "${name}" and url = "${URL}" and userid = "${UserID}");`,
        (err, result, fields) => { 
            var res = result[0][fields[0].name]; //get the result from the SQL command
            console.log(result);
            console.log(res);
           
            if(err){ 
                console.log("Error", err)
                resolve(resultGen(204, 'Something went wrong'))
                //wrong code probably    
            }
            if(res){
                console.log("Duplicate")
                resolve(resultGen(204, 'Cannot add duplicates'))
                //wrong code probably
                
            } //Duplicate exists
            //Second API call made inside a callback function bc it depends on the result
            else connection.query(`insert into Recipe (Name, URL, UserID) values("${name}", "${URL}", "${UserID}");`, 
                (err, result) => { 
                    resolve(resultGen(200, `added recipe ${name} with URL ${URL}`))
                    console.log(`added recipe ${name} with URL ${URL} why am I here`) 
                    //getRecipe()//get the latest and send it back 
                })
        })
    });
}

//Might not be used
function getRecipe(ID, UserID){
    
    connection.query(`select * from recipe where recipeid = ${ID} and userid = "${UserID}";`,
    (err, result, fields) =>  { 
        //console.log(result)
        // console.log(fields)
        var res = result[0]; //get the result from the SQL command
        console.log(res);
        if(err | !res){ 
            console.log("Error", err)
            console.log("Empty Result perhaps")
            return resultGen(204, 'Recipe not found')
        }
        return resultGen(400, res)
    })
}

//Updated This
function getAll(UserID){
    return new Promise(function(resolve, reject){
        connection.query(`select * from Recipe where userid = "${UserID}";`,
        //connection.query(`show tables;`,
        (err, result, fields) =>  {
            if(err){ 
                console.log("Error", err)
                resolve(resultGen(204, 'Recipe list not found'))
            }
            else resolve(resultGen(400, result))
        })
    });
}

function deleteRecipe(ID, UserID){
    return new Promise(function(resolve, reject){
        connection.query(`delete from Recipe where RecipeID = ${ID} and userid = "${UserID}";`,
        (err) =>  { 
            if(err){ 
                console.log("Error", err)
                resolve(resultGen(204, 'Cannot delete'))
            }
            else{
                console.log(`deleted recipe with ID: ${ID}`)
                resolve(resultGen(200, "Success")); //tentative
            }
        })
    });
}

function resultGen(status, MSG){
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
}

module.exports =  {addRecipe, deleteRecipe, getAll, getRecipe, resultGen};