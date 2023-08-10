import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="d-flex justify-content-between align-items-center bg-darkorange h-45"
    >

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Link to="/meals">
          <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
        </Link>
      </div>

      <div className="divider" />

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Link to="/drinks">
          <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
        </Link>
      </div>

    </footer>
  );
}

export default Footer;
