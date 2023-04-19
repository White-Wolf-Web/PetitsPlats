import { recipes } from "../Data/recipes.js";


export let filteredRecipes = recipes.slice();                   // c'est une variable qui stocke une copie de la liste de recettes initiales.

export function getFilteredRecipes() {
	return filteredRecipes;
}
export function setFilteredRecipes(recipes) {                   // Fonction renvoie la liste des recettes filtrées stockées dans la variable filteredRecipes.
	filteredRecipes = recipes;
}

