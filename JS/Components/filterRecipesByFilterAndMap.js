import { recipes } from "../Data/recipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { setFilteredRecipes} from "./filteredRecipes.js";

export function filterRecipes() {
	const searchInput = document.getElementById("search-input");
	const searchTerm = searchInput.value.toLowerCase().trim();
	const tagContainer = document.getElementById("tags");
  // renvoi directement aux enfants de de TagContainer = les Tags; 
	const selectedTags = Array.from(tagContainer.children).map((tagElement) => tagElement.textContent.trim());

	let filteredRecipes = recipes.slice();                        // Réinitialise filteredRecipes à sa valeur d'origine avant d'appliquer les filtres

	if (searchTerm.length >= 3) {                                 // Filtre les recettes en fonction du terme de recherche (si sa longueur est >= 3)
		filteredRecipes = recipes.filter((recipe) => {
			const recipeValues = [recipe.name, ...recipe.ingredients.map((ingredient) => ingredient.ingredient), recipe.description].join(" ").toLowerCase();

			return recipeValues.includes(searchTerm);
		});
	}
	if (selectedTags.length > 0) {                                // Filtre les recettes en fonction des tags sélectionnés (si la liste n'est pas vide)
		filteredRecipes = filteredRecipes.filter((recipe) => {
			return selectedTags.every((selectedTag) => {
				return (
					recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === selectedTag.toLowerCase()) ||
					recipe.ustensils.some((utensil) => utensil.toLowerCase() === selectedTag.toLowerCase()) ||
					recipe.appliance.toLowerCase() === selectedTag.toLowerCase()
				);
			});
		});
	}
	setFilteredRecipes(filteredRecipes);                          // Mise à jour la liste des recettes filtrées et affiche les recettes correspondantes
	displayRecipes(filteredRecipes);
}