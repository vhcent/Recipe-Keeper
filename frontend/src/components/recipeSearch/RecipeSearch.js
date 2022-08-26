export async function searchRecipe(recipeName) {
    // async function to search for recipes by name
    let response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=8d51cf1e41ad42fcb9c2699fbba2cfbd&query=" +
            recipeName +
            "&number=20",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    // console.log(json.results); //prints out all the recipes
    return json.results;
    // alert(json["result"][0].title);
}

export async function getDetails(recipeList) {
    console.log("HERE");
    let idString = "";
    for (let i = 0; i < recipeList.length; i++) {
        idString += recipeList[i].id + ",";
    }
    idString = idString.slice(0, -1);
    console.log(idString);

    // Information Bulk API Call
    let response = await fetch(
        "https://api.spoonacular.com/recipes/informationBulk?apiKey=8d51cf1e41ad42fcb9c2699fbba2cfbd&ids=" +
            idString,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    console.log(json[0].id);
    return json;
}
