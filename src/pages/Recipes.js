import React from 'react';
import DrinksRecipes from '../components/DrinksRecipes';
import MealsRecipesCards from '../components/MealsRecipesCards';

function Recipes() {
  return (
    <div>
      <MealsRecipesCards />
      <DrinksRecipes />
    </div>
  );
}

export default Recipes;
