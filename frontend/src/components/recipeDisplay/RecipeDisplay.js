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

export async function getDuplicates(recipeIDString) {
    // recipeIDString += ",111111";
    console.log("Recipe ID String:", recipeIDString);
    console.log(typeof recipeIDString);
    console.log(recipeIDString);

    let userID = await StorageUtils.getStorageItem('@user_id')
    console.log(userID)
  
    let bearerToken = await StorageUtils.getStorageItem('@bearer_token')
    console.log(userID)
    
    let response = await fetch(`${API_ENDPOINT}/checkSaved?userID=${userID}&IDs=${recipeIDString}`, {
        method: 'Get',
        headers: {'Authorization': 'Bearer ' + bearerToken},
        //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
    })

    let json = await response.json();
    console.log("Duplicate List:", json); //prints out all the recipe details
    return json;
}

// Steps for generating the red heart
// 1) Call the getDuplicates method to get duplicates recipes
// 2) Go through the isSaved list and set appropriate recipes to true
// 3) Generate the UI view and the red/grey hearts based on isSaved list

// Upon saving
// 1) Call the saveRecipe function to store in the backend
// 2) saveRecipe function will update the boolean in isSaved list to true
// 3) Regenerate the UI view with extra red heart

//1) Saves the recipe to the saved recipes table
//2) Update one red heart 

export async function unsaveRecipe(recipeID){
    let userID = await StorageUtils.getStorageItem('@user_id');
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem('@bearer_token');
    console.log(userID);

    fetch(`${API_ENDPOINT}/recipes?userID=${userID}&ID=${recipeID}`, {
        method: 'Delete',
        headers: {'Authorization': 'Bearer ' + bearerToken},
        //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
    }).then(console.log("successful delete"))
    .catch((err) => {console.log(err)})

}

export async function saveRecipe(recipeID, photo, url, title) {
    //set the red heart boolean to true
    let userID = await StorageUtils.getStorageItem('@user_id');
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem('@bearer_token');
    console.log(userID);

    let postBody = {
        userID: userID,
        recipeID: recipeID,
        photo: photo,
        url: url,
        title: title
    }

    console.log("user id", userID);

    let response = await fetch(`${API_ENDPOINT}/recipes?`,
        {
            method: "POST",
            headers: {'Authorization': 'Bearer ' + bearerToken},
            body: JSON.stringify(postBody)
        }
    );
    
    console.log("saveRecipeCalled: ", response.json());
   // let savedList[recipeId]
    
    //updateRecipeSaved(recideDisplayIndex);
}