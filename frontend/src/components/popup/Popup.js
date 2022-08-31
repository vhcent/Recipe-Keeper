import * as StorageUtils from "../../components/StorageUtils.js";
import { API_ENDPOINT } from "@env";

export async function getDuplicates(recipeIDString) {
    console.log(recipeIDString);

    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log(bearerToken);

    let response = await fetch(
        `${API_ENDPOINT}/checkSaved?userID=${userID}&IDs=${recipeIDString}`,
        {
            method: "Get",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );

    let json = await response.json();
    return json;
}

export async function unsaveRecipe(recipeID) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log(userID);

    fetch(`${API_ENDPOINT}/recipes?userID=${userID}&ID=${recipeID}`, {
        method: "Delete",
        headers: {
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
        },
        //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
    })
        .then(console.log("successful delete"))
        .catch((err) => {
            console.log(err);
        });
}

export async function saveRecipe(recipeID, photo, url, title) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log("bearer", bearerToken);

    let postBody = {
        userID: userID,
        recipeID: recipeID,
        photo: photo,
        url: url,
        name: title,
    };

    let response = await fetch(`${API_ENDPOINT}/recipes`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });

    console.log("saveRecipeCalled: ", response.json());
}

export async function addGrocery(name) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log("bearer", bearerToken);

    let postBody = {
        userID: userID,
        name: name,
    };

    let response = await fetch(`${API_ENDPOINT}/grocery`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });
    console.log("response:", response);
    alert("Grocery added successfully");
}
