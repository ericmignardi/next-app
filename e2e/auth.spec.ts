import { test, expect } from "@playwright/test";

test.describe("Authentication Flows", () => {
  test.describe("Sign In Page", () => {
    test("redirects root to sign-in and renders the full sign-in UI", async ({ page }) => {
      await page.goto("/");

      // Verify redirect to sign-in
      await expect(page).toHaveURL(/.*sign-in.*/);

      // Verify heading
      const heading = page.getByRole("heading", { name: "Welcome back", level: 1 });
      await expect(heading).toBeVisible();

      // Verify subtitle
      await expect(page.getByText("Sign in to your Lumen account.")).toBeVisible();

      // Verify form labels
      await expect(page.getByText("Email", { exact: true })).toBeVisible();
      await expect(page.getByText("Password", { exact: true })).toBeVisible();

      // Verify social login buttons
      await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
      await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();

      // Verify "or" divider
      await expect(page.getByText("or")).toBeVisible();

      // Verify "Keep me signed in" checkbox
      await expect(page.getByText("Keep me signed in")).toBeVisible();

      // Verify "Forgot?" link
      await expect(page.getByRole("button", { name: "Forgot?" })).toBeVisible();
    });

    test("sign-in form fields have required attributes", async ({ page }) => {
      await page.goto("/sign-in");

      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');

      await expect(emailInput).toHaveAttribute("required", "");
      await expect(passwordInput).toHaveAttribute("required", "");
    });

    test("sign-in shows link to sign-up", async ({ page }) => {
      await page.goto("/sign-in");

      await expect(page.getByText("Don't have an account?")).toBeVisible();

      const signUpLink = page.getByRole("link", { name: "Sign up" });
      await expect(signUpLink).toBeVisible();
      await expect(signUpLink).toHaveAttribute("href", "/sign-up");
    });

    test("forgot password button shows disabled message", async ({ page }) => {
      await page.goto("/sign-in");

      await page.getByRole("button", { name: "Forgot?" }).click();

      await expect(
        page.getByText("Password recovery is disabled for this custom layout"),
      ).toBeVisible();
    });
  });

  test.describe("Sign Up Page", () => {
    test("renders the full sign-up UI", async ({ page }) => {
      await page.goto("/sign-up");

      // Verify heading
      const heading = page.getByRole("heading", { name: "Create your account", level: 1 });
      await expect(heading).toBeVisible();

      // Verify subtitle
      await expect(page.getByText("Get started free — no credit card required.")).toBeVisible();

      // Verify form labels
      await expect(page.getByText("First name")).toBeVisible();
      await expect(page.getByText("Last name")).toBeVisible();
      await expect(page.getByText("Work email")).toBeVisible();
      await expect(page.getByText("Password", { exact: true })).toBeVisible();

      // Verify social login buttons
      await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
      await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();

      // Verify submit button
      await expect(page.getByRole("button", { name: "Create account" })).toBeVisible();

      // Verify terms text
      await expect(page.getByText("By signing up you agree to our Terms and Privacy Policy.")).toBeVisible();
    });

    test("validates short password on sign-up form", async ({ page }) => {
      await page.goto("/sign-up");

      await page.locator('input[placeholder="Jordan"]').fill("John");
      await page.locator('input[placeholder="Avery"]').fill("Doe");
      await page.locator('input[type="email"]').fill("john.doe@example.com");
      await page.locator('input[type="password"]').fill("123");

      await page.getByRole("button", { name: "Create account" }).click();

      await expect(page.getByText("Password must be at least 8 characters long")).toBeVisible();
    });

    test("shows link to sign-in", async ({ page }) => {
      await page.goto("/sign-up");

      await expect(page.getByText("Already have an account?")).toBeVisible();

      const signInLink = page.getByRole("link", { name: "Sign in" });
      await expect(signInLink).toBeVisible();
      await expect(signInLink).toHaveAttribute("href", "/sign-in");
    });
  });

  test.describe("Navigation Between Auth Pages", () => {
    test("navigates from sign-in to sign-up and back", async ({ page }) => {
      await page.goto("/sign-in");

      // Go to sign-up
      const signUpLink = page.getByRole("link", { name: "Sign up" });
      await signUpLink.click();
      await expect(page).toHaveURL(/.*sign-up.*/);

      // Verify sign-up heading
      const signUpHeading = page.getByRole("heading", { name: "Create your account", level: 1 });
      await expect(signUpHeading).toBeVisible();

      // Go back to sign-in
      const signInLink = page.getByRole("link", { name: "Sign in" });
      await expect(signInLink).toBeVisible();
      await signInLink.click();
      await expect(page).toHaveURL(/.*sign-in.*/);

      // Verify sign-in heading
      const signInHeading = page.getByRole("heading", { name: "Welcome back", level: 1 });
      await expect(signInHeading).toBeVisible();
    });
  });
});
