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
                else connection.query(`insert into Saved (Name, URL, UserID, Photo, RecipeID) values("${name}", "${URL}", "${userID}", "${photo}", ${recipeID});`,
                    (error, result) => {
                        if (error) {
                            console.log("Error", error)
                            reject(error)
                            //wrong code probably    
                        }
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

function getAllRecipes(userID) {
    return new Promise(function (resolve, reject) {
        connection.query(`select * from Saved where UserID = "${userID}";`,
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
    /*
    let query = "";
    for(let i = 0 ; i < recipeIDList.length - 1; i++){
        query = query + recipeIDList[i] + ",";
    }
    query = query + recipeIDList[recipeIDList.length - 1];
    console.log(query);
*/
   
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT RecipeID FROM Saved WHERE RecipeID IN (${recipeIDList}) AND UserID = "${userID}";`, 
            (error, result) => {
                if (error) {
                    console.log("Error", error)
                    reject(error)
                }
                else { 
                    resolve(resultGen(400, result)); //tentative
                }
            });
        });
    }

// Grocery Table Functions
function getGrocery(userID) { 
    return new Promise(function(resolve, reject) {
    connection.query(`select * from Grocery where UserID = "${userID}";`,
        (error, result) => {
            if (error) {
                console.log("Error", error);
                reject(error);
            }
            else { 
                resolve(resultGen(400, result)); //tentative
            }
        });
    });
}

function addGrocery(userID, item) {
    return new Promise(function (resolve, reject) { 
        connection.query(`insert into Grocery (Item, UserID) values("${item}", "${userID}");`,
            (error) => {
                if (error) {
                    console.log("Error", error);
                    reject(error);
                }
                else {
                    console.log(`added item with name: ${item}`);
                    resolve(resultGen(200, "Success")); //tentative
                }
            });
    });
}

function deleteGrocery(ID) {
    return new Promise(function (resolve, reject) { 
        connection.query(`delete from Grocery where ID = ${ID};`,
            (error) => {
                if (error) {
                    console.log("Error", error)
                    reject(error)
                }
                else {
                    console.log(`deleted grocery with ID: ${ID}`)
                    resolve(resultGen(200, "Success")); //tentative
                }
            })
    });
}

// Recent Table Functions
function getRecent(userID) {
    return new Promise(function(resolve, reject) {
        connection.query(`Select * from Recent where UserID = "${userID}";`,
        (error, result) => {
            if (error) {
                console.log("Error", error);
                reject(error);
            }
            else {
                console.log(`selected recents from userID: "${userID}"`);
                resolve(resultGen(400, result));
            }
        })
    })
}

function updateRecent(name, URL, userID, photo, recipeID) {
    return new Promise(function(resolve, reject) {
        connection.query(`select exists(select * from Recent where RecipeID = "${recipeID}" and UserID = "${userID}");`,
            (error, result, fields) => {
                let res = result[0][fields[0].name]; //get the result from the SQL command
                console.log(result);
                console.log(res);

                if (error) {
                    console.log("Error", error)
                    reject(error)
                    //wrong code probably    
                }
                if (res) {
                    connection.query(`Select Position from Recent WHERE RecipeID = ${recipeID} and UserID = "${userID}";`,
                    (error, result) => {
                        console.log("RESULlT:", result);
                        
                        let posTop = result[0]["Position"]
                        console.log(result[0]);
                        console.log(posTop);
                        if (error) {
                            console.log("Error", error);
                            reject(error);
                        }
                        else {
                            connection.query(`UPDATE Recent SET Position = Position + 1 WHERE UserID = "${userID}" AND Position < ${posTop};`,
                            (error, result) => {
                                if (error) {
                                    console.log("Error", error);
                                    reject(error);
                                }
                                console.log("Shifted positions by 1")
                                connection.query(`Update Recent set Position = 1 where UserID = "${userID}" and RecipeID = ${recipeID};`,
                                (error, result) => {
                                    console.log("Set the new top")
                                    if (error) {
                                        console.log("Error", error);
                                        reject(error);
                                    }
                                    else {
                                        resolve(resultGen(200, `Successfully updated the recents`));
                                    }
                                
                                })
                            })
                        }
                    })
                    
                }
                //Second API call made inside a callback function bc it depends on the result
                else{
                    connection.query(`UPDATE Recent SET Position = Position + 1 WHERE UserID = "${userID}";`,
                    (error, result) => {
                        if (error) {
                            console.log("Error", error);
                            reject(error);
                        }
                        else {
                            connection.query(`insert into Recent (Name, URL, UserID, Photo, RecipeID, Position) values("${name}", "${URL}", "${userID}", "${photo}", ${recipeID}, 1);`,
                                (error, result) => {
                                    console.log("Inserted Into");
                                    if (error) {
                                        console.log("Error", error);
                                        reject(error);
                                    }
                                    else {
                                        connection.query(`Select Max(Position) FROM Recent WHERE UserID = "${userID}";`,
                                            (error, result, fields) => {
                                                console.log("Selected Max");
                                                if (error) {
                                                    console.log("Error", error);
                                                    reject(error);
                                                }
                                                else {
                                                    let max = result[0][fields[0].name];;
                                                    console.log("Comparing to Max:", max);
                                                    if(max > process.env.RECENT_MAX){
                                                        connection.query(`DELETE From Recent WHERE UserID = "${userID}" AND Position > ${process.env.RECENT_MAX};`,
                                                            (error, result) => {
                                                                console.log("Delete from Recent");
                                                                if(error){
                                                                    console.log("Error", error);
                                                                    reject(error);
                                                                }
                                                                else{
                                                                     resolve(resultGen(200, "Updated recents, max recents reached"))
                                                                }
                                                            }
                                                        )
                                                    }
                                                    else{
                                                        console.log("should send back 200");
                                                        resolve(resultGen(200, "Updated recents before max recents reached"))
                                                    }
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    })
                }
            })       
    })
}
                        // UPDATE Recent SET Position = Position - 1 WHERE userID = "${userID}";
                        // insert into Recent (Name, URL, UserID, Photo, RecipeID, Position) values("${name}", "${URL}", "${UserID}", "${photo}", ${recipeID}, 1);
//              // Select Max(Position) FROM Recent WHERE UserID = "${userID}"
// if max == process.env.RECENT_MAX + 1: 
                        // DELETE From Recent WHERE userID = "${userID}" AND Position = ${process.env.RECENT_MAX}

module.exports = { addRecipe, deleteRecipe, getAllRecipes, updateRecipeNotes,
                checkDuplicates, getGrocery, addGrocery, deleteGrocery, 
                getRecent, updateRecent, resultGen };