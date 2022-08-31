import * as StorageUtils from "../../components/StorageUtils.js";
import { API_ENDPOINT } from "@env";

export async function getGroceries(userID) {

    let userID = await StorageUtils.getStorageItem("@user_id");
    let bearerToken = await StorageUtils.getStorageItem("@bearer_token");

    let response = await fetch(
        `${API_ENDPOINT}/grocery?userID=${userID}`,
        {
            method: "Get",
            headers: { Authorization: "Bearer " + bearerToken },
            //headers: {'Authorization': 'Bearer ' + bearerToken + 'l'},
        }
    );

    let json = await response.json();
    return json;
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

    let json = await response.json();
    return json;
}
