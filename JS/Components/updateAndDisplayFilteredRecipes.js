import { getFilteredRecipes, setFilteredRecipes } from "./filteredRecipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { filterBySelectedTags } from "./filterBySelectedTags.js";


/* filtre les recettes en fonction des étiquettes sélectionnées (basilic dans ce cas)
 * et met à jour les recettes filtrées en utilisant setFilteredRecipes()
 * et les affiche en utilisant displayRecipes().*/
export function updateAndDisplayFilteredRecipes(selectedTags) {
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