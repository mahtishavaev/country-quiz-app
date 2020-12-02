import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, AppState } from "../../redux/types";
import { Option } from "./Option";
import { generateQuestion, QuestionOption, submitAnswer } from "./quizSlice";

const Img = styled.img.attrs({
  src: "/assets/undraw_adventure_4hum 1.svg",
  alt: "",
})`
  position: absolute;
  right: 0;
  top: -20px;
  @media (max-width: 575.98px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 68px 32px 40px 32px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 575.98px) {
    width: auto;
    padding: 20px 15px;
  }
`;

const Flag = styled.img`
  width: 84px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;

const Question = styled.h2`
  font-weight: bold;
  font-size: 24px;
  color: #2f527b;
  @media (max-width: 575.98px) {
    font-size: 18px;
  }
`;

const OptionBlock = styled.ol.attrs({
  type: "A",
})`
  list-style-position: inside;
  padding: 0;
`;

const NextButton = styled.div.attrs({
  children: "Next",
})`
  display: inline-block;
  padding: 15px 35px;
  font-weight: bold;
  font-size: 18px;
  color: #ffffff;
  background: #f9a826;
  box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
  border-radius: 12px;
  margin-left: auto;
  cursor: pointer;
  @media (max-width: 575.98px) {
    font-size: 14px;
  }
`;

export const QuestionBlock = () => {
  const question = useSelector((state: AppState) => state.quiz.question);
  const dispatch = useDispatch<AppDispatch>();

  const onOptionClicked = (answer: QuestionOption) => {
    !question?.isAnswered && dispatch(submitAnswer(answer));
  };

  const onNextButtonClicked = () => {
    dispatch(generateQuestion());
  };
  return (
    <>
      <Img />
      <Container>
        {question?.type === "capital" && <Question>{question.param} is the capital of</Question>}
        {question?.type === "flag" && (
          <>
            <Flag src={question.param} /> <Question>Which country does this flag belong to?</Question>{" "}
          </>
        )}
        <OptionBlock>
          {question?.options.map((item, index) => (
            <Option
              disabled={question?.isAnswered}
              onClick={() => onOptionClicked(item)}
              option={item}
              key={index}
            ></Option>
          ))}
        </OptionBlock>
        {question?.isAnswered && question.isAnswerCorrect && <NextButton onClick={onNextButtonClicked} />}
      </Container>
    </>
  );
};
