import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardComponent from "../CardComponent/CardComponent";
import "./BoardComponent.scss";

const BoardComponent = ({ title = "", cards = [], onBtnClick }) => {
  return (
    <section className="board-component">
      {title.length > 0 && <h3>{title} X</h3>}

      {cards.length > 0 && title.length > 0
        ? cards.map((item, index) => {
            return (
              <CardComponent
                title={item.title}
                text={item.text}
                key={item.title + index}
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
          />
          <input placeholder="enter text for the card" type="text" />
        </div>
      ) : (
        <input placeholder="enter list title" type="text" maxLength={15} />
      )}

      <ButtonComponent
        label={title.length > 0 ? "add card" : "add title"}
        handleClick={onBtnClick}
        classNa="m-05-0"
      />
    </section>
  );
};

export default BoardComponent;
