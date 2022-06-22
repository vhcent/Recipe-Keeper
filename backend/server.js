const mysql = require('mysql');

//Make connection to MySQL recipes database
var connnection = mysql.createConnection({
  host: "localhost",
  user: "JDBC",
  password: "jdbcisweird",
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
function initiailizeDB(){
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

initiailizeDB();

/*
function contained(name, URL){
    connnection.query(`select exists(select * from saved where name = ${name} and url = ${URL})`, 
    (err, result) =>  { errorStatus(err, result, `failed to check for recipe ${name} with URL ${URL}`) })
}
*/
function addRecipe(name, URL, APIRes){

    connnection.query(`select exists(select * from saved where name = "${name}" and url = "${URL}");`,
    (err, result, fields) =>  { 
        var res = result[0][fields[0].name]; //get the result from the SQL command
        console.log(res);
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

function getAll(APIRes){
    connnection.query(`select * from saved`,
    (err, result, fields) =>  {
        set = [] 
        Object.keys(result).forEach(function(key) {
            set.push(result[key])
        });
        console.log(set);
        APIRes.send(set);
        if(err){ 
            console.log("Error", err)
            return APIRes.status(204).send("Recipe not found")
        }
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

// TEST CALLS
addRecipe("Pasta", "google.com");
addRecipe("Pasta", "apple.com");
addRecipe("Bread", "yumyum.org");
addRecipe("Ice Cream", "myrecipes.io");
setTimeout(() => {  addRecipe("Pasta", "google.com"); }, 400);
//setTimeout(() => {  getRecipe(1); }, 400); //no longer works due to APIRes param
setTimeout(() => {  deleteRecipe(3) }, 600);
//setTimeout(() => {  getAll(); }, 800); //can no longer be called due to APIRes param


const Joi = require('joi') // returns a class
const express = require('express');
const app = express(); //represents ur application

app.use(express.json())

//Format of API Call:
//  All: if true, then returns all, if false then returns by ID
//  ID: ID of recipe to find
app.get('/recipes', (req, res) =>{
    console.log(`Get Recipes with params id ${req.query.id} and all ${req.query.all}`);

    const schema = Joi.object({
        all: Joi.boolean().required(),
        id: Joi.number().positive().required()
    });
    const result = Joi.assert(req.query, schema)
    if(result){
        console.log("Bad parameters")
        return res.status(400).send('Invalid parameters for GET request')
    }
    if(req.query.all === 'true') getAll(res);

    else getRecipe(req.query.id, res);
    //res.send('We done with get request')
});

app.delete('/recipes', (req, res) =>{
    console.log(`Delete Recipes with params id ${req.query.id}`);

    const schema = Joi.object({
        id: Joi.number().positive().required()
    });
    const result = Joi.assert(req.query, schema)
    if(result){
        console.log("Bad parameters")
        return res.status(400).send('Invalid parameters for DELETE request')
    }
    deleteRecipe(req.query.id, res);
    //res.send('We done with get request')
});

app.post('/recipes', (req, res) =>{
    console.log(`Delete Recipes with params id ${req.query.id}`);

    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().min(3).required()
    });
    const result = Joi.assert(req.body, schema)
    if(result){
        console.log("Bad parameters")
        return res.status(400).send('Invalid parameters for POST request')
    }

    addRecipe(req.body.name, req.body.url, res)

    res.send("we did it")
});




const port = process.env.PORT || 8000; ///unsure if PORT is working
app.listen(port, () => console.log(`listening on port ${port}`))



