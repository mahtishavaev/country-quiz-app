import { combineReducers } from "redux";
import { quizReducer } from "../features/quiz/quizSlice";

export const rootReducer = combineReducers({
  quiz: quizReducer,
});
