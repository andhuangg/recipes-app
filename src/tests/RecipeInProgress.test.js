import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import { mealsInProgressMock } from './mocks/mealsInProgressMock';
import { drinksInProgressMock } from './mocks/drinksInProgressMock';
import AppProvider from '../context/AppProvider';
import App from '../App';

describe('Testa pagina meals in progress', () => {
  it('Testa se todos os elementos estão na tela de meals', async () => {
    const history = createMemoryHistory();
    const initialRoute = '/meals/52771/in-progress';
    history.push(initialRoute);

    await act(async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => mealsInProgressMock,
      });

      renderWithRouter(
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>,
        { initialEntries: [initialRoute] },
      );
    });

    window.alert = jest.fn();

    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });
});

describe('Testa pagina drinks in progress', () => {
  it('Testa se todos os elementos estão na tela de drinks', async () => {
    const history = createMemoryHistory();
    const initialRoute = '/drinks/12345/in-progress';
    history.push(initialRoute);

    await act(async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => drinksInProgressMock,
      });

      renderWithRouter(
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>,
        { initialEntries: [initialRoute] },
      );
    });

    window.alert = jest.fn();

    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });
});
