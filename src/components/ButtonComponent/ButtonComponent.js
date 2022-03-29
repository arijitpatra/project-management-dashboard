import "./ButtonComponent.scss";

const ButtonComponent = ({ label, handleClick, classNameProp = "" }) => {
  return (
    <button
      className={"button-component " + classNameProp}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export { ButtonComponent };
