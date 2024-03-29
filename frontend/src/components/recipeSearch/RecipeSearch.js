import { SPOONACULAR_KEY, API_ENDPOINT } from "@env";
import * as StorageUtils from "../../components/StorageUtils.js";

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
    console.log("spoonacular", json.results);
    return json.results;
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
}


export async function getRecents(){
    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log(bearerToken);

    let response = await fetch(
        `${API_ENDPOINT}/recent?userID=${userID}`,
        {
            method: "Get",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );

    let json = await response.json();
    console.log("recents ", json)

    
    
    return json;
}
