import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

export default ({ version }) => (
  <Container fullscreen lightGrey>
    <Header>Elemental v{version} - connecting to server...</Header>
    <LoadingSpinner />
  </Container>
);
