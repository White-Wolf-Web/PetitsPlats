import { recipes } from "../Data/recipes.js";

const cardContainer = document.getElementById("card-container");

export default function createCard(recipe) {
	const card = document.createElement("div");
	card.className = "card";
	card.dataset.recipe = JSON.stringify(recipe); 

	const headCard = document.createElement("img");
	headCard.className = "headCard";
	card.appendChild(headCard);

	const headLine = document.createElement("div");
	headLine.className = "headLine";
	card.appendChild(headLine);

	const title = document.createElement("h3");
	title.textContent = recipe.name;
	headLine.appendChild(title);

	const time = document.createElement("p");
	time.textContent = `🕓 ${recipe.time} minutes`;
	time.className = "time";
	headLine.appendChild(time);

	const servings = document.createElement("p");
	servings.className = "servings";
	card.appendChild(servings);

	const recipeExplanation = document.createElement("div");
	recipeExplanation.className = "recipeExplanation";
	card.appendChild(recipeExplanation);

	const ingredientsList = document.createElement("ul");
	ingredientsList.className = "ingredientsList";
	recipe.ingredients.forEach((ingredient) => {
		const listItem = document.createElement("li");

		// Créez un élément <strong> pour le nom de l'ingrédient
		const ingredientName = document.createElement("strong");
		ingredientName.textContent = ingredient.ingredient;
		listItem.appendChild(ingredientName);

		// Ajoutez la quantité et l'unité après le nom de l'ingrédient
		listItem.append(` : ${ingredient.quantity || ""} ${ingredient.unit || ""}`.trim());

		ingredientsList.appendChild(listItem);
	});
	recipeExplanation.appendChild(ingredientsList);

	const description = document.createElement("p");
	description.textContent = recipe.description;
	description.className = "description";
	recipeExplanation.appendChild(description);

	const appliance = document.createElement("p");
	card.appendChild(appliance);

	const utensilsList = document.createElement("ul");
	recipe.ustensils.forEach((utensil) => {
		const listItem = document.createElement("li");
		listItem.className = "listItem";
		utensilsList.appendChild(listItem);
	});
	card.appendChild(utensilsList);

	return card;
}

recipes.forEach((recipe) => {
	if (cardContainer.childElementCount < 50) {
		const card = createCard(recipe);
		cardContainer.appendChild(card);
	}
});