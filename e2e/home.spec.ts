import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads and shows the getting-started heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/get started/i)
  })

  test('Documentation link is visible and points to nextjs.org', async ({ page }) => {
    await page.goto('/')
    const docsLink = page.getByRole('link', { name: /documentation/i })
    await expect(docsLink).toBeVisible()
    await expect(docsLink).toHaveAttribute('href', expect.stringContaining('nextjs.org'))
  })

  test('Deploy Now link opens in a new tab', async ({ page }) => {
    await page.goto('/')
    const deployLink = page.getByRole('link', { name: /deploy now/i })
    await expect(deployLink).toHaveAttribute('target', '_blank')
    await expect(deployLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  test('page title is set', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/.+/)
  })
})
