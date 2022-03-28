import "./CardComponent.scss";

const CardComponent = ({ title, text }) => {
  return (
    <section className="card-component">
      <h5>{title}</h5>
      <p>{text}</p>
    </section>
  );
};

export default CardComponent;
