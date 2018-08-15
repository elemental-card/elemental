import React from 'react';
import ConfirmSection from './components/ConfirmSection';
import BackSection from './components/BackSection';
import Container from './components/Container';

export default () => [
  <ConfirmSection
    status="pending"
    onClick={() => alert('Confirmed!')}
    label="Confirm"
  />,
  <BackSection
    status="pending"
    onClick={() => alert('Canceled.')}
    label="Cancel"
  />,
  <Container left darkGrey />
];
