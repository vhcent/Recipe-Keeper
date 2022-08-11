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
connection.connect((error) => {
    if (error) throw error;
    else console.log("Connected!");
});

/*
function contained(name, URL){
    connnection.query(`select exists(select * from saved where name = ${name} and url = ${URL})`, 
    (error, result) =>  { errorStatus(error, result, `failed to check for recipe ${name} with URL ${URL}`) })
}
*/

function resultGen(status, MSG) {
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
}

function addRecipe(name, URL, UserID, imageURL) {
    return new Promise(function (resolve, reject) {
        connection.query(`select exists(select * from Saved where name = "${name}" and url = "${URL}" and userid = "${UserID}");`,
            (error, result, fields) => {
                var res = result[0][fields[0].name]; //get the result from the SQL command
                console.log(result);
                console.log(res);

                if (error) {
                    console.log("Error", error)
                    reject(error)
                    //wrong code probably    
                }
                if (res) {
                    console.log("Duplicate")
                    resolve(resultGen(204, 'Cannot add duplicates'))
                    //wrong code probably

                } //Duplicate exists
                //Second API call made inside a callback function bc it depends on the result
                else connection.query(`insert into Saved (Name, URL, UserID, Photo) values("${name}", "${URL}", "${UserID}", "${imageURL}");`,
                    (error, result) => {
                        resolve(resultGen(200, `added recipe ${name} with URL ${URL}`))
                        console.log(`added recipe ${name} with URL ${URL} why am I here`)
                        //getRecipe()//get the latest and send it back 
                    })
            })
    });
}

//Need some update function to write notes to recipes
//Can write notes, change the recipe name
function updateRecipeNotes(recipeID, notes) {
    return new Promise(function (resolve, reject) {
        connection.query(`update Recipe set Notes = "${notes}" where recipeid = ${recipeID}`,
            (error, result) => {
                // console.log(result);
                if (error) {
                    console.log("Error", error)
                    resolve(resultGen(204, 'Error updating'))
                }
                console.log(`Updated Recipe Notes"${notes}" where recipeid = "${recipeID}"`)
                resolve(resultGen(200, `updated notes of id ${recipeID} with ${notes}`))
            })
    })
}

function updateRecipeName(recipeID, name) {
    return new Promise(function (resolve, reject) {
        connection.query(`update Saved set Name = "${name}" where recipeid = ${recipeID}`,
            (error, result) => {
                //result is an OkPacket bc its ok
                if (error) {
                    console.log("Error", error)
                    resolve(resultGen(204, 'Error updating'))
                }
                console.log(`Updated Saved Name ${name}" where recipeid = "${recipeID}"`)
                resolve(resultGen(200, `updated name of id ${recipeID} with ${name}`))
            })
    })
}

function getAllRecipes(UserID) {
    return new Promise(function (resolve, reject) {
        connection.query(`select * from Saved where userid = "${UserID}";`,
            //connection.query(`show tables;`,
            (error, result, fields) => {
                if (error) {
                    console.log("Error", error)
                    reject(error)
                }
                else resolve(resultGen(400, result))
            })
    });
}

function deleteRecipe(ID, UserID) {
    return new Promise(function (resolve, reject) {
        connection.query(`delete from Saved where RecipeID = ${ID} and userid = "${UserID}";`,
            (error) => {
                if (error) {
                    console.log("Error", error)
                    reject(error)
                }
                else {
                    console.log(`deleted recipe with ID: ${ID}`)
                    resolve(resultGen(200, "Success")); //tentative
                }
            })
    });
}

function addUser(){}



module.exports = { addRecipe, deleteRecipe, getAllRecipes, updateRecipeNotes, updateRecipeName, resultGen };