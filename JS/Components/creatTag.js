
import { filterRecipes } from "./filterRecipesByLoopFor.js";
//import { filterRecipes } from "./filterRecipesByFilterAndMap.js";

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