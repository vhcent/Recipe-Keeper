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

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const discovery = AuthSession.fetchDiscoveryAsync("https://dev-c5rtcjv8.us.auth0.com");

async function getAccessToken(){
    console.log("I'm here")
    
    const authUrl = `https://dev-c5rtcjv8.us.auth0.com/authorize?response_type=code&client_id=${auth0ClientId}&redirect_uri=${redirectUri}&scope=openid&prompt=none`;
    const response = await AuthSession.startAsync({authUrl})

    console.log(response)

    /*
    let response = await fetch(`https://dev-c5rtcjv8.us.auth0.com/authorize?response_type=code&client_id=${auth0ClientId}&redirect_uri=${redirectUri}&scope=openid&prompt=none`, {
            method: 'Get',
        })
    console.log(response.type)
    console.log(response.text())
    //console.log(response)
    let json = await response.json()
    console.log(json)
*/

    console.log("done w/ method")

   // 

/*
    https://YOUR_DOMAIN/authorize?
    response_type=code&
    client_id=YOUR_CLIENT_ID&
    redirect_uri=https://YOUR_APP/callback&
    scope=openid&
    state=abcdef
*/
}

export default function Login() {
    
    console.log(`Redirect URL: ${redirectUri}`);

    const [name, setName] = useState(null);
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
        redirectUri,
        clientId: "Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc",
        // id_token will return a JWT token
        responseType: "id_token",
        // retrieve the user's profile
        scopes: ["openid", "profile"],
        extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
        },
    },
    { authorizationEndpoint },
    );

    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    //console.log(`Redirect URL: ${redirectUri}`);

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
            // Retrieve the JWT token and decode it
            const jwtToken = result.params.id_token;
            const decoded = jwtDecode(jwtToken);

            console.log(decoded)

            const { name } = decoded;
            setName(name);

            getAccessToken();

            console.log("got access token")
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





// class Login extends React.Component {

//     constructor(props) {    
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//         }


//         redirect() {
//             auth0.webAuth
//                 .authorize({
//                     scope: 'openid profile email',
//                     audience: 'https://' + 'dev-c5rtcjv8.us.auth0.com' + '/userinfo',
//                     connection: 'Username-Password-Authentication',
//                     prompt: 'login',
//                     responseType: 'id_token',
//                     state: 'randomState',
//                     redirectUri: 'https://auth.expo.io/@jfu/auth0tests',
//                     nonce: 'randomNonce'
//                 })
//                 .then(credentials => {
//                     console.log(credentials);
//                 }).catch(error => {
//                     console.log(error);
//                 }
//             );
//         }

//     render() {
    
//         <View>
//             <Button title="Login" onPress={() => this.redirect()} />
//         </View>
//     }

// }