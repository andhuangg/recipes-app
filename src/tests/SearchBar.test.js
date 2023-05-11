import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipeProvider from '../context/RecipeProvider';
import AppProvider from '../context/AppProvider';

describe('Testa o componente <SearchBar />', () => {
  const history = createMemoryHistory({ initialEntries: ['/meals'] });

  const renderAndClickSearchBtn = (initialRoute) => {
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
    const searchBtn = screen.getByRole('img', {
      name: /searchIcon/i,
    });
    userEvent.click(searchBtn);
  };

  const searchInputText = 'search-input';
  const nameRadioButton = 'name-search-radio';
  const searchButton = 'exec-search-btn';

  it('Testa se tem o input, radio buttons e botão buscar', () => {
    renderAndClickSearchBtn('/meals');

    const searchInput = screen.getByTestId(searchInputText);
    const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(searchButton);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadioBtn).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Testa se é redirecionado quando o resultado é somente um meal', async () => {
    renderAndClickSearchBtn('/meals');
    const searchInput = screen.getByTestId(searchInputText);
    const nameRadioBtn = screen.getByTestId(nameRadioButton);
    const searchBtn = screen.getByTestId(searchButton);

    userEvent.click(nameRadioBtn);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(searchBtn);

    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa se é redirecionado quando o resultado é somente um drink', async () => {
    renderAndClickSearchBtn('/drinks');
    const searchInput = screen.getByTestId(searchInputText);
    const nameRadioBtn = screen.getByTestId(nameRadioButton);
    const searchBtn = screen.getByTestId(searchButton);

    userEvent.click(nameRadioBtn);
    userEvent.type(searchInput, 'A1');
    userEvent.click(searchBtn);

    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa se é disparado alert quando nenhuma receita é encontrada pela busca', async () => {
    renderAndClickSearchBtn('/meals');
    const alert = jest.spyOn(window, 'alert');
    const searchInput = screen.getByTestId(searchInputText);
    const nameRadioBtn = screen.getByTestId(nameRadioButton);
    const searchBtn = screen.getByTestId(searchButton);

    userEvent.click(nameRadioBtn);
    userEvent.type(searchInput, 'lasanhagigante');
    userEvent.click(searchBtn);

    await waitFor(() => expect(alert).toBeCalled());
  });

  it('Testa se ao selecionar Primeira Letra e buscar com mais de uma letra, um erro é disparado', () => {
    renderAndClickSearchBtn('/meals');
    const alert = jest.spyOn(window, 'alert');
    const searchInput = screen.getByTestId(searchInputText);
    const firstLetterBtn = screen.getByText(/primeira letra/i);
    const searchBtn = screen.getByTestId(searchButton);

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'aaa');
    userEvent.click(searchBtn);

    expect(alert).toBeCalled();
  });

  it('Testa se após clicar em Buscar, o input é limpo', async () => {
    renderAndClickSearchBtn('/meals');
    const searchInput = screen.getByTestId(searchInputText);
    const ingredientsBtn = screen.getByText(/ingrediente/i);
    const searchBtn = screen.getByTestId(searchButton);

    userEvent.type(searchInput, 'lemon');
    userEvent.click(ingredientsBtn);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(searchInput).toHaveValue('');
    });
  });

  it('Testa se é possível buscar por primeira letra e obter resultados da API', async () => {
    renderAndClickSearchBtn('/meals');

    const searchInput = screen.getByTestId(searchInputText);
    const firstLetterBtn = screen.getByText(/primeira letra/i);
    const searchBtn = screen.getByTestId(searchButton);

    firstLetterBtn.click();
    userEvent.type(searchInput, 'a');
    searchBtn.click();

    waitFor(() => {
      const fetchResult = screen.getByText('/apple & blackberry crumble/i');
      expect(fetchResult).toBeInTheDocument();
    });
  });

  it('Testa se é possível buscar por ingrediente e obter resultados da API', async () => {
    renderAndClickSearchBtn('/drinks');

    const searchInput = screen.getByTestId(searchInputText);
    const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchButton);

    ingredientRadioBtn.click();
    userEvent.type(searchInput, 'gin');
    searchBtn.click();

    waitFor(() => {
      const fetchResult = screen.getByText('/69 special/i');
      expect(fetchResult).toBeInTheDocument();
    });
  });
});
