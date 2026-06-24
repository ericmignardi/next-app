import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ShieldCheck, Play, Video } from "lucide-react";

export const unstable_instant = false;

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 overflow-x-hidden antialiased">
      <Header userId={userId} />

      <main className="grow flex flex-col justify-center items-center py-24 px-6 relative">
        {/* Apple-style subtle ambient background backlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10 my-auto flex flex-col items-center">
          {/* Private Vault Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-[11px] font-bold text-blue-400 tracking-wider">
            <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-normal">
              Vault Active
            </span>
            <span>Invitation-Only Family Sports Archive</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl drop-shadow-sm select-none">
            Your family&apos;s sporting legacy,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              securely archived.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed select-none font-medium">
            LockerRoom digitizes, indexes, and streams your historical sports footage. A private, cinematic home for games, practices, and season highlights.
          </p>

          {/* Central Portal Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {userId ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 text-sm">
                  <Video className="w-4.5 h-4.5" /> Enter the Vault
                </button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 fill-white" /> Access the Vault
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-slate-900/60 hover:bg-slate-900 border border-white/[0.05] hover:border-white/[0.1] text-slate-200 font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm">
                    Register New Account
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Security & Access Statement */}
          <div className="flex items-center gap-2 text-slate-500 text-xs select-none pt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted transmission. No tracking. Viewable by approved members only.</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
