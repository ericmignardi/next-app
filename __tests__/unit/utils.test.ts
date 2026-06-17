import { formatCurrency, truncate, cn } from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats a positive number as USD by default', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats a negative number', () => {
    expect(formatCurrency(-99.99)).toBe('-$99.99')
  })

  it('accepts a different currency', () => {
    expect(formatCurrency(50, 'EUR', 'de-DE')).toMatch(/50/)
  })
})

describe('truncate', () => {
  it('returns the original string when within limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates and appends ellipsis when over limit', () => {
    expect(truncate('hello world', 5)).toBe('hello…')
  })

  it('returns unchanged string at exact limit', () => {
    expect(truncate('abcde', 5)).toBe('abcde')
  })
})

describe('cn', () => {
  it('joins class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters out falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(false, null, undefined)).toBe('')
  })
})
