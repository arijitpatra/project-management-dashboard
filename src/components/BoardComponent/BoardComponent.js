import { useRef } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardComponent from "../CardComponent/CardComponent";
import "./BoardComponent.scss";

const BoardComponent = ({
  title = "",
  cards = [],
  onBtnClick,
  cardDelete,
  boardDelete,
}) => {
  let titleInput = useRef(null);
  let textInput = useRef(null);

  const handleClickAndGetInputValues = () => {
    if (title.length > 0) {
      onBtnClick(titleInput.current.value, textInput.current.value);
      titleInput.current.value = null;
      textInput.current.value = null;
    } else {
      onBtnClick(titleInput.current.value);
      titleInput.current.value = null;
      textInput.current.value = null;
    }
  };

  return (
    <section className="board-component">
      {title.length > 0 && (
        <div className="d-f j-c-sb m-b-2d5">
          <h3 className="m-05-0">{title}</h3>
          <h3 className="m-05-0 cursor-pointer" onClick={boardDelete}>
            X
          </h3>
        </div>
      )}

      {cards.length > 0 && title.length > 0
        ? cards.map((card, index) => {
            return (
              <CardComponent
                title={card.title}
                text={card.text}
                key={card.title + index}
                onCardDelete={() => cardDelete(card.id)}
              />
            );
          })
        : ""}

      {title.length > 0 ? (
        <div className="d-f f-d-c">
          <input
            placeholder="enter title"
            type="text"
            maxLength={15}
            className="m-05-0"
            ref={titleInput}
          />
          <input
            placeholder="enter text for the card"
            type="text"
            ref={textInput}
          />
        </div>
      ) : (
        <div className="d-f f-d-c">
          <input
            placeholder="enter list title"
            type="text"
            maxLength={15}
            ref={titleInput}
          />
        </div>
      )}

      <ButtonComponent
        label={title.length > 0 ? "add card" : "add title"}
        handleClick={handleClickAndGetInputValues}
        classNa="m-05-0"
      />
    </section>
  );
};

export default BoardComponent;
