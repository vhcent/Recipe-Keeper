// https://rapidapi.com/spoonacular/api/recipe-food-nutrition/details

//const express = require("express"); // include express
const http = require('https') //import https moduke

const options = {
    hostname: 'api.spoonacular.com',
    port: 443,
    path: '/recipes/findByIngredients',
    method: 'GET',
    query:{
        apiKey: '8d51cf1e41ad42fcb9c2699fbba2cfbd', ingredients: 'apples'
    }
  };
var url = "https://api.spoonacular.com/recipes/findByIngredients/?apiKey=8d51cf1e41ad42fcb9c2699fbba2cfbd&ingredients=apples"
//for each ingredient in list
// url = url + 'apples,+sugar,+flour'
// var num = 2;
// url = url + '&number=' + num;

// Sending the request
//const req = http.request(options, (res) => {
const req = http.request(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk;
    });

    // Ending the response 
    res.on('end', () => {
        console.log('Body:', JSON.parse(data))
    });

}).on("error", (err) => {
    console.log("Error: ", err)
})

req.end()

//8d51cf1e41ad42fcb9c2699fbba2cfbd