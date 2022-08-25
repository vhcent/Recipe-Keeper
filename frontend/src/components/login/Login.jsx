import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert  } from "react-native";
import styles from "./Styles";
import Auth0 from 'react-native-auth0';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import CookieManager from '@react-native-cookies/cookies'
//import RCTNetworking from 'RCTNetworking';
var RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
//import Cookies from 'universal-cookie';


var credentials = require('./auth0-configuration.js');
const auth0 = new Auth0(credentials);
const auth0Domain = "https://dev-c5rtcjv8.us.auth0.com";
//const authorizationEndpoint = "https://dev-c5rtcjv8.us.auth0.com/authorize";
const auth0ClientId = "Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc";
const auth0ClientSecret = "TAKIDhnxFBNyLX89Qa1Tr-ILuwk0c_W-6oxzP7-gdGY9ERxSqCrqfS4i76UA06xJ";
const auth0Audience = "https://recipeauth";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const discovery = AuthSession.fetchDiscoveryAsync(auth0Domain);

async function getStorageItem(itemName) {
    try {
      const value = await AsyncStorage.getItem(itemName)
      if(value !== null) {
        return value;
      }
      else return null;
    } catch(e) {
        console.log("Unable to retrieve item ", itemName)
        return null;
      // error reading value
    }
  }

async function storeItem(itemName, value){
    try {
      await AsyncStorage.setItem(itemName, value)
    } catch (e) {
      console.log("Unable to store item")
    }
  }

async function oauthFlow(formBody){
    let response = await fetch(`${auth0Domain}/oauth/token`, {
      method: 'Post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: formBody
    })
  
    let json = await response.json()
    //console.log("OAuth/Token authorization: ");
    //console.log(json)
    
    let bearerToken = json.access_token;
    console.log("Bearer token:" + bearerToken)
    storeItem("@bearer_token", bearerToken)

    let decoded = jwtDecode(json.id_token);
    //console.log("ID Token: ")
    //console.log(decoded)
    console.log("User ID:" + decoded.sub)
    storeItem("@user_id", decoded.sub)
/*
    let value = await getStorageItem('@user_id')
    console.log(value)

    //Optional tester API Call
    let APIresponse = await fetch(`https://cmivyuanic.execute-api.us-west-2.amazonaws.com/recipeApp/recipes?userID=${decoded.sub}`, {
      method: 'Get',
      headers: {'Authorization': 'Bearer ' + bearerToken},
    })
  
    let apiJSON = await APIresponse.json()
    console.log("Mock API Call result: ");
    console.log(apiJSON)
    */
  }

export default function Login() {
    
  //logout does not work because cookies are stored in the browser, cannot clear cookies because the default cookie package
  //is not supported for expo specifically, and alternative rctnetworking does not work either because this package is not
  //downloaded
  async function logout(){
    setLoggedIn(null);
/*
    var details = {
      redirectUri,
        clientId: auth0ClientId,
        responseType: "code", //Get a code to call the oauth/token endpoint
        usePKCE: false,
        scopes: ["openid"]
  };       
  var formBody = [];
  for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  let returnTo = "https://dev-c5rtcjv8.us.auth0.com/authorize?"+formBody;

    await WebBrowser.openBrowserAsync(`https://dev-c5rtcjv8.us.auth0.com/v2/logout?client_id=Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc&returnTo=${returnTo}`);
 */
 
    /* CookieManager.clearAll(true).then((succcess) => {
      console.log('CookieManager.clearAll from webkit-view =>', succcess);
    });
    */

    //RCTNetworking.clearCookies();

    await WebBrowser.openBrowserAsync(`https://dev-c5rtcjv8.us.auth0.com/v2/logout?client_id=Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc&`);

    RCTNetworking.clearCookies((cleared) => {
      console.log(cleared);
      //this.setStatus('Cookies cleared, had cookies=' + cleared);
  });

    /*
    const cookies = new Cookies();
    console.log(cookies.getAll())
    */

    /*Auth0.webAuth.clearSession().then(res => {
      console.log("clear session ok");
    })
    .catch(err => {
      console.log("error clearing session: ", err);
    });*/
    
    console.log("I'm here");
  }

    console.log(`Redirect URL: ${redirectUri}`); //print redirect URL, used for getting the URL to register with auth0

    const [loggedIn, setLoggedIn] = useState(null); //no more need for name since login occurs without it
    let authorizationEndpoint = `${auth0Domain}/authorize`;
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
        redirectUri,
        clientId: auth0ClientId,
        responseType: "code", //Get a code to call the oauth/token endpoint
        usePKCE: false,
        scopes: ["openid"],
        extraParams: {
            audience: auth0Audience,
        },
    },
    { authorizationEndpoint },
    );

    useEffect(() => {
    if (result) {
        if (result.error) {
        Alert.alert(
            "Authentication error",
            result.params.error_description || "something went wrong"
        );
        return;
        }
        if (result.type === "success") {
            setLoggedIn(true);
            console.log("Authentication code result: ")
            console.log(result)
            console.log("Authentication code: " + result.params.code)
  
            //Generate oauth/token request body
            var details = {
                grant_type: 'authorization_code',
                client_id: auth0ClientId,
                client_secret: auth0ClientSecret,
                code: result.params.code,
                redirect_uri: redirectUri
            };       
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            //parse into query string then call
            oauthFlow(formBody)              
        }
    }
    }, [result]);
    //WebBrowser.openAuthSessionAsync
    return (
    <View style={styles.container}>
        {loggedIn ? (
        <>
            <Text style={styles.title}>You are logged in!</Text>
            <Button title="Log out" onPress={
              /*() => {
              setLoggedIn(null);
              console.log("I'm here");
              
            }*/
            logout} />
        </>
        ) : (
        <Button
            disabled={!request}
            title="Log in with Auth0"
            onPress={() => promptAsync({ useProxy })}
        />
        )}
    </View>
    );
}