import { recipes } from "../Data/recipes.js";
import createCard from "../Template/createCard.js";

export function getIngredientsFromRecipes(recipesList) {
	const ingredientsSet = new Set();                             // Création d'un Set pour stocker les ingrédients uniques
	recipesList.forEach((recipe) => {                             // Parcours de chaque recette dans la liste des recettes
		recipe.ingredients.forEach((ingredient) => {                // Parcours de chaque ingrédient dans les ingrédients de la recette
			ingredientsSet.add(ingredient.ingredient.toLowerCase());  // Ajout de l'ingrédient (en minuscules) au Set d'ingrédients uniques
		});
	});
	return Array.from(ingredientsSet);                            // Conversion du Set en Array et renvoi du résultat
}
export function getUstensilsFromRecipes(recipesList) {
	const utensilsSet = new Set();                                // Création d'un Set pour stocker les ustensiles uniques
	recipesList.forEach((recipe) => {
		recipe.ustensils.forEach((utensil) => {
			utensilsSet.add(utensil.toLowerCase());
		});
	});
	return Array.from(utensilsSet);
}
export function getAppliancesFromRecipes(recipes) {
	const appliances = new Set();                                 // Création d'un Set pour stocker les appareils uniques
	recipes.forEach((recipe) => {
		appliances.add(recipe.appliance);
	});
	return Array.from(appliances).sort();
}
export let filteredRecipes = recipes.slice();                   // c'est une variable qui stocke une copie de la liste de recettes initiales.

export function getFilteredRecipes() {
	return filteredRecipes;
}
export function setFilteredRecipes(recipes) {                   // Fonction renvoie la liste des recettes filtrées stockées dans la variable filteredRecipes.
	filteredRecipes = recipes;
}

export function displayRecipes(recipesToDisplay) {
	const recipeContainer = document.getElementById("card-container");
	recipeContainer.innerHTML = "";
	const noRecipyAvailable = document.getElementById("noRecipyAvailable"); // Sélectionne et vide le conteneur pour le message "Aucune recette disponible"
	noRecipyAvailable.innerHTML = "";
	noRecipyAvailable.classList.remove("noRecipyAvailable");

	if (recipesToDisplay.length === 0) {                          // Si aucune recette ne correspond aux critères de recherche
		noRecipyAvailable.classList.add("noRecipyAvailable");
		const noResultsMessage = document.createElement("p");
		noResultsMessage.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
		noRecipyAvailable.appendChild(noResultsMessage);
	} else {                                                      // Si des recettes correspondent, on crée et affiche les cartes de recettes
		recipesToDisplay.forEach((recipe) => {
			const recipeCard = createCard(recipe);
			recipeContainer.appendChild(recipeCard);
		});
	}
}
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

// Fonction pour créer une étiquette (tag) pour un ingrédient, un ustensile ou un appareil sélectionné
export function createTag(selectedIngredient, tagType) {
	const tagContainer = document.getElementById("tags");
	const tagElement = document.createElement("span");

  // Ajoute des classes CSS en fonction du type de tag
	if (tagType === "ingredient") {
		tagElement.classList.add("allTags", "tag-ingredient");
	} else if (tagType === "ustensil") {
		tagElement.classList.add("allTags", "tag-ustensil");
	} else if (tagType === "appliance") {
		tagElement.classList.add("allTags", "tag-appliance");
	}

	tagElement.textContent = selectedIngredient;                  // Définit le contenu textuel du tag avec l'élément sélectionné 
	tagContainer.appendChild(tagElement);

	const closeButton = document.createElement("i");              // Création d'un bouton de fermeture pour le tag
	closeButton.className = "fa-regular fa-circle-xmark";
	closeButton.style.color = "#ffffff";
	closeButton.classList.add("close-button");
	closeButton.addEventListener("click", () => {
		tagContainer.removeChild(tagElement);                       // Supprime le tag du conteneur de tags

		const listItems = Array.from(document.querySelectorAll(`[data-filter="${tagType}"] li`)); // Je récupère tous les éléments de liste en fonction du filtre
		const listItem = listItems.find((item) => item.textContent.trim() === selectedIngredient);
		listItem.style.display = "block";

		tagElement.remove();                                        // Supprime le tag du DOM
		filterRecipes();                                            // Appel de la fonction pour mettre à jour les recettes affichées après la suppression du tag
	});

	tagElement.appendChild(closeButton);

	filterRecipes();
}

/* filtre les recettes en fonction des étiquettes sélectionnées (basilic dans ce cas)
 * et met à jour les recettes filtrées en utilisant setFilteredRecipes()
 * et les affiche en utilisant displayRecipes().*/
function updateAndDisplayFilteredRecipes(selectedTags) {
	const allRecipes = getFilteredRecipes();

	if (selectedTags.length > 0) {
		const updatedFilteredRecipes = filterBySelectedTags(selectedTags, allRecipes);
		setFilteredRecipes(updatedFilteredRecipes);
		displayRecipes(updatedFilteredRecipes);
	} else {
		setFilteredRecipes(allRecipes);
		displayRecipes(allRecipes);
	}
}

//  filtre les recettes en fonction des étiquettes sélectionnées (ingrédients, ustensiles ou appareils)
// et retourne un nouveau tableau de recettes filtrées.
function filterBySelectedTags(selectedTags, filteredRecipes) {
	let updatedFilteredRecipes = filteredRecipes.slice();
	if (selectedTags.length > 0) {
		updatedFilteredRecipes = filteredRecipes.filter((recipe) => {
			return selectedTags.every((selectedTag) => {
				const isIngredient = recipe.ingredients.some((ingredient) => {
					return ingredient.ingredient.toLowerCase() === selectedTag.toLowerCase();
				});
				const isUstensil = recipe.ustensils.some((ustensil) => {
					return ustensil.toLowerCase() === selectedTag.toLowerCase();
				});
				const isAppliance = recipe.appliance.toLowerCase() === selectedTag.toLowerCase();
				return isIngredient || isUstensil || isAppliance;
			});
		});
	}
	return updatedFilteredRecipes;
}

// Fonction pour gérer les clics sur les listes d'ingrédients, d'appareils et d'ustensiles
function handleListClick(event) {
	event.stopPropagation();
	if (event.target.tagName === "LI") {
		const tagType = event.currentTarget.getAttribute("data-filter");
		const selectedValue = event.target.textContent;
		createTag(selectedValue, tagType);

		const listElement = event.currentTarget;
		listElement.style.display = "none";
	}
}

document.getElementById("ingredientsList").addEventListener("click", handleListClick);
document.getElementById("applianceList").addEventListener("click", handleListClick);
document.getElementById("ustensilList").addEventListener("click", handleListClick);