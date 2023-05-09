import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';

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
        ? filteredDataDrinks.map((drink, index) => (
          <a
            href={ `/drinks/${drink.idDrink}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            id={ drink.idDrink }
          >
            <img
              className="recipes-img"
              src={ drink.strDrinkThumb }
              alt={ `${drink.strDrink}` }
              data-testid={ `${index}-card-img` }
              id={ drink.idDrink }
            />
            <p
              data-testid={ `${index}-card-name` }
              id={ drink.idDrink }
            >
              { drink.strDrink }
            </p>
          </a>))
        : dataDrinks.map((drink, index) => (
          <a
            href={ `/drinks/${drink.idDrink}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            id={ drink.idDrink }
          >
            <img
              className="recipes-img"
              src={ drink.strDrinkThumb }
              alt={ `${drink.strDrink}` }
              data-testid={ `${index}-card-img` }
              id={ drink.idDrink }
            />
            <p
              data-testid={ `${index}-card-name` }
              id={ drink.idDrink }
            >
              { drink.strDrink }
            </p>
          </a>
        )) }
    </div>
  );
}

export default DrinksRecipesCard;
