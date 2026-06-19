import '@testing-library/jest-dom';
import React from 'react';

jest.mock('@clerk/nextjs', () => {
  return {
    ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
    Show: ({ when, children }: { when: string; children: React.ReactNode }) => {
      // For unit tests, we simulate the signed-out state so landing page CTAs and headers render correctly.
      if (when === 'signed-out') {
        return children;
      }
      return null;
    },
    UserButton: () => React.createElement('div', { 'data-testid': 'user-button' }),
    SignInButton: ({ children }: { children: React.ReactNode }) => children,
    SignUpButton: ({ children }: { children: React.ReactNode }) => children,
    useSignIn: () => ({
      signIn: {
        password: jest.fn(),
        sso: jest.fn(),
        finalize: jest.fn(),
        status: 'needs_identifier',
      },
    }),
    useSignUp: () => ({
      signUp: {
        password: jest.fn(),
        verifications: {
          sendEmailCode: jest.fn(),
          verifyEmailCode: jest.fn(),
        },
        finalize: jest.fn(),
        status: 'needs_verification',
      },
    }),
  };
});
