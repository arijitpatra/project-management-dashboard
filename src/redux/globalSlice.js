import { createSlice } from "@reduxjs/toolkit";
import { data } from "../utils/utils";

const initialState = {
  generatedId: data.generatedId,
  boards: JSON.parse(localStorage.getItem("boards")) || data.boards,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addBoardAction: (state, action) => {
      state.boards.push({
        id: action.payload.id,
        title: action.payload.title,
        cards: [],
      });

      state.generatedId += 1;
    },
    addCardAction: (state, action) => {
      state.boards.map((item) => {
        if (item.title === action.payload.boardTitle) {
          item.cards.push({
            id: action.payload.id,
            title: action.payload.cardTitle,
            text: action.payload.cardText,
          });
        }
        return item;
      });

      state.generatedId += 1;
    },
    deleteBoardAction: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload.boardId
      );
    },
    deleteCardAction: (state, action) => {
      state.boards.map((item) => {
        if (item.title === action.payload.boardTitle) {
          item.cards = item.cards.filter(
            (card) => card.id !== action.payload.cardId
          );
        }
        return item;
      });
    },
    dragAndDropAction: (state, action) => {
      const [cardTitle, cardText] = action.payload.textData.split("*");
      const x = state.boards.map((item) => {
        const cards = item.cards.filter(
          (i) => i.title !== cardTitle && i.text !== cardText
        );
        item.cards = cards;
        return item;
      });

      state.boards = x.map((item) => {
        if (item.title === action.payload.boardTitle) {
          item.cards.push({
            id: state.generatedId,
            title: cardTitle,
            text: cardText,
          });
          state.generatedId += 1;
        }
        return item;
      });
    },
    resetDataAction: (state) => {
      state.boards = data.boards;
      state.generatedId = data.generatedId;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBoardAction,
  addCardAction,
  deleteBoardAction,
  deleteCardAction,
  dragAndDropAction,
  resetDataAction,
} = globalSlice.actions;

export default globalSlice.reducer;