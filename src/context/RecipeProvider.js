import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  drinksFetchData,
  mealsFetchData,
  mealsFetchCategories,
  drinksFetchCategories,
  filteredMealsFetch,
  filteredDrinksFetch,
} from '../services/fetchApi';

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const [dataMeals, setDataMeals] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [filteredDataMeals, setFilteredDataMeals] = useState([]);
  const [appliedMealsFilter, setAppliedMealsFilter] = useState('');

  const [dataDrinks, setDataDrinks] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [filteredDataDrinks, setFilteredDataDrinks] = useState([]);
  const [appliedDrinksFilter, setAppliedDrinksFilter] = useState('');

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

  const getFilteredMeals = useCallback(async () => {
    const data = await filteredMealsFetch(appliedMealsFilter);
    return data;
  }, [appliedMealsFilter]);

  const getFilteredDrinks = useCallback(async () => {
    const data = await filteredDrinksFetch(appliedDrinksFilter);
    return data;
  }, [appliedDrinksFilter]);

  useEffect(() => {
    getDataMeals();
    getDataDrinks();
    getCategoriesMeals();
    getCategoriesDrinks();
    if (appliedDrinksFilter) {
      getFilteredDrinks().then((data) => {
        const { drinks } = data;
        const maxLength = 12;
        const filteredDrinksToRender = drinks.slice(0, maxLength);
        setFilteredDataDrinks(filteredDrinksToRender);
      });
    }
    if (appliedMealsFilter) {
      getFilteredMeals().then((data) => {
        const { meals } = data;
        const maxLength = 12;
        const filteredMealsToRender = meals.slice(0, maxLength);
        setFilteredDataMeals(filteredMealsToRender);
      });
    }
  }, [
    getDataMeals,
    getDataDrinks,
    getCategoriesMeals,
    getCategoriesDrinks,
    getFilteredMeals,
    getFilteredDrinks,
    setFilteredDataMeals,
    appliedDrinksFilter,
    appliedMealsFilter,
  ]);

  const values = useMemo(() => ({
    dataMeals,
    setDataMeals,
    categoriesMeals,
    setCategoriesMeals,
    filteredDataMeals,
    setFilteredDataMeals,
    appliedMealsFilter,
    setAppliedMealsFilter,

    dataDrinks,
    setDataDrinks,
    categoriesDrinks,
    setCategoriesDrinks,
    appliedDrinksFilter,
    setAppliedDrinksFilter,
    filteredDataDrinks,
    setFilteredDataDrinks,
  }), [
    dataMeals,
    setDataMeals,
    categoriesMeals,
    setCategoriesMeals,
    filteredDataMeals,
    setFilteredDataMeals,
    appliedMealsFilter,
    setAppliedMealsFilter,

    dataDrinks,
    setDataDrinks,
    categoriesDrinks,
    setCategoriesDrinks,
    appliedDrinksFilter,
    setAppliedDrinksFilter,
    filteredDataDrinks,
    setFilteredDataDrinks,
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
