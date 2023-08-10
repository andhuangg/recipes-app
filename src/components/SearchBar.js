import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeContext } from '../context/RecipeProvider';
import {
  mealsSearchByFirstLetter,
  mealsSearchByIngredient,
  mealsSearchByName,
  drinksSearchByFirstLetter,
  drinksSearchByIngredient,
  drinksSearchByName,
} from '../services/fetchApi';

function SearchBar({ page }) {
  const { setDataMeals, setDataDrinks } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const history = useHistory();

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (searchBy === 'first-letter' && searchTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let data;

    switch (page) {
    case 'meals':
      switch (searchBy) {
      case 'ingredient':
        data = await mealsSearchByIngredient(searchTerm);
        break;
      case 'name':
        data = await mealsSearchByName(searchTerm);
        break;
      default:
        data = await mealsSearchByFirstLetter(searchTerm);
      }
      setDataMeals(data.meals);
      if (data.meals && data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      }
      break;
    default:
      switch (searchBy) {
      case 'ingredient':
        data = await drinksSearchByIngredient(searchTerm);
        break;
      case 'name':
        data = await drinksSearchByName(searchTerm);
        break;
      default:
        data = await drinksSearchByFirstLetter(searchTerm);
      }
      setDataDrinks(data.drinks);
      if (data.drinks && data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
    }
    setSearchTerm('');
  };

  return (
    <div className="p-3 bg-f7f7f7 rounded">
      <div className="mb-3">
        <input
          type="text"
          value={ searchTerm }
          onChange={ handleSearchTermChange }
          data-testid="search-input"
          className="form-control"
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="ingredient"
            id="ingredient"
            checked={ searchBy === 'ingredient' }
            onChange={ handleSearchByChange }
            data-testid="ingredient-search-radio"
          />
          <label className="form-check-label" htmlFor="ingredient">
            Ingredient
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="name"
            id="name"
            checked={ searchBy === 'name' }
            onChange={ handleSearchByChange }
            data-testid="name-search-radio"
          />
          <label className="form-check-label" htmlFor="name">
            Name
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="first-letter"
            id="first-letter"
            checked={ searchBy === 'first-letter' }
            onChange={ handleSearchByChange }
            data-testid="first-letter-search-radio"
          />
          <label className="form-check-label" htmlFor="first-letter">
            First Letter
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={ handleSearchButtonClick }
          data-testid="exec-search-btn"
          className="btn btn-light w-100"
        >
          Search
        </button>

      </div>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default SearchBar;
