import "./ButtonComponent.scss";

const ButtonComponent = ({ label, onClick, classNameProp = "" }) => {
  return (
    <button
      className={"button-component cursor-pointer " + classNameProp}
      onClick={onClick}
      data-testid="button-component"
    >
      {label}
    </button>
  );
};

export { ButtonComponent };
