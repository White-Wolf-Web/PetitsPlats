import { recipes } from "../Data/recipes.js";
import { updateAndDisplayFilteredRecipes } from "./updateAndDisplayFilteredRecipes.js";
import { handleListClick } from "./handleListClick.js";
import { filterRecipes } from "./filterRecipesByFilterAndMap.js";
//import { filterRecipes } from "./filterRecipesByLoopFor.js";


/**
 * La fonction met en place des eventListener pour une entrée de recherche et un conteneur d'étiquettes,
 * appelle la fonction filterRecipes lorsque c'est nécessaire.
 * @param recipes 
 * La fonction "searchAndFilter" est conçue pour permettre à l'utilisateur de rechercher et de filtrer ces recettes en fonction de certains critères
 * tel que des mots Clés ou des tags. 
 * La fonction met en place  des eventListener pour les entrées et les clics
 */
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