import React, { FC } from "react";
import styled from "styled-components";
import { QuestionOption } from "./quizSlice";

const CorrectOptionIcon = styled.span.attrs({
  className: "material-icons",
  children: "check_circle_outline",
})`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;
const IncorrectOptionIcon = styled.span.attrs({
  className: "material-icons",
  children: "highlight_off",
})`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const CountryName = styled.span`
  margin: 0 30px;
`;

type DefaultOptionType = { disabled: boolean };

const DefaultOption = styled.li<DefaultOptionType>`
  background: #ffffff;
  border: 2px solid rgba(96, 102, 208, 0.7);
  border-radius: 12px;
  padding: 15px 50px 15px 20px;
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 18px;
  color: rgba(96, 102, 208, 0.8);
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f9a826;
    border: 2px solid #f9a826;
    color: #ffffff;
  }
  ${(props) => props.disabled && "pointer-events:none"};
  @media (max-width: 575.98px) {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const CorrectOption = styled(DefaultOption)`
  background: #60bf88;
  color: #ffffff;
  border: 2px solid #60bf88;
  &:hover {
    background: #60bf88;
    color: #ffffff;
    border: 2px solid #60bf88;
  }
`;
const IncorrectOption = styled(DefaultOption)`
  background: #ea8282;
  color: #ffffff;
  border: 2px solid #ea8282;
  &:hover {
    background: #ea8282;
    color: #ffffff;
    border: 2px solid #ea8282;
  }
`;

type PropsType = {
  option: QuestionOption;
  onClick: () => void;
  disabled: boolean;
};

export const Option: FC<PropsType> = ({ option, disabled, onClick }) => {
  if (option.showStatus && option.isCorrect) {
    return (
      <CorrectOption disabled={disabled}>
        <CountryName>{option.name}</CountryName>
        <CorrectOptionIcon />
      </CorrectOption>
    );
  }
  if (option.showStatus && !option.isCorrect) {
    return (
      <IncorrectOption disabled={disabled}>
        <CountryName>{option.name}</CountryName>
        <IncorrectOptionIcon />
      </IncorrectOption>
    );
  }

  return (
    <DefaultOption onClick={onClick} disabled={disabled}>
      <CountryName>{option.name}</CountryName>
    </DefaultOption>
  );
};
