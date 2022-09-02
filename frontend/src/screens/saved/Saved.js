import * as StorageUtils from "../../components/StorageUtils.js";
import { API_ENDPOINT } from "@env";

export async function getAllRecipes(setRecipeList) {

    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(
        `${API_ENDPOINT}/recipes?userID=${userID}`,
        {
            method: "Get",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );

    let json = await response.json();
    console.log(json)
    setRecipeList(json)
    return json;
}

export async function deleteRecipe(ID) {

    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(
        `${API_ENDPOINT}/recipes?ID=${ID}`,
        {
            method: "Delete",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );

    let json = await response.json();
    return json;
}


export async function modifyNotes(ID, Notes) {
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let postBody = {
        Notes: Notes
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
