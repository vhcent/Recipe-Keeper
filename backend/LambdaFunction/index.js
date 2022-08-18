//all=true&id=notanumberlol&userid=1
const Joi = require('joi') // returns a class
//const express = require('express');
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

exports.handler = async (event) => {
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
                return recentspostReq(event);
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

async function checkSavedReq(req) {
    return checkDuplicates(userid, recipeidlist)
}

//recipeID and notes/name in the body
async function recipePatchReq(req) {
    let body = JSON.parse(req.body);
    let parameters = req.queryStringParameters;

    if (body.notes) {
        return dbManager.updateRecipeNotes(parameters.id, body.notes);
    }
    else {
        return resultGen(204, "didn't specify proper patch")
        //error handle
    }
}

 async function recipeGetReq(req) {
    let query = req.queryStringParameters;
    console.log(`Get Recipes with userid ${query.userid}`);
    
    const schema = Joi.object({
        userid: Joi.string().required()
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, 'Invalid parameters for GET request')
    }
     
    return dbManager.getAllRecipes(query.userid);
}

async function recipeDeleteReq(req) {
    let query = req.queryStringParameters
     console.log(`Delete Recipes with params id ${query.id}`);
    
    const schema = Joi.object({
        id: Joi.number().positive().required(),
    });

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "invalid parameters for delete request")
    }

    return dbManager.deleteRecipe(query.id);
    //res.send('We done with get request')
}

async function recipePostReq(req) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        recipeid: Joi.number().positive().required(),
        url: Joi.string().min(3).required(),
        photo: Joi.string().required(),
        userid: Joi.string().required(),
    });
    
    let body = JSON.parse(req.body)
    console.log(body)

    let result = await validateJOI(schema, query)
    if(!result){
        console.log("Returning 400 and Invalid params")
        return resultGen(400, "Invalid parameters for POST request")
    }

    return dbManager.addRecipe(body.name, body.url, body.userid, body.photo, body.recipeid)
}

function resultGen(status, MSG) {
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
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
