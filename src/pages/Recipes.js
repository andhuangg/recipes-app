import React from 'react';
import DrinksRecipes from '../components/DrinksRecipes';
import Header from '../components/Header';
import MealsRecipesCards from '../components/MealsRecipesCards';

function Recipes() {
  return (
    <div>
      <Header />
      <MealsRecipesCards />
      <DrinksRecipes />
    </div>
  );
}

export default Recipes;
