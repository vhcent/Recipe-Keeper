import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import styles from "./Styles";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../AppContextProvider.jsx";
import { oauthFlow, logout } from "./Auth.js";
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
} from "@env";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const discovery = AuthSession.fetchDiscoveryAsync(AUTH0_DOMAIN);

export default function Login() {
  console.log(`Redirect URL: ${redirectUri}`); //print redirect URL, used for getting the URL to register with auth0

  const [loggedIn, setLoggedIn] = useContext(AppContext); //no more need for name since login occurs without it

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
          <Button
            title="Log out"
            onPress={() => {
              logout(setLoggedIn);
            }}
          />
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
