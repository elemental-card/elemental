import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

export default () => (
  <Container fullscreen lightGrey>
    <Header>Connecting to server...</Header>
    <LoadingSpinner />
  </Container>
);
