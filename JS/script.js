import { recipes } from "./Data/recipes.js";
import { searchAndFilter } from "./Components/searchAndFilter.js";
import { displayIngredients } from "./Components/ingredients.js";
import { getAllUstensils, displayUstensils } from "./Components/ustensils.js";
import { displayAppliances } from "./Components/appliances.js";
import { getIngredientsFromRecipes, getUstensilsFromRecipes, getAppliancesFromRecipes } from "./Components/getFromRecipes.js";
import { displayRecipes } from "./Components/displayRecipes.js";

// Variables pour stocker les ingrédients, ustensiles et appareils filtrés
let filteredIngredients = [];
let filteredUstensils = [];
let filteredAppliances = [];

// Sélection des éléments du DOM pour les ingrédients
const ingredientsSpan = document.getElementById("ingredientsSpan");
const ingredientInput = document.getElementById("ingredientInput");
const ingredientsList = document.getElementById("ingredientsList");
const ingredientChevronDown = document.getElementById("ingredientChevronDown");
const ingredientChevronUp = document.getElementById("ingredientChevronUp");

// Sélection des éléments du DOM pour les appareils
const appliancesSpan = document.getElementById("appliancesSpan");
const applianceInput = document.getElementById("applianceInput");
const applianceList = document.getElementById("applianceList");
const applianceChevronDown = document.getElementById("applianceChevronDown");
const applianceChevronUp = document.getElementById("applianceChevronUp");

// Sélection des éléments du DOM pour les ustensiles
const ustensilsSpan = document.getElementById("ustensilsSpan");
const ustensilInput = document.getElementById("ustensilInput");
const ustensilList = document.getElementById("ustensilList");
const ustensilChevronDown = document.getElementById("ustensilChevronDown");
const ustensilChevronUp = document.getElementById("ustensilChevronUp");

// Objet pour stocker l'état d'ouverture des listes
const isOpen = {
	ingredients: false,
	appliances: false,
	ustensils: false,
};

// Au chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
	// Recherche et filtre des recettes
	searchAndFilter(recipes);
	// Affichage des recettes, appareils et ustensiles
	displayRecipes(recipes);
	displayAppliances(recipes);
	displayUstensils(getAllUstensils(), [], ustensilInput);

	// Sélection des labels
	const labels = document.querySelectorAll("#ingredientsLabel, #ustensilsLabel, #appliancesLabel");

	// Pour chaque label, ajout d'un écouteur d'événement "click"
	labels.forEach((label) => {
		label.addEventListener("click", (event) => {
			const input = label.parentElement.querySelector("input");

			// Récupération des recettes filtrées
			const recipeContainer = document.getElementById("card-container");
			const filteredRecipes = Array.from(recipeContainer.children).map((card) => {
				return JSON.parse(card.dataset.recipe);
			});

			// Mise à jour des ingrédients, ustensiles et appareils filtrés
			filteredIngredients = getIngredientsFromRecipes(filteredRecipes);
			filteredUstensils = getUstensilsFromRecipes(filteredRecipes);
			filteredAppliances = getAppliancesFromRecipes(filteredRecipes);

			// Affichage des ingrédients, ustensiles et appareils filtrés
			displayIngredients(filteredIngredients, [], ingredientInput);
			displayUstensils(filteredUstensils, [], ustensilInput);
			displayAppliances(filteredAppliances, [], applianceInput);

			// Gestion de l'ouverture et la fermeture des listes
			if (input === ingredientInput) {
				closeOtherLists("ingredients");
				if (isOpen.ingredients) {
					ingredientsList.style.display = "none";
					isOpen.ingredients = false;
					ingredientsSpan.style.display = "block";
					ingredientInput.classList.add("hidden");
					ingredientChevronDown.style.display = "block";
					ingredientChevronUp.style.display = "none";
				} else {
					ingredientsList.style.display = "grid";
					isOpen.ingredients = true;
					ingredientsSpan.style.display = "none";
					ingredientInput.classList.remove("hidden");
					ingredientChevronDown.style.display = "none";
					ingredientChevronUp.style.display = "block";
				}
			} else if (input === ustensilInput) {
				closeOtherLists("ustensils");
				if (isOpen.ustensils) {
					ustensilList.style.display = "none";
					isOpen.ustensils = false;
					ustensilsSpan.style.display = "block";
					ustensilInput.classList.add("hidden");
					ustensilChevronDown.style.display = "block";
					ustensilChevronUp.style.display = "none";
				} else {
					ustensilList.style.display = "grid";
					isOpen.ustensils = true;
					ustensilsSpan.style.display = "none";
					ustensilInput.classList.remove("hidden");
					ustensilChevronDown.style.display = "none";
					ustensilChevronUp.style.display = "block";
				}
			} else if (input === applianceInput) {
				closeOtherLists("appliances");
				if (isOpen.appliances) {
					applianceList.style.display = "none";
					isOpen.appliances = false;
					appliancesSpan.style.display = "block";
					applianceInput.classList.add("hidden");
					applianceChevronDown.style.display = "block";
					applianceChevronUp.style.display = "none";
				} else {
					applianceList.style.display = "grid";
					isOpen.appliances = true;
					appliancesSpan.style.display = "none";
					applianceInput.classList.remove("hidden");
					applianceChevronDown.style.display = "none";
					applianceChevronUp.style.display = "block";
				}
			}

			// Focus sur l'input sélectionné
			input.focus();
		});
	});

	// Fonction pour fermer les autres listes
	function closeOtherLists(currentList) {
		if (currentList !== "ingredients") {
			ingredientsList.style.display = "none";
			isOpen.ingredients = false;
			ingredientsSpan.style.display = "block";
			ingredientInput.classList.add("hidden");
			ingredientChevronDown.style.display = "block";
			ingredientChevronUp.style.display = "none";
		}
		if (currentList !== "appliances") {
			applianceList.style.display = "none";
			isOpen.appliances = false;
			appliancesSpan.style.display = "block";
			applianceInput.classList.add("hidden");
			applianceChevronDown.style.display = "block";
			applianceChevronUp.style.display = "none";
		}
		if (currentList !== "ustensils") {
			ustensilList.style.display = "none";
			isOpen.ustensils = false;
			ustensilsSpan.style.display = "block";
			ustensilInput.classList.add("hidden");
			ustensilChevronDown.style.display = "block";
			ustensilChevronUp.style.display = "none";
		}
	}
});

// Gestion des clics en dehors des listes pour les fermer
document.addEventListener("click", function (event) {
	if (event.target.closest("#ingredientsLabel") === null && event.target.closest("#ingredientList") === null) {
		ingredientsList.style.display = "none";
		isOpen.ingredients = false;
		ingredientsSpan.style.display = "block";
		ingredientInput.classList.add("hidden");
		ingredientChevronDown.style.display = "block";
		ingredientChevronUp.style.display = "none";
	}

	if (event.target.closest("#appliancesLabel") === null && event.target.closest("#applianceList") === null) {
		applianceList.style.display = "none";
		isOpen.appliances = false;
		appliancesSpan.style.display = "block";
		applianceInput.classList.add("hidden");
		applianceChevronDown.style.display = "block";
		applianceChevronUp.style.display = "none";
	}

	if (event.target.closest("#ustensilsLabel") === null && event.target.closest("#ustensilList") === null) {
		ustensilList.style.display = "none";
		isOpen.ustensils = false;
		ustensilsSpan.style.display = "block";
		ustensilInput.classList.add("hidden");
		ustensilChevronDown.style.display = "block";
		ustensilChevronUp.style.display = "none";
	}
});

// Ajout des écouteurs d'événements pour la saisie de texte et la recherche
ingredientInput.addEventListener("input", function () {
	displayIngredients(filteredIngredients, ingredientInput.value, ingredientInput);
});

ustensilInput.addEventListener("input", function () {
	displayUstensils(filteredUstensils, ustensilInput.value, ustensilInput);
});

applianceInput.addEventListener("input", function () {
	displayAppliances(filteredAppliances, applianceInput.value, applianceInput);
});