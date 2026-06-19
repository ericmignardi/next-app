"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;

    setLoading(true);
    setError(null);

    try {
      // Perform password authentication
      const result = await signIn.password({
        emailAddress: email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // Check status and finalize the session
      if (signIn.status === "complete") {
        const finalizeRes = await signIn.finalize();
        if (finalizeRes.error) {
          setError(finalizeRes.error.message);
          return;
        }
        router.push("/dashboard");
      } else {
        setError(`Sign-in status: ${signIn.status}. Additional steps required.`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (strategy: "oauth_google" | "oauth_github") => {
    if (!signIn) return;
    setError(null);
    try {
      const result = await signIn.sso({
        strategy,
        redirectUrl: "/sso-callback",
        redirectCallbackUrl: "/sign-in",
      });
      if (result.error) {
        setError(result.error.message);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Social login redirect failed.");
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("Password recovery is disabled for this custom layout. Please contact admin.");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] bg-[#f8fafc] font-sans antialiased text-[#0f172a]">
      {/* Left Pane - Brand Quote and Branding */}
      <div 
        className="hidden lg:flex bg-[#4f46e5] p-12 flex-col justify-between select-none relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 10% 90%, rgba(245,158,11,0.22), transparent 40%)'
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity self-start">
          <div className="w-[30px] h-[30px] rounded-lg bg-white flex items-center justify-center">
            <div className="w-[13px] h-[13px] bg-[#4f46e5] rotate-45 rounded-[2px]"></div>
          </div>
          <span className="font-bold text-[19px] tracking-[-0.02em] text-white">Lumen</span>
        </Link>

        {/* Testimonial / Quote */}
        <div className="my-auto py-12 max-w-[420px]">
          <div className="text-[#fbbf24] text-lg tracking-[2px] mb-[18px] font-mono">★★★★★</div>
          <p className="text-white text-2xl lg:text-[26px] font-semibold leading-[1.4] tracking-[-0.02em] mb-6">
            "The one tool our whole team agreed on. It just gets out of the way."
          </p>
          
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold border border-white/10">
              SR
            </div>
            <div>
              <div className="font-bold text-[15px] text-white">Sam Rivera</div>
              <div className="text-[13px] text-[#c7d2fe]">Head of Product, Loop</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[13px] text-[#c7d2fe]">
          © {new Date().getFullYear()} Lumen Inc.
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-[#f8fafc] min-h-screen">
        <div className="w-full max-w-[380px]">
          <h1 className="text-3xl font-extrabold tracking-[-0.025em] mb-2">Welcome back</h1>
          <p className="text-[15px] text-[#64748b] mb-8">Sign in to your Lumen account.</p>

          {/* Social Logins */}
          <div className="flex gap-2.5 mb-5">
            <button
              type="button"
              onClick={() => handleOAuth("oauth_google")}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("oauth_github")}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-[#0f172a]" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3.5 my-5 select-none">
            <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
            <span className="text-[13px] text-[#94a3b8]">or</span>
            <div className="flex-1 h-[1px] bg-[#e2e8f0]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-800">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-3 text-[15px] focus:outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/12 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-800">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[13px] text-[#4f46e5] hover:text-[#4338ca] font-medium transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-3 text-[15px] focus:outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/12 transition-all"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#475569] mt-1 select-none cursor-pointer self-start">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded border-[#e2e8f0] text-[#4f46e5] focus:ring-[#4f46e5]/20 cursor-pointer accent-[#4f46e5]"
              />
              <span>Keep me signed in</span>
            </label>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-3.5 px-4 rounded-xl text-[15px] cursor-pointer shadow-[0_4px_14px_rgba(79,70,229,0.25)] transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
                  ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-[#4f46e5] hover:text-[#4338ca] transition-colors cursor-pointer bg-transparent border-none p-0 inline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
