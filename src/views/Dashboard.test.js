import { render, screen } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";

it("should render Dashboard view header:", () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByTestId("dashboard-heading")).toBeInTheDocument();
});
