import "./CardComponent.scss";

const CardComponent = ({
  id,
  title,
  text,
  onCardDelete,
  onDragStart,
  isDraggable,
}) => {
  return (
    <section
      className="card-component"
      draggable={isDraggable}
      onDragStart={onDragStart}
      id={id + "*" + title + "*" + text}
      data-testid="card-component"
    >
      <div className="d-f j-c-sb">
        <h5 className="m-05-0" data-testid="card-title">
          {title}
        </h5>
        <h5
          className="m-05-0 cursor-pointer red-on-hover"
          onClick={onCardDelete}
          data-testid="card-cross-icon"
        >
          X
        </h5>
      </div>

      <p data-testid="card-text">{text}</p>
    </section>
  );
};
export { CardComponent };
