import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonComponent } from "./ButtonComponent";

it("should render ButtonComponent:", () => {
  render(<ButtonComponent />);
  const btn = screen.getByTestId("button-component");
  expect(btn).toBeInTheDocument();
});

it("should render the passed label:", () => {
  render(<ButtonComponent label="Arijit Patra" />);
  expect(screen.getByText(/Arijit Patra/)).toBeInTheDocument();
});

it("should call click handler function only once on button click:", () => {
  const mockOnClick = jest.fn();
  render(<ButtonComponent onClick={mockOnClick} label="Arijit Patra" />);
  const btn = screen.getByTestId("button-component");
  fireEvent.click(btn);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
