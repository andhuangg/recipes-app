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
    <div>
      <input
        type="text"
        value={ searchTerm }
        onChange={ handleSearchTermChange }
        data-testid="search-input"
      />

      <label>
        <input
          type="radio"
          value="ingredient"
          checked={ searchBy === 'ingredient' }
          onChange={ handleSearchByChange }
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>

      <label>
        <input
          type="radio"
          value="name"
          checked={ searchBy === 'name' }
          onChange={ handleSearchByChange }
          data-testid="name-search-radio"
        />
        Nome
      </label>

      <label>
        <input
          type="radio"
          value="first-letter"
          checked={ searchBy === 'first-letter' }
          onChange={ handleSearchByChange }
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>

      <button
        type="button"
        onClick={ handleSearchButtonClick }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default SearchBar;
