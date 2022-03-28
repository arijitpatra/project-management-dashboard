import "./ButtonComponent.scss";

const ButtonComponent = ({ label, handleClick, classNa = "" }) => {
  return (
    <button className={"button-component " + classNa} onClick={handleClick}>
      {label}
    </button>
  );
};

export default ButtonComponent;
