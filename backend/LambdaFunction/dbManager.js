const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "recipe-app-database.cf2uy9dcit2e.us-west-1.rds.amazonaws.com",
    user: "hcent",
    password: "BananaBlast118!",
    port: "3306",
    database: "recipe_app",
});

connection.connect((err) => {
    if (err) throw err;
    else console.log("Connected!");
});

function resultGen(status, MSG) {
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
}

function getAll() {
    return new Promise(function (resolve, reject) {
        connection.query(
            `select * from Recipe`,
            (err, result, fields) => {
                if (err) {
                    console.log("Error", err);
                    reject(resultGen(204, "Recipe not found"));
                }
                resolve(resultGen(400, result));
            }
        );
    });
}

function addRecipe(name, URL, UserID) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `select exists(select * from Recipe where name = "${name}" and url = "${URL}" and userid = "${UserID}");`,
            (err, result, fields) => {
                var res = result[0][fields[0].name]; //get the result from the SQL command
                console.log(result);
                console.log(res);

<<<<<<< Updated upstream
                if (err) {
                    console.log("Error", err);
                    resolve(resultGen(204, "Something went wrong"));
                    //wrong code probably
                }
                if (res) {
                    console.log("Duplicate");
                    resolve(resultGen(204, "Cannot add duplicates"));
                } //Duplicate exists
                //Second API call made inside a callback function bc it depends on the result
                else
                    connection.query(
                        `insert into Recipe (Name, URL, UserID) values("${name}", "${URL}", "${UserID}");`,
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(
                                resultGen(
                                    200,
                                    `added recipe ${name} with URL ${URL}`
                                )
                            );
                            console.log(
                                `added recipe ${name} with URL ${URL} why am I here`
                            );
                        }
                    );
            }
        );
    });
}

async function deleteRecipe(ID) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `delete from Recipe where recipeid = ${ID};`,
            (error, result, fields) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
    });
=======
//Updated This
function getAll(UserID){
    return new Promise(function(resolve, reject){
        connection.query(`select * from Recipe where userid = "${UserID}";`,
        //connection.query(`show tables;`,
        (err, result, fields) =>  {
            if(err){ 
                console.log("Error", err)
                resolve(resultGen(204, 'Recipe list not found'))
            }
            else resolve(resultGen(400, result))
        })
    });
}

function deleteRecipe(ID, UserID){
    return new Promise(function(resolve, reject){
        connection.query(`delete from Recipe where RecipeID = ${ID} and userid = "${UserID}";`,
        (err) =>  { 
            if(err){ 
                console.log("Error", err)
                resolve(resultGen(204, 'Cannot delete'))
            }
            else{
                console.log(`deleted recipe with ID: ${ID}`)
                resolve(resultGen(200, "Success")); //tentative
            }
        })
    });
}

function resultGen(status, MSG){
    return {
        statusCode: status,
        body: JSON.stringify(MSG),
    };
>>>>>>> Stashed changes
}

module.exports = { getAll, addRecipe, deleteRecipe };
