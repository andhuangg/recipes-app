import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  drinksFetchData,
  mealsFetchData,
  mealsFetchCategories,
  drinksFetchCategories,
} from '../services/fetchApi';

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  const getDataMeals = useCallback(async () => {
    const data = await mealsFetchData();
    const mealsListToRender = [];
    data.meals.forEach((meal, index) => {
      const maxLength = 11;
      if (index <= maxLength) {
        mealsListToRender.push(meal);
      }
    });
    setDataMeals(mealsListToRender);
  }, [setDataMeals]);

  const getDataDrinks = useCallback(async () => {
    const data = await drinksFetchData();
    const drinksListToRender = [];
    data.drinks.forEach((drinks, index) => {
      const maxLength = 11;
      if (index <= maxLength) {
        drinksListToRender.push(drinks);
      }
    });
    setDataDrinks(drinksListToRender);
  }, [setDataDrinks]);

  const getCategoriesMeals = useCallback(async () => {
    const categories = await mealsFetchCategories();
    const categoriesListToRender = [];
    categories.meals.forEach((category, index) => {
      const maxLength = 4;
      if (index <= maxLength) {
        categoriesListToRender.push(category);
      }
    });
    setCategoriesMeals(categoriesListToRender);
  }, [setCategoriesMeals]);

  const getCategoriesDrinks = useCallback(async () => {
    const categories = await drinksFetchCategories();
    const categoriesListToRender = [];
    categories.drinks.forEach((category, index) => {
      const maxLength = 4;
      if (index <= maxLength) {
        categoriesListToRender.push(category);
      }
    });
    setCategoriesDrinks(categoriesListToRender);
  }, [setCategoriesDrinks]);

  useEffect(() => {
    getDataMeals();
    getDataDrinks();
    getCategoriesMeals();
    getCategoriesDrinks();
  }, [getDataMeals, getDataDrinks, getCategoriesMeals, getCategoriesDrinks]);

  const values = useMemo(() => ({
    dataMeals,
    dataDrinks,
    setDataMeals,
    setDataDrinks,
    categoriesMeals,
    setCategoriesMeals,
    categoriesDrinks,
    setCategoriesDrinks,
  }), [dataDrinks,
    dataMeals,
    setDataMeals,
    setDataDrinks,
    categoriesMeals,
    setCategoriesMeals,
    categoriesDrinks,
    setCategoriesDrinks,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
