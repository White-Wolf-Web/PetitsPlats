import { recipes } from "../Data/recipes.js";
import { getFilteredRecipes } from "./filteredRecipes.js";

// Fonction pour normaliser le nom des appareils (supprimer le "s" à la fin si nécessaire)
function normalizeAppliance(appliance) {
	if (
		appliance &&
		typeof appliance === "string" &&
		appliance.endsWith("s") &&
		recipes.some((recipe) => {
			return recipe.appliance.toLowerCase() === appliance.slice(0, -1).toLowerCase();
		})
	) {
		return appliance.slice(0, -1);
	}
	return appliance;
}

// Fonction pour obtenir tous les appareils uniques
export function getAllAppliances() {
	const allAppliances = new Set();
	recipes.forEach((recipe) => {
		const lowerCaseAppliance = normalizeAppliance(recipe.appliance);
		allAppliances.add(lowerCaseAppliance);
	});
	return Array.from(allAppliances);
}

// Fonction pour trier les appareils par ordre alphabétique
function sortAppliancesAlphabetically(appliancesList) {
	return appliancesList.sort((a, b) => a.localeCompare(b));
}

// Fonction pour formater les noms des appareils (première lettre en majuscule, le reste en minuscules)
function formatAppliance(appliance) {
	return appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase();
}

// Fonction pour afficher les appareils dans la liste déroulante
export function displayAppliances(appliances, selectedAppliances = [], applianceInput) {
	const ulElement = document.getElementById("applianceList");

	// Normalisation, suppression des doublons et tri des appareils
	const normalizedAppliances = appliances.map(normalizeAppliance);
	const uniqueAppliances = Array.from(new Set(normalizedAppliances));
	const stringAppliances = uniqueAppliances.filter((appliance) => typeof appliance === "string");
	const sortedAppliances = sortAppliancesAlphabetically(stringAppliances);
	ulElement.innerHTML = "";

	// Parcourir les appareils triés et créer un élément li pour chaque appareil non sélectionné
	sortedAppliances.forEach((appliance) => {
		if (!selectedAppliances.includes(appliance.toLowerCase())) {
			const liElement = document.createElement("li");
			liElement.textContent = formatAppliance(appliance);

			liElement.addEventListener("click", () => {
				const filteredRecipes = getFilteredRecipes();
				applianceInput.value = ""; // Effacer l'input après avoir sélectionné un appareil
			});
			ulElement.appendChild(liElement);
		}
	});
}

// Fonction pour filtrer les appareils affichés en fonction du terme de recherche
function filterDisplayedAppliances(searchTerm) {
	const ulElement = document.getElementById("applianceList");
	const listItems = Array.from(ulElement.children);

	// Parcourir tous les éléments li et afficher uniquement ceux qui contiennent le terme de recherche
	listItems.forEach((listItem) => {
		const appliance = listItem.textContent.trim().toLowerCase();
		if (appliance.includes(searchTerm.trim().toLowerCase())) {
			listItem.style.display = "list-item";
		} else {
			listItem.style.display = "none";
		}
	});
}

// Ajout d'un gestionnaire d'événement "input" pour filtrer les appareils
// en fonction du terme de recherche lors de la saisie de l'utilisateur
document.addEventListener("DOMContentLoaded", function () {
	const applianceInput = document.getElementById("applianceInput");
	applianceInput.addEventListener("input", (event) => {
		const searchTerm = event.target.value;
		filterDisplayedAppliances(searchTerm);
	});
});
