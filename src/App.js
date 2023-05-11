import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinksDetails from './pages/DrinksDetails';
import MealsDetails from './pages/MealsDetails';
// import Header from './components/Header';
import Footer from './components/Footer';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      {/* <Header /> */}
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
          path="/meals/:id-da-receita/in-progress"
          render={ () => (<RecipeInProgress />) }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          render={ () => (<RecipeInProgress />) }
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
      <Footer />
    </div>
  );
}

export default App;
