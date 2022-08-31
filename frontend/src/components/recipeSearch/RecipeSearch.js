import { SPOONACULAR_KEY } from "@env";

export async function searchByRecipe(recipeName) {
    // async function to search for recipes by name
    let response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
            SPOONACULAR_KEY +
            "&query=" +
            recipeName +
            "&number=30",
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

export async function searchByIngredients(ingredientsString) {
    ingredientsString = ingredientsString.replace(/\s/g, "");
    const ingredientsList = ingredientsString.split(",");
    let newString = "";

    for (let i = 0; i < ingredientsList.length; i++) {
        if (i == 0) {
            newString += ingredientsList[i] + ",";
        } else if (i == ingredientsList.length - 1) {
            newString += "+" + ingredientsList[i];
        } else newString += "+" + ingredientsList[i] + ",";
    }

    let response = await fetch(
        "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
            SPOONACULAR_KEY +
            "&ingredients=" +
            newString +
            "&number=30",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    return json;
    // alert(json["result"][0].title);
}
