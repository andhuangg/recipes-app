import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';

const maxMealsQuant = 12;

function MealsRecipesCard() {
  const {
    dataMeals,
    filteredDataMeals,
    setFilteredDataMeals,
    categoriesMeals,
    appliedMealsFilter,
    setAppliedMealsFilter,
  } = useContext(RecipeContext);

  const handleClickCleanFilters = () => {
    setFilteredDataMeals([]);
    setAppliedMealsFilter('');
  };

  const handleClickFilterButton = (target) => {
    const { name } = target;
    if (appliedMealsFilter === name) {
      setFilteredDataMeals([]);
      setAppliedMealsFilter('');
    }
    if (appliedMealsFilter === '') {
      setAppliedMealsFilter(name);
    }
  };

  if (dataMeals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <div>
      <h1>Meals</h1>
      <label>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickCleanFilters }
        >
          All
        </button>
        { categoriesMeals.map((category, index) => (
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
      { appliedMealsFilter
        ? filteredDataMeals.slice(0, maxMealsQuant).map((meal, index) => (
          <a
            href={ `/meals/${meal.idMeal}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            id={ meal.idMeal }
          >
            <img
              className="recipes-img"
              src={ meal.strMealThumb }
              alt={ `${meal.strMeal}` }
              data-testid={ `${index}-card-img` }
              id={ meal.idMeal }
            />
            <p
              data-testid={ `${index}-card-name` }
              id={ meal.idMeal }
            >
              { meal.strMeal }
            </p>
          </a>))
        : dataMeals && dataMeals.slice(0, maxMealsQuant).map((meal, index) => (
          <a
            href={ `/meals/${meal.idMeal}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            id={ meal.idMeal }
          >
            <img
              className="recipes-img"
              src={ meal.strMealThumb }
              alt={ `${meal.strMeal}` }
              data-testid={ `${index}-card-img` }
              id={ meal.idMeal }
            />
            <p
              data-testid={ `${index}-card-name` }
              id={ meal.idMeal }
            >
              { meal.strMeal }
            </p>
          </a>))}
    </div>
  );
}

export default MealsRecipesCard;
