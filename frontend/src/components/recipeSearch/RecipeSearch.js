import { SPOONACULAR_KEY } from "@env";

export async function searchRecipe(recipeName) {
    // async function to search for recipes by name
    let response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
            SPOONACULAR_KEY +
            "&query=" +
            recipeName +
            "&number=30",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    // console.log(json.results); //prints out all the recipes
    return json.results;
    // alert(json["result"][0].title);
}
