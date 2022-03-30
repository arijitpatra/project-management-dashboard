// NOTE: This file can be made even more modularized and shorter
import { useRef, useEffect, createRef } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { CardComponent } from "../components/CardComponent";
import { onDragOver, onDrop, onDragStart } from "../utils/utils";
import { BoardComponent } from "../components/BoardComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  addBoardAction,
  addCardAction,
  deleteBoardAction,
  deleteCardAction,
  dragAndDropAction,
  resetDataAction,
} from "../redux/globalSlice";

const Dashboard = () => {
  const { boards, generatedId } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const titleInputRef = useRef(null);
  let cardTitleInputRefs = useRef([]);
  let cardTextInputRefs = useRef([]);
  cardTitleInputRefs = boards.map(() => createRef());
  cardTextInputRefs = boards.map(() => createRef());

  const handleAddBoard = (title) => {
    if (title.trim() !== "") {
      dispatch(addBoardAction({ id: generatedId, title: title.trim() }));
    } else {
      alert("please enter values");
    }
  };

  const handleAddCard = (boardId, cardTitle, cardText) => {
    if (cardTitle.trim() !== "" && cardText.trim() !== "") {
      dispatch(
        addCardAction({
          id: generatedId,
          cardTitle: cardTitle.trim(),
          cardText: cardText.trim(),
          boardId,
        })
      );
    } else {
      alert("please enter values");
    }
  };

  const handleBoardDelete = (boardId) => {
    dispatch(deleteBoardAction({ boardId }));
  };

  const handleCardDelete = (cardId, boardId) => {
    dispatch(deleteCardAction({ cardId, boardId }));
  };

  const handleDragAndDropChange = (textData, boardId) => {
    dispatch(dragAndDropAction({ textData, boardId }));
  };

  const handleOnDrop = (e, boardTitle, boardId) => {
    if (boardTitle.length > 0) onDrop(e, boardId, handleDragAndDropChange);
  };

  const getAddCardInputsAndButton = (board, index) => (
    <>
      <div className="d-f f-d-c">
        <input
          onDrop={(e) => handleOnDrop(e, board.title, board.id)}
          onDragOver={onDragOver}
          placeholder="enter card title"
          type="text"
          maxLength={15}
          className="m-05-0"
          ref={cardTitleInputRefs[index]}
        />
        <input
          onDrop={(e) => handleOnDrop(e, board.title, board.id)}
          onDragOver={onDragOver}
          placeholder="enter card description"
          type="text"
          ref={cardTextInputRefs[index]}
        />
      </div>

      <ButtonComponent
        label="add card"
        onClick={() => {
          handleAddCard(
            board.id,
            cardTitleInputRefs[index].current.value,
            cardTextInputRefs[index].current.value
          );
          cardTitleInputRefs[index].current.value = null;
          cardTextInputRefs[index].current.value = null;
        }}
        classNameProp="m-05-0"
      />
    </>
  );

  const getBoardAdder = () => (
    <BoardComponent>
      <div className="d-f f-d-c">
        <input
          onDrop={(e) => handleOnDrop(e, "", "")}
          onDragOver={onDragOver}
          placeholder="enter board title"
          type="text"
          maxLength={15}
          ref={titleInputRef}
        />
      </div>

      <ButtonComponent
        label="add title"
        onClick={() => {
          handleAddBoard(titleInputRef.current.value);
          titleInputRef.current.value = null;
        }}
        classNameProp="m-05-0"
      />
    </BoardComponent>
  );

  useEffect(
    () => localStorage.setItem("boards", JSON.stringify(boards)),
    [boards]
  );

  return (
    <>
      <h1 data-testid="dashboard-heading">
        Dashboard <code onClick={() => dispatch(resetDataAction())}>reset</code>
      </h1>

      {boards.map((board, index) => {
        const { id: boardId, title: boardTitle, cards: boardCards } = board;

        return (
          <BoardComponent
            title={boardTitle}
            key={index}
            onBoardDelete={() => handleBoardDelete(boardId)}
          >
            <div
              onDrop={(e) => handleOnDrop(e, boardTitle, boardId)}
              onDragOver={onDragOver}
            >
              {boardCards.length > 0 && boardTitle.length > 0
                ? boardCards.map((card, index) => {
                    const {
                      id: cardId,
                      title: cardTitle,
                      text: cardText,
                    } = card;

                    return (
                      <CardComponent
                        id={cardId}
                        title={cardTitle}
                        text={cardText}
                        key={cardTitle + index}
                        onCardDelete={() => handleCardDelete(cardId, boardId)}
                        isDraggable={true}
                        onDragStart={onDragStart}
                      />
                    );
                  })
                : ""}
            </div>

            {getAddCardInputsAndButton(board, index)}
          </BoardComponent>
        );
      })}

      {getBoardAdder()}
    </>
  );
};

export default Dashboard;
