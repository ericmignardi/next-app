"use client";

import { useSignUp, useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signUpSchema, verificationSchema } from "@/types/auth";
import { toast } from "sonner";

export default function SignUp() {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;

    setError(null);

    // Validate inputs with Zod
    const validation = signUpSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid input data");
      return;
    }

    setLoading(true);

    try {
      // Initiate password sign-up
      const result = await signUp.password({
        emailAddress: validation.data.email,
        password: validation.data.password,
        firstName: validation.data.firstName,
        lastName: validation.data.lastName,
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // Send the email verification code
      const sendRes = await signUp.verifications.sendEmailCode();
      if (sendRes.error) {
        setError(sendRes.error.message);
        return;
      }

      setPendingVerification(true);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "";
      setError(message || "An unexpected error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;

    setError(null);

    // Validate inputs with Zod
    const validation = verificationSchema.safeParse({ code });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid code");
      return;
    }

    setLoading(true);

    try {
      // Attempt verification
      const verifyRes = await signUp.verifications.verifyEmailCode({ code: validation.data.code });
      if (verifyRes.error) {
        setError(verifyRes.error.message);
        return;
      }

      // Check status and finalize the session
      if (signUp.status === "complete") {
        const finalizeRes = await signUp.finalize();
        if (finalizeRes.error) {
          setError(finalizeRes.error.message);
          return;
        }
        router.push("/dashboard");
      } else {
        setError("Verification successful, but registration is incomplete.");
      }
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "";
      setError(message || "An unexpected error occurred during verification.");
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
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/dashboard",
      });
      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "";
      setError(message || "Social login redirect failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070a13] font-sans antialiased text-slate-100 p-6 relative overflow-hidden">
      {/* Apple-style background ambient backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#090d19]/80 border border-white/[0.03] rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        {!pendingVerification ? (
          /* Sign Up View */
          <>
            {/* Brand Logo & Title */}
            <div className="flex flex-col items-center mb-8">
              <Link href="/" className="flex items-center gap-2 select-none mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-bold text-[19px] tracking-tight text-white">
                  Locker<span className="text-blue-500 font-medium">Room</span>
                </span>
              </Link>
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-center">
                Register Account
              </h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 text-center">
                Request access to your family sports vault
              </p>
            </div>

            {/* Social Logins */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleOAuth("oauth_google")}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 border border-white/[0.04] hover:bg-slate-850 active:scale-[0.98] text-slate-200 rounded-xl py-3 px-4 text-xs font-bold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("oauth_github")}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 border border-white/[0.04] hover:bg-slate-850 active:scale-[0.98] text-slate-200 rounded-xl py-3 px-4 text-xs font-bold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3.5 my-6 select-none">
              <div className="flex-1 h-px bg-white/[0.04]"></div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">or email</span>
              <div className="flex-1 h-px bg-white/[0.04]"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jordan"
                    className="w-full bg-[#111726]/40 border border-white/[0.04] rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Avery"
                    className="w-full bg-[#111726]/40 border border-white/[0.04] rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-[#111726]/40 border border-white/[0.04] rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-[#111726]/40 border border-white/[0.04] rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed font-semibold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs cursor-pointer shadow-lg shadow-blue-500/10 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2 h-11"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Register Account</span>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6 select-none">
              Already have vault access?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0 inline"
              >
                Sign In
              </Link>
            </p>
          </>
        ) : (
          /* Email Code Verification View */
          <>
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-white text-center">
                Verify Email
              </h1>
              <p className="text-xs text-slate-400 mt-2 text-center leading-relaxed max-w-xs">
                We&apos;ve sent a 6-digit verification code to <span className="font-bold text-white">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-[#111726]/40 border border-white/[0.04] rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-[0.25em] text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed font-semibold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs cursor-pointer shadow-lg shadow-blue-500/10 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 h-11"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>
            </form>

            <div className="flex flex-col items-center gap-3.5 mt-8 select-none">
              <button
                type="button"
                onClick={async () => {
                  setError(null);
                  const sendRes = await signUp?.verifications.sendEmailCode();
                  if (sendRes?.error) {
                    setError(sendRes.error.message);
                  } else {
                    toast.success("Verification code resent successfully.");
                  }
                }}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Didn&apos;t receive a code? Resend
              </button>

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setPendingVerification(false);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-400 transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Back to registration
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
