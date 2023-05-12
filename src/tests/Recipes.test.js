import React from 'react';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom/cjs/react-router-dom';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import AppProvider from '../context/AppProvider';
import RecipeProvider from '../context/RecipeProvider';

const firstRecipeCardValue = '0-recipe-card';

describe('Testa página Recipes renderizando componente MealsRecipesCard', () => {
  const history = createMemoryHistory({ initialEntries: ['/meals'] });

  const renderMealsComponent = async (initialRoute) => {
    history.push(initialRoute);
    renderWithRouter(
      <RecipeProvider>
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>
      </RecipeProvider>,
      { initialEntries: ['/meals'] },
    );
    window.alert = jest.fn();
  };
  test('Testa o Fetch de data e categories do componente MealsRecipesCard', async () => {
    await renderMealsComponent('/meals');

    const firstRecipeCard = await screen.findByTestId(firstRecipeCardValue);
    expect(firstRecipeCard).toBeInTheDocument();

    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    const firstBeefRecipe = await screen.findByTestId(firstRecipeCardValue);
    expect(firstBeefRecipe).toBeInTheDocument();

    const allMealsButton = await screen.findByTestId('All-category-filter');
    userEvent.click(allMealsButton);
    expect(allMealsButton).toBeInTheDocument();

    const firstRecipeCardAgain = await screen.findByTestId(firstRecipeCardValue);
    expect(firstRecipeCardAgain).toBeInTheDocument();

    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breakfastButton);
    userEvent.click(breakfastButton);
    expect(firstRecipeCardAgain).toBeInTheDocument();
  });
});

describe('Testa página Recipes renderizando componente DrinksRecipesCard', () => {
  const history = createMemoryHistory({ initialEntries: ['/drinks'] });

  const renderDrinksComponent = async (initialRoute) => {
    history.push(initialRoute);
    renderWithRouter(
      <RecipeProvider>
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>
      </RecipeProvider>,
      { initialEntries: ['/drinks'] },
    );
    window.alert = jest.fn();
  };
  test('Testa o Fetch de data e categories do componente DrinksRecipesCard', async () => {
    await renderDrinksComponent('/drinks');

    const firstRecipeCard = await screen.findByTestId(firstRecipeCardValue);
    expect(firstRecipeCard).toBeInTheDocument();

    const ordinaryDrinkButton = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryDrinkButton).toBeInTheDocument();

    userEvent.click(ordinaryDrinkButton);
    const firstOrdinaryRecipe = await screen.findByTestId(firstRecipeCardValue);
    expect(firstOrdinaryRecipe).toBeInTheDocument();

    const allDrinksButton = await screen.findByTestId('All-category-filter');
    userEvent.click(allDrinksButton);
    expect(allDrinksButton).toBeInTheDocument();

    const firstRecipeCardAgain = await screen.findByTestId(firstRecipeCardValue);
    expect(firstRecipeCardAgain).toBeInTheDocument();

    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(cocktailButton);
    userEvent.click(cocktailButton);
    expect(firstRecipeCardAgain).toBeInTheDocument();
  });
});
