import React from 'react';
import '../styles/TextInput.css';

export default ({ value, onChange }) => (
  <input
    className="TextInput"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
