import { createSlice, nanoid } from "@reduxjs/toolkit";

// ✅ Fixed typo in "Angular" and length mismatch in votes
const initialState = {
  polls: [
    {
      id: nanoid(),
      question: "Which JS framework do you like?",
      options: ["React", "Vue", "Svelte", "Angular"],
      votes: [0, 0, 0, 0],
    },
  ],
  currentPoll: null,
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setPoll: (state, action) => {
      state.polls = action.payload;
    },
    setCurrentPoll: (state, action) => {
      state.currentPoll = action.payload;
    },
    updateVote: (state, action) => {
      // Action payload: { optionIndex: number }
      const index = action.payload;
      if (
        state.currentPoll &&
        index >= 0 &&
        index < state.currentPoll.votes.length
      ) {
        state.currentPoll.votes[index] += 1;
      }
    },
  },
});

export const { setPoll, setCurrentPoll, updateVote } = pollSlice.actions;
export default pollSlice.reducer;