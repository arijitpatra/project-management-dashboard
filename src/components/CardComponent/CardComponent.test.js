import { render, screen, fireEvent } from "@testing-library/react";
import { CardComponent } from "./CardComponent";

it("should render CardComponent:", () => {
  render(<CardComponent />);
  expect(screen.getByTestId("card-component")).toBeInTheDocument();
});

it("should render title and text:", () => {
  render(
    <CardComponent title="Arijit Patra" text="Is a Frontend Engineer, Yay!" />
  );
  expect(screen.getByTestId("card-title")).toHaveTextContent("Arijit Patra");
  expect(screen.getByTestId("card-text")).toHaveTextContent(
    "Is a Frontend Engineer, Yay!"
  );
});

it("should call click handler function only once on cross icon click:", () => {
  const mockOnClick = jest.fn();
  render(<CardComponent onCardDelete={mockOnClick} />);
  const crossIcon = screen.getByTestId("card-cross-icon");
  fireEvent.click(crossIcon);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
