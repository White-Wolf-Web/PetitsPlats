import { recipes } from "../Data/recipes.js";
import { getFilteredRecipes } from "./filteredRecipes.js";

// Fonction pour normaliser le nom des ustensiles
function normalizeUstensil({ ustensil }) {
	if (ustensil && typeof ustensil === "string" && ustensil.endsWith("s") && recipes.some((recipe) => {
			return recipe.ustensils.some(({ ustensil: ing }) => ing.toLowerCase() === ustensil.slice(0, -1).toLowerCase());
		})
	) {
		return ustensil.slice(0, -1).toLowerCase();
	}
	return ustensil.toLowerCase();
}

// Fonction pour obtenir tous les ustensiles de types uniques
export function getAllUstensils() {
	const allUstensils = new Set();
	recipes.forEach((recipe) => {
		recipe.ustensils
			.filter((ustensilObj) => ustensilObj && typeof ustensilObj === "object" && "ustensil" in ustensilObj)
			.forEach((ustensilObj) => {
				const normalizedUstensil = normalizeUstensil(ustensilObj);
				allUstensils.add(normalizedUstensil);
			});
	});
	return Array.from(allUstensils);
}

// Fonction pour trier les ustensiles par ordre alphabétique
function sortUstensilsAlphabetically(ustensilsList) {
	return ustensilsList.sort((a, b) => a.localeCompare(b));
}

// Fonction pour formater les noms des ustensiles
function formatUstensil(ustensil) {
	return ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase();
}

// Fonction pour afficher les ustensiles en acceptant l'élément ustensilInput en tant que paramètre
export function displayUstensils(ustensils, selectedUstensils = [], ustensilInput) {
	const ulElement = document.getElementById("ustensilList");
	const uniqueUstensils = Array.from(new Set(ustensils));
	const sortedUstensils = sortUstensilsAlphabetically(uniqueUstensils);
	ulElement.innerHTML = "";

	sortedUstensils.forEach((ustensil) => {
		if (!selectedUstensils.includes(ustensil.toLowerCase())) {
			const liElement = document.createElement("li");
			liElement.textContent = formatUstensil(ustensil);
			liElement.addEventListener("click", () => {
				const filteredRecipes = getFilteredRecipes();
				//createTag(formatUstensil(ustensil), filteredRecipes);
				ustensilInput.value = "";
			});

			ulElement.appendChild(liElement);
		}
	});
}

// Fonction pour filtrer les ustensiles affichés en fonction du terme de recherche
function filterDisplayedUstensils(searchTerm) {
	const ulElement = document.getElementById("ustensilList");
	const listItems = Array.from(ulElement.children);

	listItems.forEach((listItem) => {
		const ustensil = listItem.textContent.trim().toLowerCase();
		if (ustensil.includes(searchTerm.trim().toLowerCase())) {
			listItem.style.display = "list-item";
		} else {
			listItem.style.display = "none";
		}
	});
}

// en fonction du terme de recherche lors de la saisie de l'utilisateur
document.addEventListener("DOMContentLoaded", function () {
	const ustensilInput = document.getElementById("ustensilInput");
	ustensilInput.addEventListener("input", (event) => {
		const searchTerm = event.target.value;
		filterDisplayedUstensils(searchTerm);
	});
});