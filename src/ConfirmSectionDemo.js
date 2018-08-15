import React from 'react';
import ConfirmSection from './components/ConfirmSection';
import Container from './components/Container';

export default () => [
  <ConfirmSection
    status="pending"
    onClick={() => alert('Clicked')}
    label="Click me"
  />,
  <Container left darkGrey />
];
