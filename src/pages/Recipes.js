import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinksRecipesCard from '../components/DrinksRecipesCard';
import MealsRecipesCard from '../components/MealsRecipesCard';
import Header from '../components/Header';

function Recipes() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/meals">
          <MealsRecipesCard />
        </Route>
        <Route path="/drinks">
          <DrinksRecipesCard />
        </Route>
      </Switch>
    </div>
  );
}

export default Recipes;
