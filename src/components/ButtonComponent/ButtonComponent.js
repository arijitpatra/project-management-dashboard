import "./ButtonComponent.scss";

const ButtonComponent = ({ label, onClick, classNameProp = "" }) => {
  return (
    <button
      className={"button-component " + classNameProp}
      onClick={onClick}
      data-testid="button-component"
    >
      {label}
    </button>
  );
};

export { ButtonComponent };
