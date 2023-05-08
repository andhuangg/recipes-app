import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

test('Redenrizando o header', () => {
  render(<Header />);
});

test('Testanto testids', () => {
  const { getByTestId } = render(<Header />);
  expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  expect(getByTestId('search-top-btn')).toBeInTheDocument();
  expect(getByTestId('search-input')).toBeInTheDocument();
  expect(getByTestId('page-title')).toBeInTheDocument();
});

test('Testanto history', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={ history }>
      <Header />
    </Router>,
  );
  const button = getByTestId('profile-top-btn');
  fireEvent.click(button);
  expect(history.location.pathname).toBe('/profile');
});

test('Testanto evento', () => {
  const { getByTestId } = render(<Header />);
  const input = getByTestId('search-input');
  fireEvent.click(input);
  // add assertion for the expected behavior
});

test('Testanto proptypes', () => {
  expect(Header).toEqual({
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  });
});
