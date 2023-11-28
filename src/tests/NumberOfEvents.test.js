import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let numberOfEventsComponent;

  beforeEach(() => {
    render(
      <NumberOfEvents
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );

    // Use screen.getByTestId to get the input element
    numberOfEventsComponent = screen.getByTestId("event-number-input");
  });

  test("renders text input", () => {
    expect(numberOfEventsComponent).toBeInTheDocument();
    expect(numberOfEventsComponent).toHaveClass("event-number");
  });

  test("number of events is 32 by default", () => {
    expect(numberOfEventsComponent.value).toBe("32");
  });
test("updates number of events when user types", async () => {
  // Use numberOfEventsComponent instead of NumberOfEventsComponent
  await userEvent.type(numberOfEventsComponent, "{backspace}{backspace}10");
  expect(Number(numberOfEventsComponent.value)).toBe(10);
});

});
