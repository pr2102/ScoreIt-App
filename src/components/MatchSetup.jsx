import { useEffect, useRef, useState } from 'react'
import {
  Activity,
  ChevronLeft,
  Database,
  Gamepad2,
  Minus,
  Play,
  Plus,
  Smartphone,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  User,
  Users,
  WifiOff,
} from 'lucide-react'
import TimePassGames from './TimePassGames'

function Stepper({ step }) {
  const steps = [
    { id: 1, label: 'Rules', caption: 'Teams & format' },
    { id: 2, label: 'Toss', caption: 'Coin & decision' },
  ]

  return (
    <div className="px-4 pb-5 sm:px-6 sm:pb-7">
      <div className="rounded-[1.4rem] border border-white/12 bg-slate-950/35 p-2 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-2">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-[1.1rem] border px-3 py-3 transition ${
              step >= item.id
                ? 'border-emerald-300/55 bg-emerald-300/16 text-white shadow-[0_0_24px_rgba(16,185,129,0.2)]'
                : 'border-white/10 bg-white/[0.04] text-white/55'
            }`}
          >
            {step >= item.id ? (
              <span className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-300/20 blur-xl" />
            ) : null}
            <div
              className={`relative mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                step >= item.id
                  ? 'bg-emerald-300 text-slate-950'
                  : 'border border-white/25 bg-transparent text-white'
              }`}
            >
              {item.id}
            </div>
            <span className="relative text-sm font-black">{item.label}</span>
            <p className={`relative mt-1 text-[0.7rem] font-semibold ${step >= item.id ? 'text-emerald-100' : 'text-white/40'}`}>
              {item.caption}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

function AppHeader({ title, step, onBack }) {
  return (
    <header className="scoreit-setup-header relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(52,211,153,0.34),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.25),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.9),rgba(15,23,42,0.64))]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
      <div className="relative flex h-20 items-end justify-between px-4 pb-4 sm:h-24 sm:px-6 sm:pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-xl sm:h-11 sm:w-11"
          aria-label="Back"
        >
          <ChevronLeft size={26} />
        </button>
        <div className="text-center">
          <p className="mx-auto mb-1 w-max rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[0.58rem] font-black uppercase tracking-[0.22em] text-emerald-100">
            Live setup
          </p>
          <h1 className="text-lg font-black sm:text-2xl">{title}</h1>
        </div>
        <div className="h-10 w-10 sm:h-11 sm:w-11" />
      </div>
      {step ? <Stepper step={step} /> : null}
    </header>
  )
}

function HomeHeader() {
  return (
    <header className="scoreit-home-hero relative overflow-hidden px-4 pb-5 pt-12 text-white sm:px-7 sm:pb-7 sm:pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.4),transparent_28%),radial-gradient(circle_at_84%_10%,rgba(250,204,21,0.24),transparent_26%),linear-gradient(145deg,rgba(2,6,23,0.94),rgba(15,23,42,0.7))]" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <div className="relative mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="scoreit-score-orb flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-slate-950 sm:h-14 sm:w-14">
            <Trophy size={24} />
          </div>
          <div>
            <p className="scoreit-live-badge text-[0.62rem] font-black uppercase tracking-[0.2em] text-emerald-100">
              Live cricket scorer
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">ScoreIt</h1>
            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/60">
              Made by Rustom Singh Yadav
            </p>
          </div>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-right backdrop-blur-xl min-[420px]:block">
          <div className="flex items-center justify-end gap-2 text-amber-200">
            <Activity size={16} />
            <p className="text-lg font-black">200</p>
          </div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/55">Saved matches</p>
        </div>
      </div>
    </header>
  )
}

function StartMatchCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scoreit-live-card scoreit-floating-card relative min-h-40 overflow-hidden rounded-[1.6rem] bg-slate-950 p-5 text-left text-white shadow-lg sm:min-h-48 sm:p-7"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(16,185,129,0.36),transparent_28%),radial-gradient(circle_at_8%_100%,rgba(245,158,11,0.3),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(6,78,59,0.9))]" />
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-emerald-100">
        <Sparkles size={12} />
        New
      </div>
      <div className="relative flex h-full items-center gap-4 sm:gap-7">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-300 text-slate-950 shadow-[0_0_34px_rgba(16,185,129,0.3)] sm:h-20 sm:w-20">
          <Play className="ml-1 fill-slate-950" size={30} />
        </span>
        <span>
          <span className="block text-2xl font-black tracking-tight sm:text-3xl">Start Match</span>
          <span className="mt-2 block max-w-xs text-sm font-medium leading-6 text-white/72 sm:mt-3 sm:text-base sm:leading-7">
            Setup teams, flip the toss, and begin ball-by-ball scoring.
          </span>
        </span>
      </div>
    </button>
  )
}

function AppIntroCard() {
  return (
    <section className="scoreit-live-card rounded-[1.6rem] bg-white p-5 shadow-xl shadow-slate-200">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-300 text-slate-950">
          <Target size={24} />
        </span>
        <div>
          <h2 className="text-lg font-black leading-tight sm:text-xl">Fast cricket scoring for local matches.</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Create a casual match, flip a real coin toss, enter player names, and score every ball with live scoreboard, overs, analytics, saved matches, and undo.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600 min-[430px]:grid-cols-3">
        {['Setup rules', 'Toss & players', 'Start scoring'].map((item, index) => (
          <span key={item} className="rounded-2xl bg-slate-100 px-4 py-3">
            {index + 1}. {item}
          </span>
        ))}
      </div>
    </section>
  )
}

function TimePassCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scoreit-live-card w-full rounded-[1.6rem] bg-white p-5 text-left"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-300 text-slate-950">
          <Gamepad2 size={25} />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black">Time Pass</span>
          <span className="mt-1 block text-sm font-bold leading-6 text-slate-500">
            Open Ludo and Chess mini games.
          </span>
        </span>
      </div>
    </button>
  )
}

function RecentMatchCard({ match, onOpenMatch, onDeleteMatch }) {
  const first = match.innings?.[0]
  const second = match.innings?.[1]
  return (
    <button
      type="button"
      onClick={() => onOpenMatch(match)}
      className="scoreit-live-card w-full rounded-[1.6rem] bg-yellow-50 p-4 text-left shadow-sm sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Latest save</p>
          <p className="mt-1 text-lg font-black">{match.setup.team1} vs {match.setup.team2}</p>
        </div>
        <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">
          {match.status === 'complete' ? 'Completed' : 'Resume'}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <div>
          <Avatar team={match.setup.team1} tone="blue" />
          <p className="mt-2 text-xl font-black">{first?.runs || 0}/{first?.wickets || 0}</p>
          <p className="text-slate-500">{first ? ballsToOvers(first.legalBalls) : '0.0'} ov</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Scorecard</p>
          <p className="mt-2 text-sm font-bold text-slate-500">{new Date(match.updatedAt).toLocaleDateString()}</p>
        </div>
        <div>
          <Avatar team={match.setup.team2} tone="orange" />
          <p className="mt-2 text-xl font-black">{second?.runs || 0}/{second?.wickets || 0}</p>
          <p className="text-slate-500">{second ? ballsToOvers(second.legalBalls) : '0.0'} ov</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-base font-black">{match.status === 'complete' ? 'View Details' : 'Continue Scoring'}</span>
        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation()
            onDeleteMatch(match.id)
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            event.stopPropagation()
            onDeleteMatch(match.id)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-600"
        >
          <Trash2 size={17} />
        </span>
      </div>
    </button>
  )
}

function Segment({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-xl px-3 py-3 text-sm font-black transition ${
            value === option
              ? 'bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-900/20'
              : 'text-slate-500'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function ballsToOvers(balls = 0) {
  return `${Math.floor(balls / 6)}.${balls % 6}`
}

function Counter({ label, value, onChange, min = 1, max = 50 }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <div className="grid grid-cols-[60px_1fr_60px] items-center gap-3 sm:grid-cols-[86px_1fr_86px] sm:gap-5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, Number(value) - 1))}
          className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 text-emerald-300 sm:h-16"
        >
          <Minus size={28} />
        </button>
        <input
          value={value}
          onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
          className="h-12 rounded-2xl border border-slate-300 bg-slate-50 text-center text-2xl font-black text-slate-800 outline-none sm:h-16 sm:text-3xl"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, Number(value) + 1))}
          className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 text-emerald-300 sm:h-16"
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  )
}

function Avatar({ team, tone }) {
  return (
    <div
      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-black shadow-inner sm:h-20 sm:w-20 sm:text-3xl ${
        tone === 'blue'
          ? 'bg-cyan-400 text-slate-950'
          : tone === 'orange'
            ? 'bg-amber-300 text-slate-950'
            : 'bg-emerald-300 text-slate-950'
      }`}
    >
      {team?.slice(0, 1).toUpperCase() || 'T'}
    </div>
  )
}

function CoinFace({ side }) {
  const isHeads = side === 'Heads'

  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-full border shadow-2xl ${
        isHeads
          ? 'border-amber-100 bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 text-amber-950'
          : 'border-sky-100 bg-gradient-to-br from-slate-100 via-cyan-200 to-blue-400 text-slate-950'
      }`}
      style={{
        backfaceVisibility: 'hidden',
        transform: isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)',
      }}
    >
      <span className="absolute inset-[9%] rounded-full border border-white/45" />
      <span className="absolute inset-[18%] rounded-full border border-black/10" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
        <span className="text-4xl font-black sm:text-5xl">{isHeads ? 'H' : 'T'}</span>
        <span className="text-base font-black uppercase tracking-widest">{side}</span>
      </div>
    </div>
  )
}

function RealCoinToss({ team1, team2, tossWinner, coinCalls, onCoinCallsChange, onWinner }) {
  const tossDurationMs = 2300
  const settleTimeoutRef = useRef(null)
  const [coinRotation, setCoinRotation] = useState(0)
  const [isTossing, setIsTossing] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => () => window.clearTimeout(settleTimeoutRef.current), [])

  const flipCoin = () => {
    if (isTossing) return

    window.clearTimeout(settleTimeoutRef.current)
    const nextResult = Math.random() < 0.5 ? 'Heads' : 'Tails'
    const winner = nextResult === 'Heads' ? coinCalls.Heads : coinCalls.Tails
    const finalFaceRotation = nextResult === 'Heads' ? 0 : 180

    setIsTossing(true)
    setResult(null)
    setCoinRotation((currentRotation) => {
      const normalizedRotation = ((currentRotation % 360) + 360) % 360
      const finalOffset = ((finalFaceRotation - normalizedRotation) + 360) % 360
      return currentRotation + 12 * 180 + finalOffset
    })

    settleTimeoutRef.current = window.setTimeout(() => {
      setResult(nextResult)
      setIsTossing(false)
      onWinner(winner)
    }, tossDurationMs)
  }

  return (
    <div className="scoreit-live-card rounded-[1.5rem] bg-white p-5 shadow-xl shadow-slate-200 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">Real Coin Toss</p>
          <p className="mt-2 text-sm font-bold text-slate-500">
            Pick which team calls Heads and Tails.
          </p>
        </div>
        <span className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-black text-slate-950">
          {result || 'Ready'}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ['Heads', coinCalls.Heads],
          ['Tails', coinCalls.Tails],
        ].map(([side, team]) => (
          <div key={side} className="rounded-2xl bg-slate-100 p-2">
            <p className="px-2 pb-2 text-xs font-black uppercase tracking-widest text-slate-500">
              {side}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[team1, team2].map((option) => {
                const otherSide = side === 'Heads' ? 'Tails' : 'Heads'
                const active = team === option

                return (
                  <button
                    key={`${side}-${option}`}
                    type="button"
                    disabled={isTossing}
                    onClick={() =>
                      onCoinCallsChange({
                        [side]: option,
                        [otherSide]: option === team1 ? team2 : team1,
                      })
                    }
                    className={`rounded-xl px-3 py-3 text-sm font-black transition ${
                      active
                        ? 'bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-900/20'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid place-items-center">
        <div className="[perspective:1400px]">
          <div
            className="relative h-24 w-24 will-change-transform sm:h-32 sm:w-32"
            style={{
              transform: `rotateY(${coinRotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: `transform ${isTossing ? tossDurationMs : 520}ms cubic-bezier(0.2,0.82,0.18,1)`,
            }}
          >
            <CoinFace side="Heads" />
            <CoinFace side="Tails" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={flipCoin}
        disabled={isTossing}
        className="mt-6 h-14 w-full rounded-2xl bg-emerald-300 text-base font-black text-slate-950 disabled:opacity-60 sm:text-lg"
      >
        {isTossing ? 'Flipping...' : tossWinner ? 'Flip Again' : 'Flip Coin'}
      </button>
      {tossWinner ? (
        <p className="mt-4 text-center text-lg font-black text-slate-800">{tossWinner} won the toss</p>
      ) : null}
    </div>
  )
}

function scoreLine(match) {
  const first = match.innings?.[0]
  const second = match.innings?.[1]
  const firstScore = first ? `${first.runs}/${first.wickets}` : '-'
  const secondScore = second?.legalBalls || second?.runs ? `${second.runs}/${second.wickets}` : 'Yet to bat'

  return `${match.setup.team1} ${firstScore} - ${match.setup.team2} ${secondScore}`
}

function matchDate(match) {
  const date = new Date(match.updatedAt || match.createdAt || Date.now())
  return Number.isNaN(date.getTime()) ? 'Saved match' : date.toLocaleString()
}

export default function MatchSetup({
  setup,
  onSetupChange,
  onStart,
  storedMatches = [],
  onOpenMatch,
  onDeleteMatch,
}) {
  const [draft, setDraft] = useState(setup)
  const [screen, setScreen] = useState('home')
  const set = (key, value) => setDraft({ ...draft, [key]: value })
  const coinCalls = draft.coinCalls || {
    Heads: draft.team1 || 'Team 1',
    Tails: draft.team2 || 'Team 2',
  }

  const startMatch = () => {
    onSetupChange(draft)
    setScreen('started')
  }

  if (screen === 'home') {
    return (
      <main className="min-h-svh bg-white text-slate-800">
        <HomeHeader />
        <section className="mx-auto max-w-xl space-y-5 px-4 py-5 sm:space-y-7 sm:px-6 sm:py-7">
          <AppIntroCard />
          <StartMatchCard onClick={() => setScreen('matchType')} />
          <TimePassCard onClick={() => setScreen('timePass')} />
          <div>
            <h2 className="mb-3 text-lg font-black text-slate-600 sm:mb-5 sm:text-2xl">Recent Matches</h2>
            {storedMatches.length ? (
              <RecentMatchCard
                match={storedMatches[0]}
                onOpenMatch={onOpenMatch}
                onDeleteMatch={onDeleteMatch}
              />
            ) : (
              <div className="scoreit-live-card rounded-[1.5rem] bg-yellow-50 p-6 text-center text-slate-500">
                No recent matches yet.
              </div>
            )}
          </div>
        </section>
      </main>
    )
  }

  if (screen === 'timePass' || screen === 'ludo' || screen === 'chess') {
    return (
      <TimePassGames
        mode={screen === 'timePass' ? 'hub' : screen}
        onOpenGame={(game) => setScreen(game)}
        onBack={() => setScreen(screen === 'timePass' ? 'home' : 'timePass')}
      />
    )
  }

  if (screen === 'matchType') {
    return (
      <main className="min-h-svh bg-slate-100 text-slate-800">
        <AppHeader title="Select Match Type" onBack={() => setScreen('home')} />
        <section className="mx-auto max-w-xl px-4 py-6 sm:px-5 sm:py-9">
          <div className="scoreit-live-card rounded-[1.6rem] bg-white p-5 shadow-xl shadow-slate-200 sm:p-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-emerald-300 sm:h-24 sm:w-24">
                <Trophy className="text-slate-950" size={34} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-slate-900 sm:text-3xl">Casual Match</h2>
                  <span className="rounded-2xl bg-amber-300 px-3 py-2 text-xs font-black text-slate-950 sm:px-4 sm:text-sm">
                    Offline
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-500 sm:text-lg">Fast setup for practice, box cricket, and ground cricket.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-black text-slate-500 sm:mt-8 sm:text-sm">
              <span className="rounded-2xl bg-slate-100 px-2 py-3">Instant Start</span>
              <span className="rounded-2xl bg-slate-100 px-2 py-3">Phone Save</span>
              <span className="rounded-2xl bg-slate-100 px-2 py-3">No Login</span>
            </div>
            <button
              type="button"
              onClick={() => setScreen('rules')}
              className="mt-7 h-14 w-full rounded-2xl bg-emerald-300 text-base font-black text-slate-950 sm:mt-8 sm:h-16 sm:text-xl"
            >
              Start Casual Match
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (screen === 'players') {
    return (
      <main className="min-h-svh bg-white text-slate-800">
        <AppHeader title="Player Selection" onBack={() => setScreen('toss')} />
        <section className="mx-auto max-w-xl space-y-5 px-4 py-6 sm:space-y-7 sm:px-6 sm:py-9">
          {[
            { label: 'Striker Name', key: 'strikerName', Icon: User, placeholder: 'Enter Player 1 Name' },
            { label: 'Non-Striker Name', key: 'nonStrikerName', Icon: Users, placeholder: 'Enter Player 2 Name' },
            { label: 'Bowler Name', key: 'bowlerName', Icon: Trophy, placeholder: 'Enter Bowler Name' },
          ].map((field) => (
            <label key={field.key} className="scoreit-live-card block rounded-[1.4rem] bg-white p-4">
              <span className="text-base font-black text-slate-800 sm:text-lg">{field.label}</span>
              <span className="mt-3 flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 sm:h-16 sm:gap-4">
                <field.Icon className="text-emerald-300" size={24} />
                <input
                  value={draft[field.key]}
                  onChange={(event) => set(field.key, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent text-base font-bold text-slate-800 outline-none placeholder:text-slate-400 sm:text-lg"
                />
              </span>
            </label>
          ))}
          <div className="pt-4 text-center sm:pt-8">
            <button
              type="button"
              onClick={startMatch}
              className="h-14 w-full max-w-sm rounded-2xl bg-emerald-300 text-lg font-black text-slate-950 shadow-md sm:h-16 sm:text-xl"
            >
              Start Match
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (screen === 'started') {
    return (
      <main className="min-h-svh bg-white text-slate-800">
        <section className="relative min-h-[34svh] overflow-hidden px-5 py-10 text-center text-white sm:min-h-[42svh] sm:px-6 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.32),transparent_42%),linear-gradient(145deg,#020617,#064e3b)]" />
          <div className="relative mx-auto max-w-md">
            <p className="scoreit-live-badge text-xs font-black uppercase tracking-[0.24em] text-emerald-100">Ready to score</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Match Started!</h1>
            <Trophy className="mx-auto mt-8 text-amber-300 drop-shadow-2xl sm:mt-12" size={78} />
          </div>
        </section>
        <section className="scoreit-live-card relative mx-4 -mt-10 rounded-[1.7rem] bg-white p-5 text-center shadow-2xl shadow-slate-300 sm:mx-5 sm:-mt-14 sm:p-7">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div>
              <Avatar team={draft.team1} tone="blue" />
              <p className="mt-3 text-lg font-black">{draft.team1}</p>
            </div>
            <p className="text-4xl font-black text-slate-400">vs</p>
            <div>
              <Avatar team={draft.team2} tone="orange" />
              <p className="mt-3 text-lg font-black">{draft.team2}</p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50/40 p-5">
            <p className="scoreit-live-badge text-2xl font-black text-slate-900">
              Live Score!
            </p>
            <p className="mt-2 font-bold text-slate-500">Track the match in real-time.</p>
          </div>
          <p className="hidden">
            ⚡ Fast!! ⚡ Live! ⚡ Fun! ⚡
          </p>
          <button
            type="button"
            onClick={() => onStart(draft)}
            className="mt-7 h-14 w-full rounded-2xl bg-emerald-300 text-lg font-black text-slate-950 sm:h-16 sm:text-xl"
          >
            Start Scoring
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-slate-50 text-slate-800">
      <AppHeader
        title="Casual Match"
        step={screen === 'rules' ? 1 : 2}
        onBack={() => setScreen(screen === 'rules' ? 'matchType' : 'rules')}
      />

      {screen === 'rules' ? (
        <section className="mx-auto max-w-xl space-y-5 px-4 pb-28 pt-5 sm:space-y-7 sm:px-5 sm:pb-32">
          <div className="scoreit-live-card rounded-[1.5rem] bg-white p-5 shadow-xl shadow-slate-200 sm:p-6">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Teams</p>
            <div className="space-y-3 sm:space-y-5">
              <input
                value={draft.team1}
                onChange={(event) => set('team1', event.target.value)}
                placeholder="Host Team"
                className="h-14 w-full rounded-2xl bg-slate-100 px-4 text-base font-bold outline-none placeholder:text-slate-500 sm:h-16 sm:px-6 sm:text-xl"
              />
              <input
                value={draft.team2}
                onChange={(event) => set('team2', event.target.value)}
                placeholder="Visitor Team"
                className="h-14 w-full rounded-2xl bg-slate-100 px-4 text-base font-bold outline-none placeholder:text-slate-500 sm:h-16 sm:px-6 sm:text-xl"
              />
            </div>
          </div>

          <div className="scoreit-live-card rounded-[1.5rem] bg-white p-5 shadow-xl shadow-slate-200 sm:p-6">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Match Type</p>
            <Segment
              options={['Limited Overs', 'Test Match']}
              value={draft.matchType}
              onChange={(value) => set('matchType', value)}
            />
            <p className="mb-4 mt-8 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Pitch Type</p>
            <Segment
              options={['Box Cricket', 'Ground Cricket']}
              value={draft.pitchType}
              onChange={(value) => set('pitchType', value)}
            />
            <div className="mt-7 space-y-6 sm:space-y-8">
              <Counter label="Overs" value={Number(draft.overs)} onChange={(value) => set('overs', String(value))} />
              <Counter
                label="Player Per Side"
                value={Number(draft.playersPerSide)}
                min={2}
                max={15}
                onChange={(value) => set('playersPerSide', String(value))}
              />
            </div>

            <p className="mb-4 mt-8 text-sm font-black uppercase tracking-[0.24em] text-slate-500">
              Extras & Rules
            </p>
            <RuleRow label="Wide Run" value={String(draft.wideRuns)} onChange={(value) => set('wideRuns', value)} />
            <RuleRow label="No Ball Run" value={String(draft.noBallRuns)} onChange={(value) => set('noBallRuns', value)} />
            <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-slate-950 sm:h-14 sm:w-14">
                  <User size={28} />
                </span>
                <div>
                  <p className="text-lg font-black">Last Man Stands</p>
                  <p className="text-sm font-medium text-slate-500">Single Player Batting</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => set('declaredNoStrike', !draft.declaredNoStrike)}
                className={`h-12 w-20 rounded-full p-1 transition ${
                  draft.declaredNoStrike ? 'bg-emerald-300' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block h-10 w-10 rounded-full bg-white transition ${
                    draft.declaredNoStrike ? 'translate-x-8 bg-slate-950' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <SavedMatches
            storedMatches={storedMatches}
            onOpenMatch={onOpenMatch}
            onDeleteMatch={onDeleteMatch}
          />
        </section>
      ) : (
        <section className="mx-auto max-w-xl space-y-5 px-4 pb-28 pt-5 sm:space-y-7 sm:px-5 sm:pb-32 sm:pt-7">
          <div className="scoreit-live-card rounded-[1.5rem] bg-white p-5 text-center shadow-xl shadow-slate-200 sm:p-7">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <Avatar team={draft.team1} />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-500">Team 1</p>
                <p className="text-lg font-black">{draft.team1}</p>
              </div>
              <p className="text-xl font-black text-slate-500">vs</p>
              <div>
                <Avatar team={draft.team2} tone="orange" />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-500">Team 2</p>
                <p className="text-lg font-black">{draft.team2}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
              <Pill>{draft.overs} Overs</Pill>
              <Pill>{draft.playersPerSide} Players</Pill>
              <Pill>{draft.wideRuns} Wide Run</Pill>
              <Pill>{draft.noBallRuns} No Ball Run</Pill>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-slate-500 sm:mb-6">Toss Details</p>
            <RealCoinToss
              team1={draft.team1 || 'Team 1'}
              team2={draft.team2 || 'Team 2'}
              coinCalls={coinCalls}
              onCoinCallsChange={(nextCalls) => set('coinCalls', nextCalls)}
              tossWinner={draft.tossWinner}
              onWinner={(winner) => set('tossWinner', winner)}
            />
            <p className="mb-4 text-lg font-black">Who won the toss?</p>
            <Segment
              options={[draft.team1 || 'Team 1', draft.team2 || 'Team 2']}
              value={draft.tossWinner}
              onChange={(value) => set('tossWinner', value)}
            />
            <p className="mb-4 mt-9 text-lg font-black">Elected to</p>
            <Segment options={['Bat', 'Bowl']} value={draft.electedTo} onChange={(value) => set('electedTo', value)} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/70 p-4 shadow-[0_-8px_28px_rgba(15,23,42,0.2)] backdrop-blur-2xl sm:p-5">
        <button
          type="button"
          onClick={() => {
            onSetupChange(draft)
            setScreen(screen === 'rules' ? 'toss' : 'players')
          }}
          className="mx-auto block h-14 w-full max-w-xl rounded-2xl bg-emerald-300 text-lg font-black text-slate-950 sm:h-16 sm:text-xl"
        >
          {screen === 'rules' ? 'Next' : 'Start A Match'}
        </button>
      </div>
    </main>
  )
}

function RuleRow({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-lg font-black">{label}</p>
        <p className="text-sm font-medium text-slate-500">Runs Awarded</p>
      </div>
      <div className="grid grid-cols-3 rounded-2xl bg-slate-100 p-1">
        {['0', '1', 'Custom'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option === 'Custom' ? '2' : option)}
            className={`rounded-xl py-3 text-lg font-black transition ${
              (option === 'Custom' ? !['0', '1'].includes(value) : value === option)
                ? 'bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-900/20'
                : 'text-slate-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function Pill({ children }) {
  return <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-500 sm:px-5 sm:py-3 sm:text-sm">{children}</span>
}

function SavedMatches({ storedMatches, onOpenMatch, onDeleteMatch }) {
  return (
    <div className="scoreit-live-card rounded-[1.5rem] bg-white p-5 shadow-xl shadow-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <Database className="text-emerald-300" size={22} />
        <div>
          <p className="text-lg font-black">Stored Matches</p>
          <p className="text-xs text-slate-500">Last {Math.min(storedMatches.length, 200)} of 200 saved</p>
        </div>
      </div>
      <div className="grid max-h-72 gap-3 overflow-y-auto">
        {storedMatches.length ? (
          storedMatches.slice(0, 8).map((match) => (
            <button
              type="button"
              key={match.id}
              onClick={() => onOpenMatch(match)}
              className="rounded-2xl bg-slate-50 p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black">{scoreLine(match)}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {match.status === 'complete' ? match.result : 'In progress'} - {matchDate(match)}
                  </p>
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation()
                    onDeleteMatch(match.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    event.stopPropagation()
                    onDeleteMatch(match.id)
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600"
                >
                  <Trash2 size={16} />
                </span>
              </div>
            </button>
          ))
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            No stored matches yet.
          </p>
        )}
      </div>
    </div>
  )
}
