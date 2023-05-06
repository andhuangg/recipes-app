import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';

function DrinksRecipes() {
  const {
    dataDrinks,
    categoriesDrinks,
  } = useContext(RecipeContext);
  return (
    <div>
      <h1>Drinks</h1>
      <label>
        { categoriesDrinks.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
            name={ `${category.strCategory}-category-filter` }
            id={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>))}
      </label>
      { dataDrinks.map((drink, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="recipes-img"
            src={ drink.strDrinkThumb }
            alt={ `${drink.strDrink}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { drink.strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}

export default DrinksRecipes;
