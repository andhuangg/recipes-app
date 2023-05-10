import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const HeaderContext = createContext();

function HeaderProvider({ children }) {
  const [title, setTitle] = useState('state');

  const values = useMemo(() => ({
    title,
    setTitle,

  }), [
    title,
    setTitle,

  ]);

  return (
    <HeaderContext.Provider value={ values }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
