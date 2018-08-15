import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

const areInitialsValid = (initials) => /^\w{1,3}$/.test(initials);

export default ({
  tentativeInitials,
  isPending,

  onEditTentativeInitials,
  onConfirmTentativeInitials,
  onBack,
}) => [
  <ConfirmSection
    status={
      isPending
        ? 'pending'
        : areInitialsValid(tentativeInitials) ? 'enabled' : 'disabled'
    }
    onClick={onConfirmTentativeInitials}
    label="Confirm"
  />,
  <BackSection
    status="enabled"
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
