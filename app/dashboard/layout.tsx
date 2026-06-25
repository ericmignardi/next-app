import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Shield, Trophy, LayoutGrid, ArrowLeft, Compass } from "lucide-react";

export const unstable_instant = false; // Exempt layout from validation to allow cookies/auth access

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col sm:flex-row antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-white/[0.03] bg-[#090d19]/80 backdrop-blur-md flex flex-col justify-between shrink-0 z-30">
        <div className="p-6 space-y-8">
          {/* Brand Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 select-none hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-[19px] tracking-tight text-white">
              Locker<span className="text-blue-500 font-medium">Room</span>
            </span>
          </Link>

          {/* Nav Categories */}
          <nav className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 block mb-2 select-none">
                Browse Vault
              </span>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-350 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
              >
                <LayoutGrid className="w-4 h-4 text-blue-500" />
                <span>All Archives</span>
              </Link>
              <Link
                href="/dashboard?sport=hockey"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-350 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
              >
                <Trophy className="w-4 h-4 text-blue-500" />
                <span>Hockey Vault</span>
              </Link>
              <Link
                href="/dashboard?sport=baseball"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-350 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
              >
                <Compass className="w-4 h-4 text-blue-500" />
                <span>Baseball Diamonds</span>
              </Link>
            </div>

            <div className="space-y-1 pt-4 border-t border-white/[0.03]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 block mb-2 select-none">
                Control Panel
              </span>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-350 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
              >
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Admin Workspace</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Landing Page</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* User Account Bar */}
        <div className="p-4 border-t border-white/[0.03] bg-[#060a14]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-0.5 rounded-full border border-white/[0.04]">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-7.5 h-7.5",
                  },
                }}
              />
            </div>
            <div className="select-none">
              <p className="text-xs font-bold text-white leading-none">Family Guest</p>
              <span className="text-[9px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5 block">Viewer Account</span>
            </div>
          </div>
          <div className="text-xs opacity-40">🔒</div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 min-w-0 bg-[#070a13] relative flex flex-col">
        {/* Dynamic ambient backlights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
