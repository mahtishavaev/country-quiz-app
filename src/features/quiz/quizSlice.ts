import axios from "axios";
import { AppDispatch, AppState } from "../../redux/types";

//types
export interface QuizState {
  allCountries: CountryData[];
  question: Question | null;
  correctAnswersCount: number;
  isQuizFinished: boolean;
}

export interface QuestionOption {
  name: string;
  isCorrect: boolean;
  showStatus: boolean;
}

interface Question {
  type: "flag" | "capital";
  param: string;
  isAnswered: boolean;
  isAnswerCorrect?: boolean;
  options: QuestionOption[];
}

interface CountryData {
  name: string;
  capital: string;
  flag: string;
}

//init state
const initState: QuizState = {
  allCountries: [],
  question: null,
  correctAnswersCount: 0,
  isQuizFinished: false,
};

//reducer
export const quizReducer = (state: QuizState = initState, action: QuizActions): QuizState => {
  switch (action.type) {
    case "quiz/addFetchedData":
      return {
        ...state,
        allCountries: action.payload,
      };
    case "quiz/setQuestion":
      return {
        ...state,
        question: action.payload,
      };
    case "quiz/updateQuestion":
      if (state.question !== null) {
        return {
          ...state,
          question: {
            ...state.question,
            isAnswered: true,
            isAnswerCorrect: action.payload.isCorrect,
            options: state.question.options.map((item) =>
              item.isCorrect || item.name === action.payload.name ? { ...item, showStatus: true } : item
            ),
          },
        };
      }
      return state;
    case "quiz/incrementCounter":
      return {
        ...state,
        correctAnswersCount: ++state.correctAnswersCount,
      };
    case "quiz/finishQuiz":
      return {
        ...state,
        isQuizFinished: true,
      };
    case "quiz/startNewQuiz":
      return {
        ...state,
        isQuizFinished: false,
        correctAnswersCount: 0,
      };
    default:
      return state;
  }
};

//thunks
export const fetchData = () => {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get("https://restcountries.eu/rest/v2/all?fields=name;capital;flag");
    dispatch(addFetchedData(response.data));
    dispatch(generateQuestion());
  };
};

export const generateQuestion = () => (dispatch: AppDispatch, getState: () => AppState) => {
  let randomIndices: number[] = [];
  const maxIndex = getState().quiz.allCountries.length - 1;
  while (randomIndices.length < 4) {
    let number = Math.floor(Math.random() * (maxIndex + 1));
    if (!randomIndices.includes(number)) randomIndices.push(number);
  }
  const countries = randomIndices.map((item) => getState().quiz.allCountries[item]);
  let questionType: "flag" | "capital";
  Math.random() < 0.5 ? (questionType = "flag") : (questionType = "capital");
  const correctAnswerIndex = Math.floor(Math.random() * 4);
  const questionParam = countries[correctAnswerIndex][questionType];
  const questionOptions = countries.map((item, index) => {
    return index === correctAnswerIndex
      ? { name: item.name, isCorrect: true, showStatus: false }
      : { name: item.name, isCorrect: false, showStatus: false };
  });
  const question = {
    type: questionType,
    param: questionParam,
    options: questionOptions,
    isAnswered: false,
  };
  dispatch(setQuestion(question));
};

export const submitAnswer = (answer: QuestionOption) => (dispatch: AppDispatch) => {
  dispatch(updateQuestion(answer));
  if (answer.isCorrect) {
    dispatch(incrementCounter());
  } else {
    setTimeout(() => {
      dispatch(finishQuiz());
    }, 3000);
  }
};

export const tryAgain = () => (dispatch: AppDispatch) => {
  dispatch(startNewQuiz());
  dispatch(generateQuestion());
};

//action creators
const addFetchedData = (data: CountryData[]) =>
  ({
    type: "quiz/addFetchedData",
    payload: data,
  } as const);
type AddFetchedDataAction = ReturnType<typeof addFetchedData>;

const setQuestion = (question: Question) =>
  ({
    type: "quiz/setQuestion",
    payload: question,
  } as const);
type SetQuestionAction = ReturnType<typeof setQuestion>;

export const updateQuestion = (option: QuestionOption) => ({ type: "quiz/updateQuestion", payload: option } as const);
type UpdateQuestionAction = ReturnType<typeof updateQuestion>;

export const incrementCounter = () => ({ type: "quiz/incrementCounter" } as const);
type IncrementCounterAction = ReturnType<typeof incrementCounter>;

export const finishQuiz = () => ({ type: "quiz/finishQuiz" } as const);
type FinishQuizAction = ReturnType<typeof finishQuiz>;

export const startNewQuiz = () => ({ type: "quiz/startNewQuiz" } as const);
type StartNewQuizAction = ReturnType<typeof startNewQuiz>;

export type QuizActions =
  | AddFetchedDataAction
  | SetQuestionAction
  | UpdateQuestionAction
  | IncrementCounterAction
  | FinishQuizAction
  | StartNewQuizAction;
