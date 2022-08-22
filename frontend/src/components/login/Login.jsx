import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert  } from "react-native";
import styles from "./Styles";
import Auth0 from 'react-native-auth0';
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.err("Unable to store item")
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
    
    console.log(`Redirect URL: ${redirectUri}`); //print redirect URL, used for getting the URL to register with auth0

    const [name, setName] = useState(null); //no more need for name since login occurs without it
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

    return (
    <View style={styles.container}>
        {name ? (
        <>
            <Text style={styles.title}>You are logged in, {name}!</Text>
            <Button title="Log out" onPress={() => setName(null)} />
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