import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';
import Header from './Header';

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

  const [hasAlerted, setHasAlerted] = useState(false);

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

  useEffect(() => {
    if (dataMeals === null && !hasAlerted) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setHasAlerted(true);
    }
  }, [dataMeals, hasAlerted]);

  return (
    <>
      <Header title="Meals" iconProfile iconSearch />
      <div className="container pb-5">
        <div className="d-flex justify-content-center flex-wrap my-3">
          <button
            data-testid="All-category-filter"
            type="button"
            className="btn btn-outline-secondary btn-hover-orange mx-1 my-1"
            onClick={ handleClickCleanFilters }
          >
            All
          </button>
          {categoriesMeals.map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              type="button"
              className="btn btn-outline-secondary mx-1 my-1 btn-hover-orange"
              name={ category.strCategory }
              id={ `${category.strCategory}-category-filter` }
              onClick={ ({ target }) => handleClickFilterButton(target) }
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        <div className="row">
          {dataMeals === null ? (
            <div className="col-12 text-center">
              <p>Sorry, we couldnt find drinks for these filters</p>
            </div>
          ) : (
            (appliedMealsFilter ? filteredDataMeals : dataMeals)
              .slice(0, maxMealsQuant)
              .map((meal, index) => (
                <div className="col-6 col-md-4 col-lg-3 mb-4" key={ index }>
                  <a
                    href={ `/meals/${meal.idMeal}` }
                    data-testid={ `${index}-recipe-card` }
                    id={ meal.idMeal }
                    className="text-reset"
                  >
                    <div className="recipe-card">
                      <img
                        className="recipes-img img-fluid"
                        src={ meal.strMealThumb }
                        alt={ `${meal.strMeal}` }
                        data-testid={ `${index}-card-img` }
                        id={ meal.idMeal }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                        id={ meal.idMeal }
                        className="text-center mt-2"
                      >
                        {meal.strMeal}
                      </p>
                    </div>
                  </a>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default MealsRecipesCard;
