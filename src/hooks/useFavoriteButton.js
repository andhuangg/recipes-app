import { useState } from 'react';

const createFavoriteRecipe = (recipe, recipeId) => ({
  id: recipeId,
  type: recipe.idMeal ? 'meal' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory || '',
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
  image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
});

const useFavorites = (recipe) => {
  const recipeId = recipe.idMeal ? recipe.idMeal : recipe.idDrink;
  const initialFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const initialIsFavorite = initialFavorites.some((favorite) => favorite.id === recipeId);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteExists = favorites.some((favorite) => favorite.id === recipeId);

    if (favoriteExists) {
      favorites = favorites.filter((favorite) => favorite.id !== recipeId);
      setIsFavorite(false);
    } else {
      const favoriteRecipe = createFavoriteRecipe(recipe, recipeId);
      favorites.push(favoriteRecipe);
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  };

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
