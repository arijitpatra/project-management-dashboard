import { useRef } from "react";
import { ButtonComponent } from "../ButtonComponent";
import { CardComponent } from "../CardComponent";
import { onDragOver, onDrop, onDragStart } from "../../utils/utils";
import "./BoardComponent.scss";

const BoardComponent = ({
  title = "",
  cards = [],
  onBtnClick,
  cardDelete,
  boardDelete,
  onDragAndDropChange,
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
    }
  };

  const onDropEvent = (e) => {
    if (title.length > 0) onDrop(e, title, onDragAndDropChange);
  };

  return (
    <section className="board-component">
      {title.length > 0 && (
        <div className="d-f j-c-sb m-b-2d5">
          <h3 className="m-05-0">{title}</h3>
          <h3
            className="m-05-0 cursor-pointer red-on-hover"
            onClick={boardDelete}
          >
            X
          </h3>
        </div>
      )}

      <div onDrop={onDropEvent} onDragOver={onDragOver}>
        {cards.length > 0 && title.length > 0
          ? cards.map((card, index) => {
              return (
                <CardComponent
                  title={card.title}
                  text={card.text}
                  key={card.title + index}
                  onCardDelete={() => cardDelete(title, card.id)}
                  draggable={true}
                  onDragStart={onDragStart}
                />
              );
            })
          : ""}
      </div>

      {title.length > 0 ? (
        <div className="d-f f-d-c">
          <input
            onDrop={onDropEvent}
            onDragOver={onDragOver}
            placeholder="enter card title"
            type="text"
            maxLength={15}
            className="m-05-0"
            ref={titleInput}
          />
          <input
            onDrop={onDropEvent}
            onDragOver={onDragOver}
            placeholder="enter card description"
            type="text"
            ref={textInput}
          />
        </div>
      ) : (
        <div className="d-f f-d-c">
          <input
            onDrop={onDropEvent}
            onDragOver={onDragOver}
            placeholder="enter board title"
            type="text"
            maxLength={15}
            ref={titleInput}
          />
        </div>
      )}

      <ButtonComponent
        label={title.length > 0 ? "add card" : "add title"}
        handleClick={handleClickAndGetInputValues}
        classNameProp="m-05-0"
      />
    </section>
  );
};

export { BoardComponent };
