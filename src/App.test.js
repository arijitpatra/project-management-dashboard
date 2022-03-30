import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

test("renders 'Dashboard' text and 'reset' text", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  expect(screen.getByText(/reset/)).toBeInTheDocument();
});
