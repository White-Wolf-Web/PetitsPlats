import createCard from "../Template/createCard.js";

/* elle affiche les recettes (recipesToDisplay) & affiche un message si aucune n'est disponible
 recipesToDisplay est un tableau d'objets recettes qui seront affichés sur la page web.*/
export function displayRecipes(recipesToDisplay) {
	const recipeContainer = document.getElementById("card-container");
	recipeContainer.innerHTML = "";
	const noRecipyAvailable = document.getElementById("noRecipyAvailable");// Sélectionne et vide le conteneur pour le message "Aucune recette disponible"
	noRecipyAvailable.innerHTML = "";
	noRecipyAvailable.classList.remove("noRecipyAvailable");

	if (recipesToDisplay.length === 0) {                                   // Si aucune recette ne correspond aux critères de recherche
		noRecipyAvailable.classList.add("noRecipyAvailable");
		const noResultsMessage = document.createElement("p");
		noResultsMessage.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
		noRecipyAvailable.appendChild(noResultsMessage);
	} else {                                                               // Si des recettes correspondent, on crée et affiche les cartes de recettes
		recipesToDisplay.forEach((recipe) => {
			const recipeCard = createCard(recipe);
			recipeContainer.appendChild(recipeCard);
		});
	}
}