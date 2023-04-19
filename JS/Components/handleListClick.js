import { createTag } from "./creatTag.js";

// Fonction pour gérer les clics sur les listes d'ingrédients, d'appareils et d'ustensiles
export function handleListClick(event) {
	event.stopPropagation();
	if (event.target.tagName === "LI") {
		const tagType = event.currentTarget.getAttribute("data-filter");
		const selectedValue = event.target.textContent;
		createTag(selectedValue, tagType);

		const listElement = event.currentTarget;
		listElement.style.display = "none";
	}
}
