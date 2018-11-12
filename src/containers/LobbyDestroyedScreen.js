import React from "react";
import ConfirmSection from "../components/ConfirmSection";
import BackSection from "../components/BackSection";
import Container from "../components/Container";
import Header from "../components/Header";

export default ({ onHome }) => [
  <ConfirmSection status="enabled" onClick={onHome} label="Continue" />,
  <BackSection empty />,
  <Container left lightGrey>
    <Header>The game room you were in was destroyed.</Header>
  </Container>,
];
