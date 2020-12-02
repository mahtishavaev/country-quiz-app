import { ThunkDispatch } from "redux-thunk";
import { QuizActions, QuizState } from "../features/quiz/quizSlice";

export type AppState = {
  quiz: QuizState;
};

export type AppActions = QuizActions;

export type AppDispatch = ThunkDispatch<AppState, unknown, AppActions>;
