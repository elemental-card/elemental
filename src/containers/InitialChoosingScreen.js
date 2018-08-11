import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

const areInitialsValid = (initials) => /^\w{1,3}$/.test(initials);

export default ({
  tentativeInitials,
  onEditTentativeInitials,
  onConfirmTentativeInitials,
  onBack,
}) => [
  <ConfirmSection
    isEnabled={areInitialsValid(tentativeInitials)}
    onClick={onConfirmTentativeInitials}
    label="Confirm"
  />,
  <BackSection
    onClick={onBack}
    label="Home"
  />,
  <Container left lightGrey>
    <Header>Type your initials (3 max):</Header>
    <TextInput
      value={tentativeInitials }
      onChange={onEditTentativeInitials}
    />
  </Container>
];
