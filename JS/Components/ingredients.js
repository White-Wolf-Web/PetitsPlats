import { recipes } from "../Data/recipes.js";
import { getFilteredRecipes } from "./filteredRecipes.js";

// Fonction pour normaliser les ingrédients (supprimer le "s" à la fin si nécessaire)
function normalizeIngredient(ingredient) {
	if (
		ingredient.endsWith("s") &&
		recipes.some((recipe) => {
			return recipe.ingredients.some(({ ingredient: ing }) => ing.toLowerCase() === ingredient.slice(0, -1).toLowerCase());
		})
	) {
		return ingredient.slice(0, -1);
	}
	return ingredient;
}

// Fonction pour obtenir tous les ingrédients uniques
export function getAllIngredients() {
	const allIngredients = new Set();
	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			const lowerCaseIngredient = normalizeIngredient(ingredient.ingredient.toLowerCase());
			allIngredients.add(lowerCaseIngredient);
		});
	});
	return Array.from(allIngredients);
}

// Fonction pour trier les ingrédients par ordre alphabétique
function sortIngredientsAlphabetically(ingredientsList) {
	return ingredientsList.sort((a, b) => a.localeCompare(b));
}

// Fonction pour formater les ingrédients (première lettre en majuscule, le reste en minuscules)
function formatIngredient(ingredient) {
	return ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
}

// Fonction pour afficher les ingrédients dans la liste déroulante
export function displayIngredients(ingredients, selectedIngredients = [], ingredientInput) {
	const ulElement = document.getElementById("ingredientsList");

	// Normalisation, suppression des doublons et tri des ingrédients
	const normalizedIngredients = ingredients.map(normalizeIngredient);
	const uniqueIngredients = Array.from(new Set(normalizedIngredients));
	const sortedIngredients = sortIngredientsAlphabetically(uniqueIngredients);

	ulElement.innerHTML = ""; // Vider la liste d'ingrédients

	// Parcourir les ingrédients triés et créer un élément li pour chaque ingrédient non sélectionné
	sortedIngredients.forEach((ingredient) => {
		if (!selectedIngredients.includes(ingredient.toLowerCase())) {
			const liElement = document.createElement("li");
			liElement.textContent = formatIngredient(ingredient);

			liElement.addEventListener("click", () => {
				const filteredRecipes = getFilteredRecipes();
				ingredientInput.value = ""; // Effacer l'input après avoir sélectionné un ingrédient
			});

			ulElement.appendChild(liElement);
		}
	});
}
