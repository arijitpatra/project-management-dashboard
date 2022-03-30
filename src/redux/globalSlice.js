import { createSlice } from "@reduxjs/toolkit";
import { data } from "../utils/utils";

// if boards data is present is localStorage then fetch it from there
const initialState = {
  generatedId: data.generatedId,
  boards: JSON.parse(localStorage.getItem("boards")) || data.boards,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // add a new board entry
    addBoardAction: (state, action) => {
      const { id, title } = action.payload;

      state.boards.push({
        id,
        title,
        cards: [],
      });

      state.generatedId += 1;
    },

    // add a new card entry inside the specified board
    addCardAction: (state, action) => {
      const { id, cardTitle: title, cardText: text, boardId } = action.payload;

      state.boards.map((board) => {
        if (board.id === boardId) {
          board.cards.push({
            id,
            title,
            text,
          });
        }
        return board;
      });

      state.generatedId += 1;
    },

    // delete a board entry
    deleteBoardAction: (state, action) => {
      const { boardId } = action.payload;

      state.boards = state.boards.filter((board) => board.id !== boardId);
    },

    // delete a card entry from inside the specified board
    deleteCardAction: (state, action) => {
      const { cardId, boardId } = action.payload;

      state.boards.map((board) => {
        if (board.id === boardId) {
          board.cards = board.cards.filter((card) => card.id !== cardId);
        }
        return board;
      });
    },

    /* 
      updates the store with the new data after a drag and drop event,
      during drag and drop the card changes board, remove card from old board and add in the new dropped board,
      so we need to update the store accordingly 
    */
    dragAndDropAction: (state, action) => {
      // boardId is the id of the board where the card is dropped
      const { textData, boardId } = action.payload;
      // note: here cardId is string, converted it to number where used using unary + operator
      const [cardId, cardTitle, cardText] = textData.split("*");

      // this array contains the all the boards data except the card which was dropped
      const boardsDataWithoutTheDroppedCard = state.boards.map((board) => {
        const cards = board.cards.filter((card) => card.id !== +cardId);
        board.cards = cards;
        return board;
      });

      // push the dropped card data to the new board
      state.boards = boardsDataWithoutTheDroppedCard.map((board) => {
        if (board.id === boardId) {
          board.cards.push({
            id: state.generatedId,
            title: cardTitle,
            text: cardText,
          });
          state.generatedId += 1;
        }
        return board;
      });
    },

    // reset the store to initial state
    resetDataAction: (state) => {
      state.boards = data.boards;
      state.generatedId = data.generatedId;
    },
  },
});

// Action creators are generated for each case of reducer function
export const {
  addBoardAction,
  addCardAction,
  deleteBoardAction,
  deleteCardAction,
  dragAndDropAction,
  resetDataAction,
} = globalSlice.actions;

export default globalSlice.reducer;
