import { createSlice } from "@reduxjs/toolkit";

const savedGameData = localStorage.getItem("gameData");
let parsedGame = null;

if (savedGameData) {
  try {
    parsedGame = JSON.parse(savedGameData);
  } catch (error) {
    console.error("Error parsing gameData:", error);
  }
}

const initialState = {
  selectedCategories: parsedGame?.selectedCategories || [],
  questionBank: parsedGame?.questionBank || {},
  gameName: parsedGame?.gameName || "",
  teamOne: parsedGame?.teamOne || "",
  teamTwo: parsedGame?.teamTwo || "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.selectedCategories = action.payload.selectedCategories;
      state.questionBank = action.payload.questionBank;
      state.gameName = action.payload.gameName || state.gameName;
      state.teamOne = action.payload.teamOne || state.teamOne;
      state.teamTwo = action.payload.teamTwo || state.teamTwo;

      localStorage.setItem("gameData", JSON.stringify(state));
    },
    setGameNames: (state, action) => {
      state.gameName = action.payload.gameName;
      state.teamOne = action.payload.teamOne;
      state.teamTwo = action.payload.teamTwo;

      localStorage.setItem("gameData", JSON.stringify(state));
    },
    clearGame: (state) => {
      state.selectedCategories = [];
      state.questionBank = {};
      state.gameName = "";
      state.teamOne = "";
      state.teamTwo = "";
      localStorage.removeItem("gameData");
    },
  },
});

export const { setGame, setGameNames, clearGame } = gameSlice.actions;
export default gameSlice.reducer;
