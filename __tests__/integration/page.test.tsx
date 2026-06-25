import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Landing Page Integration", () => {
  it("renders the hero heading and description", async () => {
    const resolvedPage = await (Page as unknown as () => Promise<React.ReactElement>)();
    render(resolvedPage);

    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent(/sporting legacy/i);

    expect(
      screen.getByText(/LockerRoom digitizes, indexes, and streams/i)
    ).toBeInTheDocument();
  });

  it('renders access button linked to /sign-in', async () => {
    const resolvedPage = await (Page as unknown as () => Promise<React.ReactElement>)();
    render(resolvedPage);

    const accessButton = screen.getByRole("button", {
      name: /access the vault/i,
    });
    expect(accessButton).toBeInTheDocument();

    const signInLink = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === "/sign-in"
    );
    expect(signInLink.length).toBeGreaterThanOrEqual(1);
  });

  it('renders register button linked to /sign-up', async () => {
    const resolvedPage = await (Page as unknown as () => Promise<React.ReactElement>)();
    render(resolvedPage);

    const registerButton = screen.getByRole("button", {
      name: /register new account/i,
    });
    expect(registerButton).toBeInTheDocument();

    const signUpLink = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === "/sign-up"
    );
    expect(signUpLink.length).toBeGreaterThanOrEqual(1);
  });

  it("renders footer copyright with current year", async () => {
    const resolvedPage = await (Page as unknown as () => Promise<React.ReactElement>)();
    render(resolvedPage);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} LockerRoom`))
    ).toBeInTheDocument();
  });
});
