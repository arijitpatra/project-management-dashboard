import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardComponent from "../CardComponent/CardComponent";
import "./BoardComponent.scss";

const BoardComponent = ({ title = "", cards = [] }) => {
  return (
    <section className="board-component">
      <h3>{title} X</h3>

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
      <input placeholder="enter list title" type="text" maxLength={15} />
      <ButtonComponent label={title.length > 0 ? "add card" : "add title"} />
    </section>
  );
};

export default BoardComponent;
