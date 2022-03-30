import "./BoardComponent.scss";

const BoardComponent = ({ title, onBoardDelete, children }) => {
  return (
    <section className="board-component" data-testid="board-component">
      {title?.length > 0 && (
        <div className="d-f j-c-sb m-b-2d5">
          <h3 className="m-05-0" data-testid="board-header-title">
            {title}
          </h3>
          <h3
            className="m-05-0 cursor-pointer red-on-hover"
            onClick={onBoardDelete}
            data-testid="board-cross-icon"
          >
            X
          </h3>
        </div>
      )}
      {children}
    </section>
  );
};

export { BoardComponent };
