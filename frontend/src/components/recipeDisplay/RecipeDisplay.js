import { SPOONACULAR_KEY } from "@env";

export async function getDetails(id) {
    console.log(id);
    let response = await fetch(
        "https://api.spoonacular.com/recipes/" +
            id +
            "/information?apiKey=" +
            SPOONACULAR_KEY,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    // console.log("Recipe Details:", json); //prints out all the recipe details
    return json;
}

export async function getDuplicates(userID, recipeIDString) {
    recipeIDString += ",111111";
    console.log("Recipe ID String:", recipeIDString);
    console.log(typeof recipeIDString);
    console.log(recipeIDString);
    let response = await fetch(
        "https://cmivyuanic.execute-api.us-west-2.amazonaws.com/tentative/checkSaved?userID=auth0|62dedd66ea483987422d888c&IDs=111111,123123,555555,888888",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpOT2JMWVlpNjRCbXRxUUc2Q3BQSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jNXJ0Y2p2OC51cy5hdXRoMC5jb20vIiwic3ViIjoibG42a2JvMVNVZ3J4bHVaRUNaZEVTOGpGRkxIS2tPWDlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlYXV0aCIsImlhdCI6MTY2MTI5ODM5NCwiZXhwIjoxNjYxMzg0Nzk0LCJhenAiOiJsbjZrYm8xU1VncnhsdVpFQ1pkRVM4akZGTEhLa09YOSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.PL4mIpG8H8zlfiyd8ZqHjwUFabA8qr-ed0JaPTAmyi1rgt5EwCwAhchAFte-uJgoS3Zjs67_oD74iaYDNB2EAcP0wmb_SXBIaXJhhXw4Ie0-nuxAU9k06tYeJxsKhdfTfl9ug_wGPz-0mgYlf92HXGhlea28bqo8dIw6p8jn8v5o6e3j8_om0gRx6zKlRA9zFYnzMd533QQFW2WvfQw-4zdzgVcIyz0putuT_4qlp6yjGBgeM1m-MPxfbWPKHZWLQ0PzTdYLLRykzgdWhAVL4Ftm4oGMHv4J3bhzLb6Yq65izf5nX7IiOoNiJUDC5wgi0vXKeSkfyPPoJNhXLGcK2A",
            },
        }
    );
    let json = await response.json();
    console.log("Duplicate List:", json); //prints out all the recipe details
    return json;
}
