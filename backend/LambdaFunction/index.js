//all=true&id=notanumberlol&userid=1
const Joi = require('joi') // returns a class
//const express = require('express');
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const e = require('express');

exports.handler = async (event) => {
    console.log(event);
    console.log(event.httpMethod)
    console.log("I'm here")
    // TODO implement
    switch (event.httpMethod) {
        case 'POST':
            return postReq(event);
        case 'GET':
            return getReq(event);
        case 'DELETE':
            return deleteReq(event);
        case 'PATCH':
            return patchReq(event);
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
    try {
        Joi.assert(input, schema)
            .then(function (result) {
                return true;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
        console.log("Bad parameters")
        return false;
    }
}


//recipeID and notes/name in the body
function patchReq(req) {
    let body = JSON.parse(req.body);
    let parameters = req.queryStringParameters;
    if (body.notes) {
        return dbManager.updateRecipeNotes(parameters.recipeid, body.notes);
    }
    else if (body.name) {
        return dbManager.updateRecipeName(parameters.recipeid, body.name);
    }
    else {
        return resultGen(204, "didn't specify proper patch")
        //error handle
    }
}

function getReq(req) {
    let query = req.queryStringParameters;
    console.log(`Get Recipes with params id ${query.id}, all ${query.all}, userid ${query.userid}`);

    /*
    const schema = Joi.object({
        all: Joi.boolean().required(),
        id: Joi.number().positive().required(),
        userid: Joi.number().positive().required()
    });

    let result = validateJOI(schema, query)
    console.log(result)
    */
    /*
     if(!result){
         console.log("Returning 400 and Invalid params")
         return resultGen(400, 'Invalid parameters for GET request')
     }
     */
    if (query.all === 'true') return dbManager.getAllRecipes(query.userid);

    else return dbManager.getAllRecipes(query.id, query.userid);
    //res.send('We done with get request')
}

function deleteReq(req) {
    let query = req.queryStringParameters
    // console.log(`Delete Recipes with params id ${query.id} and userid ${query.userid}`);
    /*
        const schema = Joi.object({
            id: Joi.number().positive().required(),
            userid: Joi.number().positive().required()
        });
        const result = Joi.assert(query, schema)
        if (result) {
            console.log("Result:", result);
            console.log("Bad parameters")
            return resultGen(400, "invalid parameters for delete request")
        }
        */
    return dbManager.deleteRecipe(query.id, query.userid);
    //res.send('We done with get request')
}


/*
"body": {
    "name": "Brownies",
    "url": "dummies.org",
    "userid": "1"
  }
*/
//name: Brownies, url: dummies.org, userid: 1
function postReq(req) {
    /*
    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().min(3).required(),
        userid: Joi.number().positive().required()
    });
    const result = Joi.assert(req.body, schema)
    if (result) {
        console.log("Bad parameters")
        return resultGen(400, "Invalid parameters for POST request")
    }
    */
    let body = JSON.parse(req.body)
    console.log(body)
    return dbManager.addRecipe(body.name, body.url, body.userid)
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
