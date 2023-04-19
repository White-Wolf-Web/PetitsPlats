import { recipes } from "../Data/recipes.js";
import { updateAndDisplayFilteredRecipes } from "./updateAndDisplayFilteredRecipes.js";
import { handleListClick } from "./handleListClick.js";
//import { filterRecipes } from "./filterRecipesByFilterAndMap.js";
import { filterRecipes } from "./filterRecipesByLoopFor.js";


export function searchAndFilter(recipes) {
	const searchInput = document.getElementById("search-input");
	searchInput.addEventListener("input", filterRecipes);

	const tagContainer = document.getElementById("tags");
	tagContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("allTags")) {           // Si l'élément cliqué a la classe "allTags", appelle la fonction filterRecipes
			filterRecipes();
		}
	});
}
searchAndFilter(recipes);
updateAndDisplayFilteredRecipes([]);                            // Appelle la fonction updateAndD... avec un tableau vide en paramètre

document.getElementById("ingredientsList").addEventListener("click", handleListClick);
document.getElementById("applianceList").addEventListener("click", handleListClick);
document.getElementById("ustensilList").addEventListener("click", handleListClick);