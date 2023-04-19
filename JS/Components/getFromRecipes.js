
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