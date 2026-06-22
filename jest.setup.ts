import '@testing-library/jest-dom';
import React from 'react';

// ---------------------------------------------------------------------------
// Global mock: @clerk/nextjs
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Global mock: next/navigation
// ---------------------------------------------------------------------------
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Global mock: @mux/mux-player-react
// ---------------------------------------------------------------------------
jest.mock('@mux/mux-player-react', () => {
  const MuxPlayer = React.forwardRef(
    (props: Record<string, unknown>, ref: React.Ref<HTMLVideoElement>) =>
      React.createElement('video', {
        ref,
        'data-testid': 'mux-player',
        'data-playback-id': props.playbackId,
        ...props,
      }),
  );
  MuxPlayer.displayName = 'MuxPlayer';
  return {
    __esModule: true,
    default: MuxPlayer,
  };
});
