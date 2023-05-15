import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import RecipeInProgressComponent from '../components/RecipeInProgressComponent';

export default function RecipeInProgress() {
  const [mealData, setMealData] = useState([]);
  const { id } = useParams();
  const { path } = useRouteMatch();

  const fetchMealData = useCallback(async () => {
    const apiURL = path.includes('meals')
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    setMealData(data.meals || data.drinks);
  }, [id, path]);

  useEffect(() => {
    fetchMealData();
  }, [fetchMealData]);

  return (
    mealData.map((item, index) => (
      <RecipeInProgressComponent
        key={ index }
        mealData={ item }
      />))
  );
}
