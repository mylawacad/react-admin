import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { makeServer } from "../server";

let server;

beforeAll(() => {
  server = makeServer({ environment: "development" });
});

afterAll(() => {
  server.shutdown();
});

it("shows the login form", async () => {
  render(<App />);

  userEvent.click(screen.getByText("Login"));

  screen.getByRole("heading", { name: /sign in/i });
  expect(screen.getByRole("heading")).toHaveTextContent("Sign in");

  userEvent.click(screen.getByRole("button", { name: /sign in/i }));
  await waitFor(() =>
    expect(screen.getByText(/email is a required field/i)).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument()
  );

  const emailInput = screen.getByPlaceholderText(/example@company.com/i);
  userEvent.type(emailInput, "mylawacad+A@gmail.com");
  expect(emailInput).toHaveValue("mylawacad+A@gmail.com");

  const passInput = screen.getByPlaceholderText(/Password/i);
  userEvent.type(passInput, "123-Test");
  expect(passInput).toHaveValue("123-Test");

  userEvent.click(screen.getByRole("link", { name: /back/i }));
  await waitFor(() =>
    expect(screen.getByText(/internal services portal/i)).toBeInTheDocument()
  );
});
