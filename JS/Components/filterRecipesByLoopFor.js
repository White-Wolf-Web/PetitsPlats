import { recipes } from "../Data/recipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { setFilteredRecipes} from "./filteredRecipes.js";


export function filterRecipes() {
	const searchInput = document.getElementById("search-input");
	const searchTerm = searchInput.value.toLowerCase().trim();
	const tagContainer = document.getElementById("tags");
	const selectedTags = Array.from(tagContainer.children).map((tagElement) => tagElement.textContent.trim());

	let filteredRecipes = recipes.slice();

	if (searchTerm.length >= 3) {
		const tempFilteredRecipes = [];
		for (let i = 0; i < recipes.length; i++) {
			const recipe = recipes[i];
			const ingredientsList = [];
			for (let j = 0; j < recipe.ingredients.length; j++) {
				ingredientsList.push(recipe.ingredients[j].ingredient);
			}
			const recipeValues = [recipe.name, ...ingredientsList, recipe.description].join(" ").toLowerCase();
			if (recipeValues.includes(searchTerm)) {
				tempFilteredRecipes.push(recipe);
			}
		}
		filteredRecipes = tempFilteredRecipes;
	}

	if (selectedTags.length > 0) {
		const tempFilteredRecipes = [];
		for (let i = 0; i < filteredRecipes.length; i++) {
			const recipe = filteredRecipes[i];
			let tagFound = true;
			for (let j = 0; j < selectedTags.length; j++) {
				const selectedTag = selectedTags[j];
				const isIngredient = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === selectedTag.toLowerCase());
				const isUstensil = recipe.ustensils.some((utensil) => utensil.toLowerCase() === selectedTag.toLowerCase());
				const isAppliance = recipe.appliance.toLowerCase() === selectedTag.toLowerCase();

				if (!isIngredient && !isUstensil && !isAppliance) {
					tagFound = false;
					break;
				}
			}
			if (tagFound) {
				tempFilteredRecipes.push(recipe);
			}
		}
		filteredRecipes = tempFilteredRecipes;
	}

	setFilteredRecipes(filteredRecipes);
	displayRecipes(filteredRecipes);
}