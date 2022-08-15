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

async function apiCall(formBody){
    let response = await fetch('https://dev-c5rtcjv8.us.auth0.com/oauth/token', {
      method: 'Post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: formBody
    })
  
    let json = await response.json()
    console.log(json);
    console.log("Im here")
    let bearerToken = json.access_token;
    console.log(bearerToken)
  
    const jwtToken = json.id_token;
    const decoded = jwtDecode(jwtToken);
    console.log("the params")
    console.log(decoded)

    let APIresponse = await fetch('https://cmivyuanic.execute-api.us-west-2.amazonaws.com/tester/?all=true&id=1&userid=1', {
      method: 'Get',
      headers: {'Authorization': 'Bearer ' + bearerToken},
    })
  
    let apiJSON = await APIresponse.json()
    console.log(apiJSON);
    console.log("Im here")
  }


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

}

export default function Login() {
    
    console.log(`Redirect URL: ${redirectUri}`);

    const [name, setName] = useState(null);
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
        redirectUri,
        clientId: auth0ClientId,
        // id_token will return a JWT token
        codeChallenge: '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU',
        responseType: "code",
        usePKCE: false,
        // retrieve the user's profile
        scopes: ["openid"],
        extraParams: {
        // ideally, this will be a random value
            audience: "https://recipeauth",
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
            console.log("Made it here")
            // Retrieve the JWT token and decode it
            
            console.log(result)
            console.log(result.params.code)
            //const { name } = decoded;
            //setName(name);

            //getAccessToken();
            var details = {
                grant_type: 'authorization_code',
                client_id: 'Q1Wkc36By8FxPi2xjIQxXHyx0ldquhEc',
                client_secret: 'TAKIDhnxFBNyLX89Qa1Tr-ILuwk0c_W-6oxzP7-gdGY9ERxSqCrqfS4i76UA06xJ',
                code_verifier: 'gbGeKxPwOKT1tSFY0IOIe3dxzq98sgSY~UNO9dGO94ZgmN6Hoc1qTIkxo6F1f-2IIG8IyLuUmwLeW2IKSix-GdEbOwm85.gxk..4zUv5v81cm3nq3k_5QBZRgMurciUc', //should be irrelevant
                code: result.params.code,
                redirect_uri: 'https://auth.expo.io/@jfu/frontend'
              };
              
              console.log("Im here")
              
              var formBody = [];
              for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
              }
              formBody = formBody.join("&");
              
              console.log(formBody)
            apiCall(formBody)              

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