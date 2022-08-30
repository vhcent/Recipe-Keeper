//all=true&id=notanumberlol&userid=1
const Joi = require('joi') // returns a class
//const express = require('express');
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

exports.handler = async (event) => {
    //Object.getOwnPropertyNames(Joi)
    console.log(event);
    console.log(event.httpMethod);
    console.log(event.resource);
    console.log("I'm here");
    // TODO implement
    if(event.resource == "/recipes"){
        console.log("Recipes endpoint")
        switch (event.httpMethod) {
            case 'POST':
                return recipePostReq(event);
            case 'GET':
                return recipeGetReq(event);
            case 'DELETE':
                return recipeDeleteReq(event);
            case 'PATCH':
                return recipePatchReq(event);
        }
    }
    else if (event.resource == "/grocery"){
        switch (event.httpMethod) {
            case 'POST':
                return groceryPostReq(event);
            case 'GET':
                return groceryGetReq(event);
            case 'DELETE':
                return groceryDeleteReq(event);
        }
    }
    else if (event.resource == "/recent"){
        switch (event.httpMethod) {
            case 'POST':
                return recentsPostReq(event);
            case 'GET':
                return recentsGetReq(event);
        }
    }
    else if (event.resource == "/checkSaved"){
        switch (event.httpMethod) {
            case 'GET':
                return checkSavedReq(event);
        }
    }
    /*
    else {
        console.log("Invalid Resource Requested")
        switch (event.httpMethod) {
            case 'POST':
                return postReq(event);
            case 'GET':
                return getReq(event);
            case 'DELETE':
                return recipeDeleteReq(event);
            case 'PATCH':
                return patchReq(event);
        }
    }
*/

    /*
    if(event.httpMethod == 'POST'){
        let test = local();
        return test;
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
    */
};

async function validateJOI(schema, input) {
    try{
        await Joi.assert(input, schema);
        console.log("Good parameters");
        return true;
    } catch(error){
        console.log(error);
            console.log("Bad parameters")
            return false;
    }
}

//recipeID and notes/name in the body
async function recipePatchReq(req) {
    let body = JSON.parse(req.body);
    let parameters = req.queryStringParameters;

    if (body.notes) {
        return dbManager.updateRecipeNotes(parameters.ID, body.notes);
    }
    else {
        return resultGen(204, "didn't specify proper patch")
        //error handle
    }
}

 async function recipeGetReq(req) {
    let query = req.queryStringParameters;
    console.log(`Get Recipes with userid ${query.userID}`);
    
    const schema = Joi.object({
        userID: Joi.string().required()
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, 'Invalid parameters for GET request')
    }
     
    return dbManager.getAllRecipes(query.userID);
}

async function recipeDeleteReq(req) {
    let query = req.queryStringParameters
     console.log(`Delete Recipes with params id ${query.ID}`);
    
    const schema = Joi.object({
        ID: Joi.number().positive().required(),
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "invalid parameters for delete request")
    }

    if(query.UserID) dbManager.deleteRecipeSaved(query.ID, query.UserID)
    else return dbManager.deleteRecipe(query.ID);
    //res.send('We done with get request')
}

async function recipePostReq(req) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        recipeID: Joi.number().positive().required(),
        url: Joi.string().min(3).required(),
        photo: Joi.string().required(),
        userID: Joi.string().required(),
    });
    
    let body = JSON.parse(req.body)
    console.log(body)

    let result = await validateJOI(schema, body)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "Invalid parameters for POST request")
    }

    return dbManager.addRecipe(body.name, body.url, body.userID, body.photo, body.recipeID)
}

async function groceryPostReq(req){

    const schema = Joi.object({
        item: Joi.string().required(),
        userID: Joi.string().required(),
    });
    
    let body = JSON.parse(req.body)
    console.log(body)

    let result = await validateJOI(schema, body)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "Invalid parameters for POST request")
    }

    return dbManager.addGrocery(body.userID, body.item)    
}

async function groceryGetReq(req){
    let query = req.queryStringParameters;
    console.log(`Get Recipes with userid ${query.userID}`);
    
    const schema = Joi.object({
        userID: Joi.string().required()
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, 'Invalid parameters for GET request')
    }
     
    return dbManager.getGrocery(query.userID);
}

async function groceryDeleteReq(req){
    let query = req.queryStringParameters
     console.log(`Delete Grocery with params id ${query.id}`);
    
    const schema = Joi.object({
        ID: Joi.number().positive().required(),
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "invalid parameters for delete request")
    }

    return dbManager.deleteGrocery(query.ID);
}

async function recentsPostReq(req){
    
    const schema = Joi.object({
        name: Joi.string().required(),
        recipeID: Joi.number().positive().required(),
        url: Joi.string().min(3).required(),
        photo: Joi.string().required(),
        userID: Joi.string().required(),
    });
    
    let body = JSON.parse(req.body)
    console.log(body)

    let result = await validateJOI(schema, body)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "Invalid parameters for POST request")
    }

    return dbManager.updateRecent(body.name, body.url, body.userID, body.photo, body.recipeID)
}

async function recentsGetReq(req){
    let query = req.queryStringParameters;
    console.log(`Get Recipes with userid ${query.userID}`);
    
    const schema = Joi.object({
        userID: Joi.string().required()
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, 'Invalid parameters for GET request')
    }
     
    return dbManager.getRecent(query.userID);
}

function resultGen(status, MSG) {
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
}

async function checkSavedReq(req) {
    // recipeidlist will be a comma separated list in query string parameters -> turn into actual list
    let query = req.queryStringParameters;
    const schema = Joi.object({
        userID: Joi.string().required(),
        IDs: Joi.string().required(),
    });
    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, 'Invalid parameters for GET request')
    }

    return dbManager.checkDuplicates(query.userID, query.IDs);
}

/*
class Response{
    constructor(statusCode) {
        // default HTTP status to 200/OK if not given
        this.setStatusCode(
            (statusCode === undefined)
                ? AWSLambdaProxyResponse.HTTP_STATUS.OK
                : statusCode
        );

        // empty headers and body
        this.headerCollection = {};
        this.body = '';
    }

}
*/
