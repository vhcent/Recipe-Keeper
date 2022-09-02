import { SPOONACULAR_KEY } from "@env";
import * as StorageUtils from "../../components/StorageUtils.js";
import { API_ENDPOINT } from "@env";

export async function getDetails(id) {
    console.log(id);
    let response = await fetch(
        "https://api.spoonacular.com/recipes/" +
            id +
            "/information?apiKey=" +
            SPOONACULAR_KEY,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    // console.log("Recipe Details:", json); //prints out all the recipe details
    return json;
}

export async function getAllRecipes(setRecipeList) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(`${API_ENDPOINT}/recipes?userID=${userID}`, {
        method: "Get",
        headers: { Authorization: "Bearer " + bearerToken },
        //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
    });

    let json = await response.json();
    console.log(json);
    setRecipeList(json);
    return json;
}

export async function deleteRecipe(ID) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(`${API_ENDPOINT}/recipes?ID=${ID}`, {
        method: "Delete",
        headers: { Authorization: "Bearer " + bearerToken },
        //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
    });

    let json = await response.json();
    return json;
}

export async function modifyNotes(ID, Notes) {
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let postBody = {
        notes: Notes,
    };

    let response = await fetch(
        `${API_ENDPOINT}/recipes?ID=${ID}`, //${API_ENDPOINT}/recipes`,
        {
            method: "Patch",
            headers: {
                Authorization: "Bearer " + bearerToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody),
        }
    );
}
