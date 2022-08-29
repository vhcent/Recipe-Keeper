import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import styles from "./Styles";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppContext} from "../AppContextProvider.jsx";
import * as StorageUtils from "../StorageUtils.js";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE} from "@env";

var RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const discovery = AuthSession.fetchDiscoveryAsync(AUTH0_DOMAIN);

async function oauthFlow(details) {
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
    StorageUtils.storeItem("@bearer_token", bearerToken);

    let decoded = jwtDecode(json.id_token);
    console.log("User ID:" + decoded.sub);
    StorageUtils.storeItem("@user_id", decoded.sub);
}

export default function Login() {

  //logout does not work on IOS because cookies are stored in the browser, cannot clear cookies because the default cookie package
  //is not supported for expo specifically, and alternative rctnetworking does not work either because this package is not
  //downloaded
  async function logout(){
    await WebBrowser.openBrowserAsync(`${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&`);
    RCTNetworking.clearCookies((cleared) => {
      console.log("Cleared cookies status " + cleared);
        //this.setStatus('Cookies cleared, had cookies=' + cleared);
    });
    setLoggedIn(null);
    StorageUtils.removeItem("@user_id")
    StorageUtils.removeItem("@bearer_token")
  }

    console.log(`Redirect URL: ${redirectUri}`); //print redirect URL, used for getting the URL to register with auth0

    const [loggedIn, setLoggedIn] = useContext(AppContext) //no more need for name since login occurs without it
    
    let authorizationEndpoint = `${AUTH0_DOMAIN}/authorize`;
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: AUTH0_CLIENT_ID,
            responseType: "code", //Get a code to call the oauth/token endpoint
            usePKCE: false,
            scopes: ["openid"],
            extraParams: {
                audience: AUTH0_AUDIENCE,
            },
        },
        { authorizationEndpoint }
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
                console.log("Authentication code result: ");
                console.log(result);
                console.log("Authentication code: " + result.params.code);

                //Generate oauth/token request body
                var details = {
                    grant_type: "authorization_code",
                    client_id: AUTH0_CLIENT_ID,
                    client_secret: AUTH0_CLIENT_SECRET,
                    code: result.params.code,
                    redirect_uri: redirectUri,
                };
                oauthFlow(details);
            }
        }
    }, [result]);
    //WebBrowser.openAuthSessionAsync
    return (
      <View style={styles.container}>
          {loggedIn ? (
              <>
                  <Text style={styles.title}>You are logged in!</Text>
                  <Button title="Log out" onPress={logout} />
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
/*
{loggedIn ? (
        <>
            <Text style={styles.title}>You are logged in!</Text>
            <Button title="Log out" onPress={logout} />
        </>
        ) : (
        <Button
            disabled={!request}
            title="Log in with Auth0"
            onPress={() => promptAsync({ useProxy })}
        />
        )}*/