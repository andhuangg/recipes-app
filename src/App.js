import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinksDetails from './pages/DrinksDetails';
import MealsDetails from './pages/MealsDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<Login />) }
        />
        <Route
          exact
          path="/meals"
          render={ () => (<Recipes />) }
        />
        <Route
          exact
          path="/drinks"
          render={ () => (<Recipes />) }
        />
        <Route
          exact
          path="/meals/:id"
          render={ () => (<MealsDetails />) }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ () => (<DrinksDetails />) }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (routeProps) => (<RecipeInProgress { ...routeProps } />) }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (routeProps) => (<RecipeInProgress { ...routeProps } />) }
        />
        <Route
          exact
          path="/done-recipes"
          render={ () => (<DoneRecipes />) }
        />
        <Route
          exact
          path="/favorite-recipes"
          render={ () => (<FavoriteRecipes />) }
        />
        <Route
          exact
          path="/profile"
          render={ () => (<Profile />) }
        />
      </Switch>
    </div>
  );
}

export default App;
