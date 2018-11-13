import React from "react";
import ConfirmSection from "../components/ConfirmSection";
import BackSection from "../components/BackSection";
import Container from "../components/Container";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import InitialsTakenAlert from "../components/InitialsTakenAlert";

const areInitialsValid = initials => /^\w{1,3}$/.test(initials);

export default ({
  tentativeInitials,
  areInitialsTaken,
  isPending,

  onEditTentativeInitials,
  onConfirmTentativeInitials,
  onAcknowledgeThatInitialsAreTaken,
  onBack,
}) => [
  <ConfirmSection
    status={
      isPending
        ? "pending"
        : areInitialsValid(tentativeInitials)
        ? "enabled"
        : "disabled"
    }
    onClick={onConfirmTentativeInitials}
    label="Confirm"
  />,
  <BackSection status="enabled" onClick={onBack} label="Back" />,
  <Container left lightGrey>
    <Header>Type your initials (3 max):</Header>
    <TextInput value={tentativeInitials} onChange={onEditTentativeInitials} />
    {areInitialsTaken && (
      <InitialsTakenAlert onClose={onAcknowledgeThatInitialsAreTaken} />
    )}
  </Container>,
];
