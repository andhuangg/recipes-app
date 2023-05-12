import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinksRecipesCard from '../components/DrinksRecipesCard';
import MealsRecipesCard from '../components/MealsRecipesCard';
import Footer from '../components/Footer';

function Recipes() {
  return (
    <div>
      <Switch>
        <Route path="/meals">
          <MealsRecipesCard />
        </Route>
        <Route path="/drinks">
          <DrinksRecipesCard />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default Recipes;
