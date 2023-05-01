import { render, screen } from "@testing-library/react";
// import Login from "./Login";
import App from "../App";

test("check input 1 in dom", () => {
  render(<App />);
  const input_1Element = screen.getByRole("q");

  expect(input_1Element).toBeInTheDocument();
});

// test("check input 1 in dom", () => {
//   render(<Login />);
//   const input_1Element = screen.getByRole("input_1");

//   expect(input_1Element).toBeInTheDocument();
// });

// test("check input 2 in dom", () => {
//   render(<Login />);
//   const input_2Element = screen.getByRole("input_2");

//   expect(input_2Element).toBeInTheDocument();
// });

// test("check login button in dom", () => {
//   render(<Login />);
//   const buttonElement = screen.getByRole("button");

//   expect(buttonElement).toBeInTheDocument();
// });
