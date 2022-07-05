const mysql = require('mysql');

// Make connection to MySQL recipes database
var connnection = mysql.createConnection({
  host: "localhost",
  user: "recipeServer",
  password: "recipe",
  database: "recipes"
}); 

//Establish connection
connnection.connect((err) => {
  if (err) throw err;
  else console.log("Connected!");
});

function errorStatus(err, result, action){
    if(err) console.log("Error", err)
    else console.log(action);
}

//initialize database
function initializeDB(){
    //connnection.query("drop table Saved", errorStatus(err, result, "Dropped saved DV") )
    connnection.query("drop table Saved;", (err, result) => { errorStatus(err, result, "dropped save table") })
    //Columns for the table
    const savedParams = [
        "RECIPE_ID INT NOT NULL AUTO_INCREMENT",
        "Name VARCHAR(255)",
        "URL VARCHAR(255)", 
        "PRIMARY KEY(RECIPE_ID)"
    ]
    connnection.query(`create table Saved(${savedParams[0]}, ${savedParams[1]},  ${savedParams[2]},  ${savedParams[3]});`, 
        (err, result) => { errorStatus(err, result, "created save table") })
}

/*
function contained(name, URL){
    connnection.query(`select exists(select * from saved where name = ${name} and url = ${URL})`, 
    (err, result) =>  { errorStatus(err, result, `failed to check for recipe ${name} with URL ${URL}`) })
}
*/
function addRecipe(name, URL, APIRes){

    connnection.query(`select exists(select * from saved where name = "${name}" and url = "${URL}");`,
    (err, result, fields) => { 
        var res = result[0][fields[0].name]; //get the result from the SQL command
        console.log(result);
        console.log(fields);
        if(err){ 
            console.log("Error", err)
            if(APIRes) return APIRes.status(204).send("Something went wrong") //wrong code probably
            return;
        }
        if(res){
            console.log("Duplicate")
            if(APIRes) return APIRes.status(204).send("Cannot add duplicates") //wrong code probably
            return;
        } //Duplicate exists
        //Second API call made inside a callback function bc it depends on the result
        connnection.query(`insert into Saved (Name, URL) values("${name}", "${URL}");`, 
            (err, result) => { 
                errorStatus(err, result, `added recipe ${name} with URL ${URL}`) 
                //getRecipe()//get the latest and send it back 
            })
    })
    
}

//Might not be used
function getRecipe(ID, APIRes){
    connnection.query(`select * from saved where recipe_id = ${ID};`,
    (err, result, fields) =>  { 
        //console.log(result)
        // console.log(fields)
        var res = result[0]; //get the result from the SQL command
        console.log(res);
        if(err | !res){ 
            console.log("Error", err)
            console.log("Empty Result perhaps")
            return APIRes.status(204).send("Recipe not found")
        }
        APIRes.send(res);
    })
}

//Updated This
function getAll(){
    connnection.query(`select * from saved`,
    (err, result, fields) =>  {
        set = [] 
        Object.keys(result).forEach(function(key) {
            set.push(result[key])
        });
        console.log(set)
        if(err){ 
            console.log("Error", err)
            return resultGen(204, 'Recipe not found')
        }
        return resultGen(400, set)
    })
}

function deleteRecipe(ID, APIRes){
    connnection.query(`delete from saved where recipe_id = ${ID};`,
    (err) =>  { 
        if(err){ 
            console.log("Error", err)
            if(APIRes) return APIRes.status(204).send("Unable to Delete Recipe");
            return;
        }
        console.log(`deleted recipe with ID: ${ID}`)
        if(APIRes) APIRes.send("Success");
    })
}

module.exports =  {initializeDB, addRecipe, deleteRecipe, getAll, getRecipe};