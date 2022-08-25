export async function searchRecipe(recipeName) {
    // async function to search for recipes by name
    let response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=8d51cf1e41ad42fcb9c2699fbba2cfbd&query=" +
            recipeName +
            "&number=50",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    let json = await response.json();
    console.log(json.results); //prints out all the recipes
    return json.results;
    // alert(json["result"][0].title);
}
