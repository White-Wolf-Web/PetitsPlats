import { recipes } from "../Data/recipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { setFilteredRecipes } from "./filteredRecipes.js";

// Fonction pour filtrer les recettes en fonction de la recherche et des tags sélectionnés
export function filterRecipes() {
	const searchInput = document.getElementById("search-input");
	const searchTerm = searchInput.value.toLowerCase().trim();
	const tagContainer = document.getElementById("tags");
	const selectedTags = Array.from(tagContainer.children).map((tagElement) => tagElement.textContent.trim());

	// Créer une copie du tableau original de recettes pour éviter de modifier le tableau d'origine
	let filteredRecipes = recipes.slice();
	
	// Filtre les recettes en fonction de la valeur de recherche min 3
	if (searchTerm.length >= 3) {
		const tempFilteredRecipes = [];
		for (let i = 0; i < recipes.length; i++) {
			const recipe = recipes[i];
			const ingredientsList = [];

			 // Créer un tableau des noms d'ingrédients pour chaque recette
			for (let j = 0; j < recipe.ingredients.length; j++) {
				ingredientsList.push(recipe.ingredients[j].ingredient);
			}
			 // Joindre tous les noms, ingrédients et descriptions des recettes en une seule chaîne et la convertir en minuscules
			const recipeValues = [recipe.name, ...ingredientsList, recipe.description].join(" ").toLowerCase();
			
			// Vérifier si la chaîne de recherche est présente dans la chaîne des valeurs des recettes
			if (recipeValues.includes(searchTerm)) {
				tempFilteredRecipes.push(recipe);
			}
		}
		filteredRecipes = tempFilteredRecipes;
	}

	// Filtre les recettes en fonction des tags sélectionnés min 1 
	if (selectedTags.length > 0) {
		const tempFilteredRecipes = [];
		for (let i = 0; i < filteredRecipes.length; i++) {
			const recipe = filteredRecipes[i];
			let tagFound = true;

			// Vérifie si tous les tags sélectionnés sont présents dans les ingrédients, les ustensiles ou les appareils ....
			for (let j = 0; j < selectedTags.length; j++) {
				const selectedTag = selectedTags[j];
				const isIngredient = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === selectedTag.toLowerCase());
				const isUstensil = recipe.ustensils.some((utensil) => utensil.toLowerCase() === selectedTag.toLowerCase());
				const isAppliance = recipe.appliance.toLowerCase() === selectedTag.toLowerCase();

				// Si un tag sélectionné n'est pas présent dans la recette, interrompre la boucle et passer à la recette suivante
				if (!isIngredient && !isUstensil && !isAppliance) {
					tagFound = false;
					break;
				}
			}
			// Si tous les tags sélectionnés sont présents, on ajoute un tableau temporaire
			if (tagFound) {
				tempFilteredRecipes.push(recipe);
			}
		}
		filteredRecipes = tempFilteredRecipes;
	}

	setFilteredRecipes(filteredRecipes);  // Mise à jour du tableau des recettes filtrées
	displayRecipes(filteredRecipes);
}
