const END_POINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const mealsFetchData = async () => {
  const response = await fetch(END_POINT_MEALS);
  const data = await response.json();
  return data;
};

const END_POINT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const drinksFetchData = async () => {
  const response = await fetch(END_POINT_DRINKS);
  const data = await response.json();
  return data;
};

const END_POINT_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const mealsFetchCategories = async () => {
  const response = await fetch(END_POINT_MEALS_CATEGORIES);
  const data = await response.json();
  return data;
};

const END_POINT_DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const drinksFetchCategories = async () => {
  const response = await fetch(END_POINT_DRINKS_CATEGORIES);
  const data = await response.json();
  return data;
};

export const filteredMealsFetch = async (category) => {
  const END_POINT_FILTERED_DRINKS = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(END_POINT_FILTERED_DRINKS);
  const data = await response.json();
  return data;
};

export const filteredDrinksFetch = async (category) => {
  const END_POINT_FILTERED_MEALS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(END_POINT_FILTERED_MEALS);
  const data = await response.json();
  return data;
};

// fetch para busca de meals
export const mealsSearchByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

export const mealsSearchByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const mealsSearchByFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
};

// fetch para busca de drinks
export const drinksSearchByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { drinks: null };
  }
};

export const drinksSearchByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const drinksSearchByFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
};
