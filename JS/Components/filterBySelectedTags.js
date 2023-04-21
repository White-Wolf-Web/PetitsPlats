/*  filtre les recettes en fonction des étiquettes sélectionnées (ingrédients, ustensiles ou appareils)
et retourne un nouveau tableau de recettes filtrées.*/
export function filterBySelectedTags(selectedTags, filteredRecipes) {
	let updatedFilteredRecipes = filteredRecipes.slice();
	if (selectedTags.length > 0) {
		updatedFilteredRecipes = filteredRecipes.filter((recipe) => {
			return selectedTags.every((selectedTag) => {                        //Si tous les tags sélectionnés sont présents, la fonction every() retourne true,
				const isIngredient = recipe.ingredients.some((ingredient) => {  //Si au moins un ingrédient correspond au tag, la fonction retourne true.
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