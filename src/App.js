import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBoardAction,
  addCardAction,
  deleteBoardAction,
  deleteCardAction,
  dragAndDropAction,
  resetDataAction,
} from "./redux/globalSlice";
import BoardComponent from "./components/BoardComponent/BoardComponent";
import "./App.scss";

function App() {
  const boards = useSelector((state) => state.global.boards);
  const generatedId = useSelector((state) => state.global.generatedId);
  const dispatch = useDispatch();

  const addBoard = (title) => {
    dispatch(addBoardAction({ id: generatedId, title }));
  };

  const addCard = (boardTitle, cardTitle, cardText) => {
    dispatch(
      addCardAction({ id: generatedId, cardTitle, cardText, boardTitle })
    );
  };

  const handleBoardDelete = (boardId) => {
    dispatch(deleteBoardAction({ boardId }));
  };

  const handleCardDelete = (boardTitle, cardId) => {
    dispatch(deleteCardAction({ boardTitle, cardId }));
  };

  const handleDragAndDropChange = (textData, boardTitle) => {
    dispatch(dragAndDropAction({ textData, boardTitle }));
  };

  useEffect(
    () => localStorage.setItem("boards", JSON.stringify(boards)),
    [boards]
  );

  return (
    <div className="App">
      <h1>
        Dashboard <code onClick={() => dispatch(resetDataAction())}>reset</code>
      </h1>
      {boards.map((board, index) => {
        return (
          <BoardComponent
            key={index}
            title={board.title}
            cards={board.cards}
            onBtnClick={(title, text) => addCard(board.title, title, text)}
            cardDelete={(boardTitle, id) => handleCardDelete(boardTitle, id)}
            boardDelete={() => handleBoardDelete(board.id)}
            onDragAndDropChange={(textData, title) =>
              handleDragAndDropChange(textData, title)
            }
          />
        );
      })}
      <BoardComponent onBtnClick={(title) => addBoard(title)} />
    </div>
  );
}

export default App;
