import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert  } from "react-native";
import styles from "./Styles";
import Auth0 from 'react-native-auth0';
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";

var credentials = require('./auth0-configuration.js');
const auth0 = new Auth0(credentials);
const authorizationEndpoint = "https://dev-c5rtcjv8.us.auth0.com/authorize";
const auth0ClientId = "Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc";
const auth0ClientSecret = "TAKIDhnxFBNyLX89Qa1Tr-ILuwk0c_W-6oxzP7-gdGY9ERxSqCrqfS4i76UA06xJ";
const auth0Audience = "https://recipeauth";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const discovery = AuthSession.fetchDiscoveryAsync("https://dev-c5rtcjv8.us.auth0.com");

async function apiCall(formBody){
    let response = await fetch('https://dev-c5rtcjv8.us.auth0.com/oauth/token', {
      method: 'Post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: formBody
    })
  
    let json = await response.json()
    console.log("OAuth/Token authorization: ");
    console.log(json)
    
    let bearerToken = json.access_token;
    console.log("Bearer token:" + bearerToken)
  
    let decoded = jwtDecode(json.id_token);
    console.log("ID Token: ")
    console.log(decoded)

    //Optional tester API Call
    let APIresponse = await fetch('https://cmivyuanic.execute-api.us-west-2.amazonaws.com/tester/?all=true&id=1&userid=1', {
      method: 'Get',
      headers: {'Authorization': 'Bearer ' + bearerToken},
    })
  
    let apiJSON = await APIresponse.json()
    console.log("Mock API Call result: ");
    console.log(apiJSON)
  }

export default function Login() {
    
    console.log(`Redirect URL: ${redirectUri}`); //print redirect URL, used for getting the URL to register with auth0

    const [name, setName] = useState(null); //no more need for name since login occurs without it
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
            apiCall(formBody)              
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