import "./CardComponent.scss";

const CardComponent = ({ title, text, onCardDelete, onDragStart }) => {
  return (
    <section
      className="card-component"
      draggable={true}
      onDragStart={onDragStart}
      id={title + "*" + text}
    >
      <div className="d-f j-c-sb">
        <h5 className="m-05-0">{title}</h5>
        <h5
          className="m-05-0 cursor-pointer red-on-hover"
          onClick={onCardDelete}
        >
          X
        </h5>
      </div>

      <p>{text}</p>
    </section>
  );
};

export default CardComponent;
