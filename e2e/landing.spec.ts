import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test.describe("Hero Section", () => {
    test("renders the hero heading, description, and CTAs", async ({ page }) => {
      await page.goto("/");

      // Verify page title/heading
      await expect(
        page.getByRole("heading", { name: "Your family's sporting legacy," }),
      ).toBeVisible();

      // Verify private vault badge
      await expect(page.getByText("Invitation-Only Family Sports Archive")).toBeVisible();

      // Verify description
      await expect(
        page.getByText("LockerRoom digitizes, indexes, and streams your historical sports footage."),
      ).toBeVisible();

      // Verify CTAs
      await expect(page.getByRole("link", { name: "Access the Vault" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Register New Account" })).toBeVisible();
    });
  });

  test.describe("Auth Page Branding", () => {
    test("sign-in page shows LockerRoom branding and portal info", async ({ page }) => {
      await page.goto("/sign-in");

      // Locker logo/brand text should appear
      const lockerTexts = page.getByText("Locker");
      await expect(lockerTexts.first()).toBeVisible();

      // Header is "Access the Vault"
      await expect(page.getByRole("heading", { name: "Access the Vault" })).toBeVisible();

      // Subtitle info
      await expect(page.getByText("Sign in to view your family archives")).toBeVisible();
    });

    test("sign-up page shows LockerRoom branding and request access info", async ({ page }) => {
      await page.goto("/sign-up");

      // Locker logo should be present
      const lockerTexts = page.getByText("Locker");
      await expect(lockerTexts.first()).toBeVisible();

      // Header is "Register Account"
      await expect(page.getByRole("heading", { name: "Register Account" })).toBeVisible();

      // Subtitle info
      await expect(page.getByText("Request access to your family sports vault")).toBeVisible();
    });

    test("landing page shows copyright in footer", async ({ page }) => {
      const currentYear = new Date().getFullYear().toString();

      await page.goto("/");
      await expect(page.getByText(new RegExp(`© ${currentYear} LockerRoom`))).toBeVisible();
    });
  });
});

