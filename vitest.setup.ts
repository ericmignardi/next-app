import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// ---------------------------------------------------------------------------
// Global mock: @clerk/nextjs
// ---------------------------------------------------------------------------
vi.mock('@clerk/nextjs', () => {
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
        password: vi.fn(),
        sso: vi.fn(),
        finalize: vi.fn(),
        status: 'needs_identifier',
      },
    }),
    useSignUp: () => ({
      signUp: {
        password: vi.fn(),
        verifications: {
          sendEmailCode: vi.fn(),
          verifyEmailCode: vi.fn(),
        },
        finalize: vi.fn(),
        status: 'needs_verification',
      },
    }),
  };
});

// ---------------------------------------------------------------------------
// Global mock: next/navigation
// ---------------------------------------------------------------------------
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Global mock: @mux/mux-player-react
// ---------------------------------------------------------------------------
vi.mock('@mux/mux-player-react', () => {
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

// ---------------------------------------------------------------------------
// Global mock: @clerk/nextjs/server
// ---------------------------------------------------------------------------
vi.mock('@clerk/nextjs/server', () => {
  return {
    auth: vi.fn().mockResolvedValue({ userId: null }),
  };
});

// ---------------------------------------------------------------------------
// Global mock: next/image
// ---------------------------------------------------------------------------
vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ fill, priority, sizes, ...props }: Record<string, unknown>) => {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement('img', { ...props });
    },
  };
});
