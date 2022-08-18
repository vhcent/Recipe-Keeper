const mysql = require('mysql');

// Make connection to MySQL recipes database
var connection = mysql.createConnection({
    host: process.env.RDS_HOST_NAME,
    user: process.env.RDS_USER,
    password: process.env.RDS_PSWRD,
    port: "3306",
    database: process.env.RDS_DB,
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

// Saved Table Functions
function addRecipe(name, URL, userID, photo, recipeID) {
    return new Promise(function (resolve, reject) {
        connection.query(`select exists(select * from Saved where RecipeID = "${recipeID}" and UserID = "${userID}");`,
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
                else connection.query(`insert into Saved (Name, URL, UserID, Photo, RecipeID) values("${name}", "${URL}", "${UserID}", "${photo}", ${recipeID});`,
                    (error, result) => {
                        resolve(resultGen(200, `added recipe ${name} with URL ${URL} and recipeID "${recipeID}"`))
                        console.log(`added recipe ${name} with URL ${URL} why am I here`)
                        //getRecipe()//get the latest and send it back 
                    })
            })
    });
}

//Need some update function to write notes to recipes
//Can write notes, change the recipe name
function updateRecipeNotes(ID, notes) {
    return new Promise(function (resolve, reject) {
        connection.query(`update Saved set Notes = "${notes}" where ID = ${ID}`,
            (error, result) => { 
                // console.log(result);
                if (error) {
                    console.log("Error", error)
                    resolve(resultGen(204, 'Error updating'))
                }
                console.log(`Updated Recipe Notes"${notes}" where id = "${ID}"`)
                resolve(resultGen(200, `updated notes of id ${ID} with ${notes}`))
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

function deleteRecipe(ID) {
    return new Promise(function (resolve, reject) { 
        connection.query(`delete from Saved where ID = ${ID};`,
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

function checkDuplicates(userID, recipeIDList) {
    let query = "";
    for(int i = 0 ; i < recipeList.length - 1; i++){
        query = query + recipeList[i] + ",";
    }
    query = query + recipeList[recipeList.length - 1];
    console.log(query);

   
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT RecipeID FROM Saved WHERE RecipeID IN (${query}) AND UserID = "${userID}";`, 
            (error, result) => {
                if (error) {
                    console.log("Error", error)
                    reject(error)
                }
                else { 
                    console.log(` recipe with ID: ${ID}`)
                    resolve(resultGen(400, result)); //tentative
                }
            })
        });
    }

    // Grocery Table Functions
    function getGrocery(userID) { function(resolve, reject) {
        connection.query(`select Item from Grocery where UserID = "${userID}";`,
        (error, result) => {
            if (error) {
                console.log("Error", error);
                reject(error);
            }
            else { 
                resolve(resultGen(400, result)); //tentative
            }
        })
    }
    }

    function addGrocery(userID, )

module.exports = { addRecipe, deleteRecipe, getAllRecipes, updateRecipeNotes, updateRecipeName, checkDuplicates, resultGen };