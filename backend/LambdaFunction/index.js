const Joi = require('joi') // returns a class
//const express = require('express');
const dbManager = require('./dbManager');
const mysql = require('mysql');
const bodyParser = require('body-parser');

exports.handler = async (event) => {
    console.log(event);
    console.log(event.httpMethod)
    console.log("I'm here")
    // TODO implement
    switch(event.httpMethod){
        case 'POST':
            return postReq(event);
        case 'GET':
            return getReq(event);
        case 'DELETE':
            return deleteReq(event);
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

function getReq(req){
    let query = req.queryStringParameters;
    console.log(`Get Recipes with params id ${query.id} and all ${query.all}`);

    const schema = Joi.object({
        all: Joi.boolean().required(),
        id: Joi.number().positive().required()
    });

    let result = validateJOI(schema, query)
    console.log(result)
    if(!result){
        return resultGen(400, 'Invalid parameters for GET request')
    }
    
    if (query.all === 'true') return dbManager.getAll();

    else return dbManager.getRecipe(query.id);
    //res.send('We done with get request')
}

function postReq(){

}

function resultGen(status, MSG){
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
