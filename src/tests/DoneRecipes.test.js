import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import AppProvider from '../context/AppProvider';

const magicNumberDate = '23/06/2020';
const magicNumberZeroHorizontal = '0-horizontal-name';
const magicNumberOneHorizontal = '1-horizontal-name';
const linkCopied = 'Link copied!';

const doneRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: magicNumberDate,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: magicNumberDate,
    tags: [],
  },
];

describe('Testa a pagina DoneRecipes', () => {
  let history;

  beforeEach(async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

    history = createMemoryHistory();
    const initialRoute = '/done-recipes';
    history.push(initialRoute);

    await act(async () => {
      render(
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>,
      );
    });
  });

  it('Os cards de meals tem os atributos corretos', () => {
    const image = screen.getByTestId('0-horizontal-image');
    const topText = screen.getByTestId('0-horizontal-top-text');
    const name = screen.getByTestId(magicNumberZeroHorizontal);
    const doneDate = screen.getByTestId('0-horizontal-done-date');
    const firstTag = screen.getByTestId('0-Pasta-horizontal-tag');
    const secondTag = screen.getByTestId('0-Curry-horizontal-tag');

    expect(image).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(topText).toHaveTextContent('Italian - Vegetarian');
    expect(name).toHaveTextContent('Spicy Arrabiata Penne');
    expect(doneDate).toHaveTextContent(magicNumberDate);
    expect(firstTag).toHaveTextContent('Pasta');
    expect(secondTag).toHaveTextContent('Curry');
  });

  it('Os cards de drinks tem os atributos corretos', async () => {
    expect(screen.getByTestId('1-horizontal-image'))
      .toHaveAttribute('src', doneRecipesMock[1].image);
    expect(screen.getByTestId('1-horizontal-top-text'))
      .toHaveTextContent(doneRecipesMock[1].alcoholicOrNot);
    expect(screen.getByTestId(magicNumberOneHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
    expect(screen.getByTestId('1-horizontal-share-btn'))
      .toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date'))
      .toHaveTextContent(magicNumberDate);
  });

  it('Ao clicar no botão de compartilhar, exibe a mensagem "Link copied!"', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/meals/52771',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });

  it('Ao clicar no botão "Meal", as receitas devem ser filtradas por comidas', async () => {
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');

    userEvent.click(filterByMealButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[0].name);
    expect(screen.queryByTestId(magicNumberOneHorizontal)).toBeNull();
  });

  it('Ao clicar no botão "Drinks", as receitas devem ser filtradas por bebidas', async () => {
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterByDrinkButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
    expect(screen.queryByTestId(magicNumberOneHorizontal)).toBeNull();
  });

  it('Ao clicar no botão "All", o filtro deve ser removido', async () => {
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');

    userEvent.click(filterByMealButton);
    userEvent.click(filterByAllButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[0].name);
    expect(screen.getByTestId(magicNumberOneHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
  });

  it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const image = screen.getByTestId('0-horizontal-image');
    userEvent.click(image);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const name = screen.getByTestId(magicNumberOneHorizontal);
    userEvent.click(name);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Ao clicar no botão de compartilhar de um meal, a URL correta é copiada', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/meals/52771',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });

  it('Ao clicar no botão de compartilhar de um drink, a URL correta é copiada', async () => {
    const shareButton = screen.getByTestId('1-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/drinks/178319',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });
});
