import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '@/app/page'

// next/navigation is used by Link — mock it so the router works in jsdom
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
}))

describe('Home page', () => {
  it('renders the getting-started heading', () => {
    render(<Page />)
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent(/get started/i)
  })

  it('renders the Documentation and Templates links', () => {
    render(<Page />)
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /templates/i })).toBeInTheDocument()
  })

  it('links open in a new tab', () => {
    render(<Page />)
    const externalLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('target') === '_blank'
    )
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })
})
