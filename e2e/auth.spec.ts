import { test, expect } from "@playwright/test";

test.describe("Authentication Flows (Sign In / Sign Up Redirects)", () => {
  test("visiting root page redirects to sign-in page due to auth protection", async ({ page }) => {
    // Navigate to root
    await page.goto("/");

    // Verify it redirects to the Sign In page
    await expect(page).toHaveURL(/.*sign-in.*/);

    // Verify Heading
    const heading = page.getByRole("heading", { name: "Welcome back", level: 1 });
    await expect(heading).toBeVisible();

    // Verify text contents
    await expect(page.getByText("Sign in to your Lumen account.")).toBeVisible();

    // Verify Social login buttons (Google, GitHub) are visible
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();
  });

  test("inputs are required on sign-in form", async ({ page }) => {
    await page.goto("/sign-in");

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    // Verify HTML5 validation attributes
    await expect(emailInput).toHaveAttribute("required", "");
    await expect(passwordInput).toHaveAttribute("required", "");
  });

  test("validates short password entry on sign-up", async ({ page }) => {
    await page.goto("/sign-up");

    // Fill in valid details but a short password (less than 8 characters)
    await page.locator('input[placeholder="Jordan"]').fill("John");
    await page.locator('input[placeholder="Avery"]').fill("Doe");
    await page.locator('input[type="email"]').fill("john.doe@example.com");
    await page.locator('input[type="password"]').fill("123");

    // Click submit
    await page.getByRole("button", { name: "Create account" }).click();

    // Verify Zod validation message for password shows up in the UI
    await expect(page.getByText("Password must be at least 8 characters long")).toBeVisible();
  });

  test("can navigate from sign-in to sign-up and check headings", async ({ page }) => {
    await page.goto("/sign-in");

    // Locate the "Sign up" link and click it
    const signUpLink = page.getByRole("link", { name: "Sign up" });
    await signUpLink.click();

    // Verify we are now on the sign-up page
    await expect(page).toHaveURL(/.*sign-up.*/);

    // Verify Sign Up Heading
    const signUpHeading = page.getByRole("heading", { name: "Create your account", level: 1 });
    await expect(signUpHeading).toBeVisible();

    // Verify "Sign in" link is present to go back
    const signInLink = page.getByRole("link", { name: "Sign in" });
    await expect(signInLink).toBeVisible();

    // Go back to sign-in
    await signInLink.click();
    await expect(page).toHaveURL(/.*sign-in.*/);
  });
});
