import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './context/AppProvider';
import RecipeProvider from './context/RecipeProvider';
import HeaderProvider from './context/HeaderProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <HeaderProvider>
        <RecipeProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </RecipeProvider>
      </HeaderProvider>
    </BrowserRouter>,
  );
