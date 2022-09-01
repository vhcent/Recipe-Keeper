import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StorageUtils from "../StorageUtils.js";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE} from "@env";
var RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");


  //logout does not work on IOS because cookies are stored in the browser, cannot clear cookies because the default cookie package
  //is not supported for expo specifically, and alternative rctnetworking does not work either because this package is not
  //downloaded
async function logout(setLoggedInState){
    await WebBrowser.openBrowserAsync(`${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&`);
    RCTNetworking.clearCookies((cleared) => {
      console.log("Cleared cookies status " + cleared);
        //this.setStatus('Cookies cleared, had cookies=' + cleared);
    });
    
    await StorageUtils.removeItem("@user_id")
    await StorageUtils.removeItem("@bearer_token")
    setLoggedInState(null);
}

async function oauthFlow(details, setLoggedIn) {
    //parse into query string then call
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
        method: "Post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: formBody,
    });

    let json = await response.json();

    let bearerToken = json.access_token;
    console.log("Bearer token:" + bearerToken);
    await StorageUtils.storeItem("@bearer_token", bearerToken);

    let decoded = jwtDecode(json.id_token);
    console.log("User ID:" + decoded.sub);
    await StorageUtils.storeItem("@user_id", decoded.sub);
}

module.exports = {
    oauthFlow,
    logout
}