import { recipes } from "../Data/recipes.js";

// c'est une variable qui stocke une copie de la liste de recettes initiales.
export let filteredRecipes = recipes.slice();                   

// Fonction qui récupére la liste des recettes filtrées et la renvoi à nouveau
export function getFilteredRecipes() {
	return filteredRecipes;
}

// Fonction qui renvoie la liste des recettes filtrées stockées dans la variable filteredRecipes.
export function setFilteredRecipes(recipes) {                   
	filteredRecipes = recipes;
}

