import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../../redux/types";
import { QuestionBlock } from "./QuestionBlock";
import { ResultBlock } from "./ResultBlock";

const Wrapper = styled.div`
  position: relative;
  width: 460px;
  margin: 0 auto;
  @media (max-width: 575.98px) {
    width: auto;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  text-transform: uppercase;
  color: #f2f2f2;
  margin: 0;
  @media (max-width: 575.98px) {
    font-size: 28px;
  }
`;

const Footer = styled.footer`
  font-weight: 600;
  font-size: 14px;
  color: #f2f2f2;
  margin-top: 80px;
  padding-bottom: 20px;
  text-align: center;
`;
export const Quiz = () => {
  const isQuizFinished = useSelector((state: AppState) => state.quiz.isQuizFinished);

  return (
    <Wrapper>
      <Header>
        <Title>Country Quiz</Title>
      </Header>
      {isQuizFinished ? <ResultBlock /> : <QuestionBlock />}
      <Footer>mahtishavaev @ DevChallenges.io</Footer>
    </Wrapper>
  );
};
