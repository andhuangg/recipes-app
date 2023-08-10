import React, { useContext, useState, useEffect } from 'react';
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

  const [hasAlerted, setHasAlerted] = useState(false);

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

  useEffect(() => {
    if (dataDrinks === null && !hasAlerted) {
      global.alert('Sorry, we haven\'t found any drinks for these filters.');
      setHasAlerted(true);
    }
  }, [dataDrinks, hasAlerted]);

  return (
    <>
      <Header title="Drinks" iconProfile iconSearch />
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
          {categoriesDrinks.map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              type="button"
              className="btn btn-outline-secondary btn-hover-orange mx-1 my-1"
              name={ category.strCategory }
              id={ `${category.strCategory}-category-filter` }
              onClick={ ({ target }) => handleClickFilterButton(target) }
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        <div className="row">
          {dataDrinks === null ? (
            <div className="col-12 text-center">
              <p>Sorry, we couldnt find drinks for these filters</p>
            </div>
          ) : (
            (appliedDrinksFilter ? filteredDataDrinks : dataDrinks)
              .slice(0, maxDrinksQuant)
              .map((drink, index) => (
                <div className="col-6 col-md-4 col-lg-3 mb-4" key={ index }>
                  <a
                    href={ `/drinks/${drink.idDrink}` }
                    data-testid={ `${index}-recipe-card` }
                    id={ drink.idDrink }
                    className="text-reset"
                  >
                    <div className="recipe-card">
                      <img
                        className="recipes-img img-fluid"
                        src={ drink.strDrinkThumb }
                        alt={ `${drink.strDrink}` }
                        data-testid={ `${index}-card-img` }
                        id={ drink.idDrink }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                        id={ drink.idDrink }
                        className="text-center mt-2"
                      >
                        {drink.strDrink}
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

export default DrinksRecipesCard;
