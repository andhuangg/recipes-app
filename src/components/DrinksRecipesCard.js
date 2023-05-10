import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';
import Header from './Header';

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
    const { name } = target;
    if (appliedDrinksFilter === name) {
      setAppliedDrinksFilter('');
      setFilteredDataDrinks([]);
    }
    if (appliedDrinksFilter === '') {
      setAppliedDrinksFilter(name);
    }
  };

  if (dataDrinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <div>
      <Header title="Drinks" iconProfile iconSearch />
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
        : dataDrinks && dataDrinks.slice(0, maxDrinksQuant).map((drink, index) => (
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
