import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <a href="/drinks">
        <img src={ drinkIcon } alt="" data-testid="drinks-bottom-btn" />
      </a>

      <a href="/meals">
        <img src={ mealIcon } alt="" data-testid="meals-bottom-btn" />
      </a>
    </footer>
  );
}

export default Footer;
