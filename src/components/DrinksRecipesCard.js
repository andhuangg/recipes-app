import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';

const maxDrinksQuant = 12;

function DrinksRecipesCard() {
  const {
    dataDrinks,
    filteredDataDrinks,
    setFilteredDataDrinks,
    categoriesDrinks,
    appliedDrinksFilter,
    setAppliedDrinksFilter,
  } = useContext(RecipeContext);

  const handleClickCleanFilters = () => {
    setAppliedDrinksFilter('');
    setFilteredDataDrinks([]);
  };

  const handleClickFilterButton = (target) => {
    if (appliedDrinksFilter === target.name) {
      setAppliedDrinksFilter('');
      setFilteredDataDrinks([]);
    }
    if (appliedDrinksFilter === '') {
      setAppliedDrinksFilter(target.name);
    }
  };

  if (dataDrinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <div>
      <h1>Drinks</h1>
      <label>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickCleanFilters }
        >
          All
        </button>
        { categoriesDrinks.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
            name={ category.strCategory }
            id={ `${category.strCategory}-category-filter` }
            onClick={ ({ target }) => handleClickFilterButton(target) }
          >
            { category.strCategory }
          </button>))}
      </label>
      <br />
      { appliedDrinksFilter
        ? filteredDataDrinks.slice(0, maxDrinksQuant).map((drink, index) => (
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
          </div>))
        : dataDrinks && dataDrinks.slice(0, maxDrinksQuant).map((drink, index) => (
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
          </div>))}
    </div>
  );
}

export default DrinksRecipesCard;
