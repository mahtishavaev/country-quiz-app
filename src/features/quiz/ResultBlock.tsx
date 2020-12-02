import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, AppState } from "../../redux/types";
import { tryAgain } from "./quizSlice";

const Container = styled.div`
  padding: 35px 100px;
  min-height: 530px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 575.98px) {
    padding: 35px 10px;
  }
`;

const Img = styled.img.attrs({
  src: "/assets/undraw_winners_ao2o 2.svg",
  alt: "",
})``;

const Title = styled.h2`
  font-weight: bold;
  font-size: 48px;
  color: #1d355d;
`;

const Text = styled.div`
  font-size: 18px;
  color: #1d355d;
`;

const Score = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: #6fcf97;
`;

const Button = styled.div.attrs({
  children: "Try again",
})`
  padding: 18px 60px;
  font-weight: 600;
  font-size: 18px;
  color: #1d355d;
  border: 2px solid #1d355d;
  border-radius: 12px;
  margin-top: 50px;
  cursor: pointer;
  &:hover {
    background: #f9a826;
    border: 2px solid #f9a826;
    color: #ffffff;
  }
`;
export const ResultBlock = () => {
  const score = useSelector((state: AppState) => state.quiz.correctAnswersCount);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container>
      <Img />
      <Title>Results</Title>
      <Text>
        You got <Score>{score}</Score> correct answers
      </Text>
      <Button onClick={() => dispatch(tryAgain())} />
    </Container>
  );
};
