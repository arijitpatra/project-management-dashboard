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
  cardTitleInputRefs = boards.map((board, index) => createRef());
  cardTextInputRefs = boards.map((board, index) => createRef());

  const addBoard = (title) => {
    if (title.trim() !== "") {
      dispatch(addBoardAction({ id: generatedId, title: title.trim() }));
    } else {
      alert("please enter values");
    }
  };

  const addCard = (boardTitle, cardTitle, cardText) => {
    if (cardTitle.trim() !== "" && cardText.trim() !== "") {
      dispatch(
        addCardAction({
          id: generatedId,
          cardTitle: cardTitle.trim(),
          cardText: cardText.trim(),
          boardTitle,
        })
      );
    } else {
      alert("please enter values");
    }
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

  const onDropEvent = (e, boardTitle) => {
    if (boardTitle.length > 0) onDrop(e, boardTitle, handleDragAndDropChange);
  };

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
        return (
          <BoardComponent
            title={board.title}
            key={index}
            onBoardDelete={() => handleBoardDelete(board.id)}
          >
            <div
              onDrop={(e) => onDropEvent(e, board.title)}
              onDragOver={onDragOver}
            >
              {board.cards.length > 0 && board.title.length > 0
                ? board.cards.map((card, index) => {
                    return (
                      <CardComponent
                        title={card.title}
                        text={card.text}
                        key={card.title + index}
                        onCardDelete={() =>
                          handleCardDelete(board.title, card.id)
                        }
                        isDraggable={true}
                        onDragStart={onDragStart}
                      />
                    );
                  })
                : ""}
            </div>
            <div className="d-f f-d-c">
              <input
                onDrop={(e) => onDropEvent(e, board.title)}
                onDragOver={onDragOver}
                placeholder="enter card title"
                type="text"
                maxLength={15}
                className="m-05-0"
                ref={cardTitleInputRefs[index]}
              />
              <input
                onDrop={(e) => onDropEvent(e, board.title)}
                onDragOver={onDragOver}
                placeholder="enter card description"
                type="text"
                ref={cardTextInputRefs[index]}
              />
            </div>

            <ButtonComponent
              label="add card"
              onClick={() => {
                addCard(
                  board.title,
                  cardTitleInputRefs[index].current.value,
                  cardTextInputRefs[index].current.value
                );
                cardTitleInputRefs[index].current.value = null;
                cardTextInputRefs[index].current.value = null;
              }}
              classNameProp="m-05-0"
            />
          </BoardComponent>
        );
      })}

      <BoardComponent>
        <div className="d-f f-d-c">
          <input
            onDrop={(e) => onDropEvent(e, "")}
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
            addBoard(titleInputRef.current.value);
            titleInputRef.current.value = null;
          }}
          classNameProp="m-05-0"
        />
      </BoardComponent>
    </>
  );
};

export default Dashboard;
