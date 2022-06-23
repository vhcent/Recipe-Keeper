const Joi = require('joi') // returns a class
const express = require('express');
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

dbManager.initializeDB();

// TEST CALLS
dbManager.addRecipe("Pasta", "google.com");
dbManager.addRecipe("Pasta", "apple.com");
dbManager.addRecipe("Bread", "yumyum.org");
dbManager.addRecipe("Ice Cream", "myrecipes.io");
setTimeout(() => { dbManager.addRecipe("Pasta", "google.com"); }, 400);
//setTimeout(() => {  dbManager.getRecipe(1); }, 400); //no longer works due to APIRes param
setTimeout(() => { dbManager.deleteRecipe(3) }, 600);
//setTimeout(() => { dbManager.getAll(); }, 800); //can no longer be called due to APIRes param

async function validateJOI(schema, input) {
    try {
        Joi.assert(input, schema)
        .then(function(result) {
            return true;
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    catch (error) {
        console.log(error);
        console.log("Bad parameters")
        return false;
    }
}

const app = express(); //represents ur application
app.use(express.json());

//Server Pipeline Begins Here
// print info about incoming HTTP request for debugging
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
})

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());

//Format of API Call:
//  All: if true, then returns all, if false then returns by ID
//  ID: ID of recipe to find
app.get('/recipes', (req, res) => {
    console.log(`Get Recipes with params id ${req.query.id} and all ${req.query.all}`);

    const schema = Joi.object({
        all: Joi.boolean().required(),
        id: Joi.number().positive().required()
    });

    let result = validateJOI(schema, req.query)
    console.log(result)
    if(!result){
        return res.status(400).send('Invalid parameters for GET request')
    }
    
    if (req.query.all === 'true') dbManager.getAll(res);

    else dbManager.getRecipe(req.query.id, res);
    //res.send('We done with get request')
});

app.delete('/recipes', (req, res) => {
    console.log(`Delete Recipes with params id ${req.query.id}`);

    const schema = Joi.object({
        id: Joi.number().positive().required()
    });
    const result = Joi.assert(req.query, schema)
    if (result) {
        console.log("Result:", result);
        console.log("Bad parameters")
        return res.status(400).send('Invalid parameters for DELETE request')
    }
    dbManager.deleteRecipe(req.query.id, res);
    //res.send('We done with get request')
});

app.post('/recipes', (req, res) => {
    console.log(`Delete Recipes with params id ${req.query.id}`);

    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().min(3).required()
    });
    const result = Joi.assert(req.body, schema)
    if (result) {
        console.log("Bad parameters")
        return res.status(400).send('Invalid parameters for POST request')
    }

    dbManager.addRecipe(req.body.name, req.body.url, res)

    res.send("we did it")
});

const listener = app.listen(3000, function () {
    console.log("The static server is listening on port " + listener.address().port);
});

