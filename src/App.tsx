import React from "react";
import styled from "styled-components";
import { Quiz } from "./features/quiz/Quiz";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 10px;
  padding-right: 10px;
  background: url("/assets/background.png") center/ cover fixed;
  font-family: "Poppins", sans-serif;
  @media (max-width: 575.98px) {
    padding-top: 20px;
  }
`;

export const App = () => {
  return (
    <Container>
      <Quiz />
    </Container>
  );
};
