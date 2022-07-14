const mysql = require('mysql');
//const Promise = require('promise');

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

    connection.query(`select exists(select * from saved where name = "${name}" and url = "${URL}" and userid = "${UserID}");`,
    (err, result, fields) => { 
        var res = result[0][fields[0].name]; //get the result from the SQL command
        console.log(result);
        console.log(fields);
        if(err){ 
            console.log("Error", err)
            return resultGen(204, 'Something went wrong')
             //wrong code probably
            
        }
        if(res){
            console.log("Duplicate")
            return resultGen(204, 'Cannot add duplicates')
             //wrong code probably
            
        } //Duplicate exists
        //Second API call made inside a callback function bc it depends on the result
        connection.query(`insert into Recipe (Name, URL, UserID) values("${name}", "${URL}", "${UserID}");`, 
            (err, result) => { 
                errorStatus(err, result, `added recipe ${name} with URL ${URL}`) 
                //getRecipe()//get the latest and send it back 
            })
    })
    
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
function getAll(UserID, obj){
    /*
    return new Promise((resolve, reject) => {
        console.log("In the promise")
        connection.query(`select * from recipe where userid = "${UserID}";`,
        (err, result, fields) =>  {
            let set = [] 
            Object.keys(result).forEach(function(key) {
                set.push(result[key])
            });
            console.log("My set " + set)
            if(err){ 
                console.log("Error", err)
                return resolve(resultGen(204, 'Recipe not found'))
            }
            return resolve(resultGen(400, set))
        })
    });
    */
    console.log("I'm now here")
    const tester = connection.query(`select * from recipe where userid = "${UserID}";`,
    (err, result, fields) =>  {
        console.log("post-connection")
        let set = [] 
        Object.keys(result).forEach(function(key) {
            set.push(result[key])
        });
        console.log("Myset" + set)
        if(err){ 
            console.log("Error", err)
           // obj = resultGen(204, 'Recipe not found')
           obj.att = resultGen(204, 'Recipe not found') 
            //return resultGen(204, 'Recipe not found')
        }
        obj.att = resultGen(400, 'set') 
        console.log(obj)
        //return resultGen(400, set)
    })
    console.log(tester[0])
    obj.second = "test"
}

function deleteRecipe(ID, UserID){
    connection.query(`delete from recipe where RecipeID = ${ID} and userid = "${UserID}";`,
    (err) =>  { 
        if(err){ 
            console.log("Error", err)
        }
        console.log(`deleted recipe with ID: ${ID}`)
        return resultGen(200, "Success"); //tentative
    })
}

function resultGen(status, MSG){
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
}

module.exports =  {addRecipe, deleteRecipe, getAll, getRecipe};