import * as StorageUtils from "../../components/StorageUtils.js";
import { API_ENDPOINT } from "@env";

export async function getGrocery(setGroceryList) {
    
    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

   fetch(
        `${API_ENDPOINT}/grocery?userID=${userID}`,
        {
            method: "Get",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    )
    .then(async (response) => {
        let json = await response.json();
        console.log("fetch grocery success:",json)
        setGroceryList(json);
    })
    .catch((error) => {
        console.log(" Fetch grocery Error:", error);
        setGroceryList([]);
    })

    // console.log("grocery response ", response)
    // //console.log("getgrocery repo", response)
    // let json = await response.json();
    // console.log(json)
    // console.log(json[0])
    // console.log(typeof(json))
    // setGroceryList(json);
}

export async function deleteGrocery(ID) {

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(
        `${API_ENDPOINT}/grocery?ID=${ID}`,
        {
            method: "Delete",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );
    console.log("trying to delete")
    let json = await response.json();
    return json;
}


export async function addGrocery(name) {
    let userID = await StorageUtils.getStorageItem("@user_id");
    console.log(userID);

    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");
    console.log("bearer", bearerToken);

    let postBody = {
        userID: userID,
        item: name,
    };

    let response = await fetch(`${API_ENDPOINT}/grocery`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });
    // console.log("response:", response.json());
    alert("Added to Grocery List!");
}