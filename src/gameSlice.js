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
  teamOneScore: parsedGame?.teamOneScore || 0,
  teamTwoScore: parsedGame?.teamTwoScore || 0,
  currentTurn: parsedGame?.currentTurn || "1",
  teamOneHelpers: parsedGame?.teamOneHelpers || {
    phoneCall: true,
    doublePoints: true,
    doubleAnswers: true,
  },
  teamTwoHelpers: parsedGame?.teamTwoHelpers || {
    phoneCall: true,
    doublePoints: true,
    doubleAnswers: true,
  },
  isGameOver: parsedGame?.isGameOver || false,
  numberOfShownQuestions: parsedGame?.numberOfShownQuestions || 0,
  winnerTeam: parsedGame?.winnerTeam || null,
  isNewGame: parsedGame?.isNewGame || false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.selectedCategories = action.payload.selectedCategories
        ? action.payload.selectedCategories
        : state.selectedCategories;
      state.questionBank = action.payload.questionBank
        ? action.payload.questionBank
        : state.questionBank;
      state.gameName = action.payload.gameName || state.gameName;
      state.teamOne = action.payload.teamOne || state.teamOne;
      state.teamTwo = action.payload.teamTwo || state.teamTwo;
      state.isNewGame =
        action.payload.isNewGame !== undefined ? action.payload.isNewGame : state.isNewGame;
      // Reset scores when starting a new game
      state.teamOneScore = 0;
      state.teamTwoScore = 0;
      localStorage.setItem("gameData", JSON.stringify(state));
    },
    setGameNames: (state, action) => {
      state.gameName = action.payload.gameName || state.gameName;
      state.teamOne = action.payload.teamOne || state.teamOne;
      state.teamTwo = action.payload.teamTwo || state.teamTwo;

      localStorage.setItem("gameData", JSON.stringify(state));
    },
    clearGame: (state) => {
      state.selectedCategories = [];
      state.questionBank = {};
      state.gameName = "";
      state.teamOne = "";
      state.teamTwo = "";
      state.teamOneScore = 0;
      state.teamTwoScore = 0;
      state.currentTurn = "1";
      state.teamOneHelpers = { phoneCall: true, doublePoints: true, doubleAnswers: true };
      state.teamTwoHelpers = { phoneCall: true, doublePoints: true, doubleAnswers: true };
      state.isGameOver = false;
      state.numberOfShownQuestions = 0;
      state.winnerTeam = null;
      state.isNewGame = false;
      localStorage.removeItem("gameData");
    },
    replayGame: (state) => {
      state.teamOneScore = 0;
      state.teamTwoScore = 0;
      state.currentTurn = "1";
      state.teamOneHelpers = { phoneCall: true, doublePoints: true, doubleAnswers: true };
      state.teamTwoHelpers = { phoneCall: true, doublePoints: true, doubleAnswers: true };
      state.isGameOver = false;
      state.numberOfShownQuestions = 0;
      state.winnerTeam = null;
      state.isNewGame = false;
      state.questionBank = Object.fromEntries(
        Object.entries(state.questionBank).map(([category, questions]) => [
          category,
          questions.map((q) => ({ ...q, shown: false })),
        ])
      );
      localStorage.setItem("gameData", JSON.stringify(state));
    },
    markQuestionAsShown: (state, action) => {
      const { category, question } = action.payload;
      const categoryQuestions = state.questionBank[category];
      if (categoryQuestions) {
        const questionIndex = categoryQuestions.findIndex((q) => q.id === question.id);

        if (questionIndex !== -1) {
          state.questionBank[category][questionIndex].shown = true;
          state.numberOfShownQuestions += 1;

          localStorage.setItem("gameData", JSON.stringify(state));
        }
      }
    },
    updateTeamScore: (state, action) => {
      const { team, points } = action.payload;
      if (team === "teamOne") {
        state.teamOneScore += points;
      } else if (team === "teamTwo") {
        state.teamTwoScore += points;
      }

      localStorage.setItem("gameData", JSON.stringify(state));
    },
    adjustScore: (state, action) => {
      const { team, operation } = action.payload;
      const adjustment = operation === "add" ? 100 : -100;

      if (team === "teamOne") {
        state.teamOneScore += adjustment;
        if (state.teamOneScore < 0) state.teamOneScore = 0;
      } else if (team === "teamTwo") {
        state.teamTwoScore += adjustment;
        if (state.teamTwoScore < 0) state.teamTwoScore = 0;
      }

      localStorage.setItem("gameData", JSON.stringify(state));
    },
    switchTurn: (state) => {
      state.currentTurn = state.currentTurn === "1" ? "2" : "1";
      if (state.numberOfShownQuestions >= Object.keys(state.questionBank).length * 6) {
        state.isGameOver = true;
        state.winnerTeam =
          state.teamOneScore > state.teamTwoScore
            ? "teamOne"
            : state.teamTwoScore > state.teamOneScore
            ? "teamTwo"
            : "draw";
      }
      localStorage.setItem("gameData", JSON.stringify(state));
    },
    mutateTeamHelpers: (state, action) => {
      const { helper } = action.payload;
      if (state.currentTurn === "1") {
        state.teamOneHelpers[helper] = false;
      } else if (state.currentTurn === "2") {
        state.teamTwoHelpers[helper] = false;
      }
      localStorage.setItem("gameData", JSON.stringify(state));
    },
  },
});

export const {
  setGame,
  setGameNames,
  clearGame,
  markQuestionAsShown,
  updateTeamScore,
  adjustScore,
  switchTurn,
  mutateTeamHelpers,
  replayGame,
} = gameSlice.actions;
export default gameSlice.reducer;
