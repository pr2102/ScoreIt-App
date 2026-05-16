import { ChevronLeft, Crown, Dice5, Gamepad2 } from 'lucide-react'
import OriginalChessGame from '../portfolio/games/components/ChessGame'
import OriginalLudoGame from '../portfolio/games/components/LudoGame'

function GameShell({ title, icon, onBack, children }) {
  const HeaderIcon = icon

  return (
    <main className="min-h-svh bg-white text-slate-800">
      <header className="scoreit-setup-header relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(52,211,153,0.34),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.25),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.92),rgba(15,23,42,0.72))]" />
        <div className="relative flex h-20 items-end justify-between px-4 pb-4 sm:h-24 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white"
            aria-label="Back"
          >
            <ChevronLeft size={25} />
          </button>
          <div className="text-center">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-emerald-100">Time Pass</p>
            <h1 className="mt-1 text-xl font-black">{title}</h1>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-300 text-slate-950">
            <HeaderIcon size={20} />
          </span>
        </div>
      </header>
      <section className="mx-auto max-w-xl px-4 py-5 sm:px-6">{children}</section>
    </main>
  )
}

function LudoPage({ onBack }) {
  return (
    <main className="scoreit-ludo-page min-h-svh">
      <button
        type="button"
        onClick={onBack}
        className="scoreit-ludo-back fixed left-4 top-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]"
        aria-label="Back to games"
      >
        <ChevronLeft size={26} />
      </button>
      <section className="mx-auto w-full max-w-[1180px] px-3 pb-8 pt-20 sm:px-6 lg:px-0">
        <OriginalLudoGame onBack={onBack} />
      </section>
    </main>
  )
}

function ChessPage({ onBack }) {
  return (
    <main className="scoreit-ludo-page min-h-svh">
      <button
        type="button"
        onClick={onBack}
        className="scoreit-ludo-back fixed left-4 top-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]"
        aria-label="Back to games"
      >
        <ChevronLeft size={26} />
      </button>
      <section className="mx-auto w-full max-w-[1180px] px-3 pb-8 pt-20 sm:px-6 lg:px-0">
        <OriginalChessGame onBack={onBack} />
      </section>
    </main>
  )
}

export default function TimePassGames({ mode, onOpenGame, onBack }) {
  if (mode === 'ludo') {
    return <LudoPage onBack={onBack} />
  }

  if (mode === 'chess') {
    return <ChessPage onBack={onBack} />
  }

  return (
    <GameShell title="Games" icon={Gamepad2} onBack={onBack}>
      <div className="grid gap-4">
        <section className="scoreit-live-card rounded-[1.5rem] bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Time Pass Zone</p>
          <h2 className="mt-2 text-2xl font-black">Play between innings</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
            Quick offline mini games for breaks, rain delays, and innings change.
          </p>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => onOpenGame('ludo')} className="scoreit-live-card rounded-[1.5rem] bg-white p-5 text-left">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-300 text-slate-950">
              <Dice5 size={24} />
            </span>
            <h3 className="mt-5 text-xl font-black">Ludo</h3>
            <p className="mt-2 text-sm font-bold text-slate-500">Open the full Ludo board page.</p>
          </button>

          <button type="button" onClick={() => onOpenGame('chess')} className="scoreit-live-card rounded-[1.5rem] bg-white p-5 text-left">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300 text-slate-950">
              <Crown size={24} />
            </span>
            <h3 className="mt-5 text-xl font-black">Chess</h3>
            <p className="mt-2 text-sm font-bold text-slate-500">Two-player board with legal moves, captures, and promotion.</p>
          </button>
        </div>
      </div>
    </GameShell>
  )
}
