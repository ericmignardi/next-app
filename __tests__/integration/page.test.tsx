import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

// next/navigation is used by Link — mock it so the router works in jsdom
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
}))

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Page />)
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent(/gets things done/i)
  })

  it('renders the navigation links', () => {
    render(<Page />)
    expect(screen.getAllByRole('link', { name: /features/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /pricing/i }).length).toBeGreaterThan(0)
  })

  it('contains links to landing sections', () => {
    render(<Page />)
    const links = screen.getAllByRole('link')
    const hasHashLink = links.some((link) => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#');
    })
    expect(hasHashLink).toBe(true)
  })
})
