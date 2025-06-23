import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "../Features/Poll/PollSlice";

export const store = configureStore({
  reducer: {
    poll: pollReducer,
  },
});