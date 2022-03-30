import { render, screen, fireEvent } from "@testing-library/react";
import { BoardComponent } from "./BoardComponent";

it("should render BoardComponent:", () => {
  render(<BoardComponent />);
  expect(screen.getByTestId("board-component")).toBeInTheDocument();
});

it("should render a title if title is passed:", () => {
  render(<BoardComponent title="Arijit Patra" />);
  expect(screen.getByText("Arijit Patra")).toBeInTheDocument();
});

it("should render cross icon if title is passed:", () => {
  render(<BoardComponent title="Arijit Patra" />);
  expect(screen.getByText("X")).toBeInTheDocument();
});

it("should render not render header and cross when no title is passed:", () => {
  render(<BoardComponent />);
  expect(screen.queryByTestId("board-header-title")).not.toBeInTheDocument();
  expect(screen.queryByTestId("board-cross-icon")).not.toBeInTheDocument();
});

it("should call click handler function only once on cross icon click:", () => {
  const mockOnClick = jest.fn();
  render(<BoardComponent onBoardDelete={mockOnClick} title="Arijit Patra" />);
  fireEvent.click(screen.getByTestId("board-cross-icon"));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
