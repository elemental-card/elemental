import React from 'react';
import '../styles/List.css';

const getClassName = (isSelected) => {
  return 'List__Item' + (isSelected
    ? ' List__Item--selected'
    : ''
  );
};

export default ({ children, onClick, isSelected }) => (
  <div className={getClassName(isSelected)} onClick={onClick}>
    {children}
  </div>
);
