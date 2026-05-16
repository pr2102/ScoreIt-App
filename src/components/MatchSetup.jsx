import { useEffect, useRef, useState } from 'react'
import {
  BarChart3,
  ChevronLeft,
  Database,
  Home,
  Info,
  Minus,
  Play,
  Plus,
  Smartphone,
  Trash2,
  Trophy,
  User,
  Users,
  WifiOff,
} from 'lucide-react'

function Stepper({ step }) {
  return (
    <div className="px-5 pb-6 pt-4 sm:px-7 sm:pb-8 sm:pt-5">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-7 h-1 rounded-full bg-white/25" />
        <div
          className="absolute left-0 top-7 h-1 rounded-full bg-yellow-300 transition-all"
          style={{ width: step === 1 ? '24%' : '100%' }}
        />
        {[1, 2].map((item) => (
          <div key={item} className="relative z-10 flex flex-col items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-black sm:h-14 sm:w-14 sm:text-xl ${
                step >= item
                  ? 'bg-yellow-300 text-slate-800'
                  : 'border-4 border-white/25 bg-transparent text-white'
              }`}
            >
              {item}
            </div>
            <span className={`text-sm font-bold ${step >= item ? 'text-white' : 'text-white/55'}`}>
              {item === 1 ? 'Rules' : 'Toss'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppHeader({ title, step, onBack }) {
  return (
    <header className="bg-[#3954b4] text-white">
      <div className="flex h-20 items-end justify-center px-5 pb-4 sm:h-24 sm:px-6 sm:pb-5">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full text-white sm:left-6 sm:h-12 sm:w-12"
          aria-label="Back"
        >
          <ChevronLeft size={30} />
        </button>
        <h1 className="text-xl font-black sm:text-2xl">{title}</h1>
      </div>
      {step ? <Stepper step={step} /> : null}
    </header>
  )
}

function HomeHeader() {
  return (
    <header className="flex h-24 items-end justify-between bg-[#3954b4] px-5 pb-5 text-white sm:h-28 sm:px-7 sm:pb-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-yellow-300 text-yellow-300 sm:h-14 sm:w-14">
          <Trophy size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">ScoreIt</h1>
          <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-yellow-200 sm:text-xs sm:tracking-[0.2em]">
            Made by Rustom Singh Yadav
          </p>
        </div>
      </div>
    </header>
  )
}

function BottomNav() {
  const navItems = [
    { icon: <Home size={30} />, label: 'Home', active: true },
    { icon: <Users size={30} />, label: 'My Team', active: false },
    { icon: <Trophy size={30} />, label: 'Tournament', active: false },
    { icon: <User size={30} />, label: 'Profile', active: false },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 grid grid-cols-4 bg-[#3954b4] px-3 pb-3 pt-2 text-white shadow-[0_-8px_24px_rgba(15,23,42,0.2)]">
      {navItems.map(({ icon, label, active }) => (
        <div key={label} className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-white/60'}`}>
          {icon}
          <span className="text-sm font-medium">{label}</span>
          {active ? <span className="h-1 w-12 rounded-full bg-white" /> : <span className="h-1" />}
        </div>
      ))}
    </nav>
  )
}

function StartMatchCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scoreit-live-card scoreit-floating-card relative h-36 overflow-hidden rounded-3xl bg-[#3954b4] p-5 text-left text-white shadow-lg sm:h-44 sm:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(90deg,rgba(57,84,180,0.96),rgba(57,84,180,0.68))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_0%,transparent_45%,rgba(255,255,255,0.28)_45%,rgba(255,255,255,0.28)_52%,transparent_52%)]" />
      <div className="relative flex h-full items-center gap-5 sm:gap-8">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#3954b4] sm:h-20 sm:w-20">
          <Play className="ml-1 fill-[#3954b4]" size={30} />
        </span>
        <span>
          <span className="block text-2xl font-black sm:text-3xl">Start Match</span>
          <span className="mt-2 block text-sm font-medium leading-6 text-white/90 sm:mt-3 sm:text-lg sm:leading-7">
            Create a new casual match.
          </span>
        </span>
      </div>
    </button>
  )
}

function AppIntroCard() {
  return (
    <section className="scoreit-live-card rounded-[1.7rem] bg-white p-5 shadow-xl shadow-slate-200">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-300 text-[#3954b4]">
          <Info size={24} />
        </span>
        <div>
          <h2 className="text-xl font-black">Fast cricket scoring, built for local matches.</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Create a casual match, flip a real coin toss, enter player names, and score every ball with live scoreboard, overs, analytics, saved matches, and undo.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600 sm:grid-cols-3">
        <span className="rounded-2xl bg-slate-100 px-4 py-3">1. Setup rules</span>
        <span className="rounded-2xl bg-slate-100 px-4 py-3">2. Toss & players</span>
        <span className="rounded-2xl bg-slate-100 px-4 py-3">3. Start scoring</span>
      </div>
    </section>
  )
}

function RecentMatchCard({ match, onOpenMatch, onDeleteMatch }) {
  const first = match.innings?.[0]
  const second = match.innings?.[1]
  return (
    <button
      type="button"
      onClick={() => onOpenMatch(match)}
      className="scoreit-live-card w-full rounded-[2rem] bg-yellow-50 p-5 text-left shadow-sm"
    >
      <div className="grid grid-cols-[1fr_1.2fr_1fr] items-center gap-3 text-center">
        <div>
          <Avatar team={match.setup.team1} />
          <p className="mt-2 text-2xl">{first?.runs || 0}/{first?.wickets || 0}</p>
          <p className="text-slate-500">{first ? ballsToOvers(first.legalBalls) : '0.0'} ov</p>
        </div>
        <div>
          <p className="text-2xl font-medium">Matches 2026</p>
          <span className="mt-3 inline-block rounded-full bg-[#3954b4] px-4 py-1 text-sm font-bold text-white">
            {match.setup.team1} Vs {match.setup.team2}
          </span>
          <p className="mt-3 text-xl font-black">{new Date(match.updatedAt).toLocaleDateString()}</p>
        </div>
        <div>
          <Avatar team={match.setup.team2} tone="orange" />
          <p className="mt-2 text-2xl">{second?.runs || 0}/{second?.wickets || 0}</p>
          <p className="text-slate-500">{second ? ballsToOvers(second.legalBalls) : '0.0'} ov</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-500 pt-4">
        <span className="text-2xl font-medium">Resume Scoring</span>
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
              ? 'bg-[#3954b4] text-white shadow-lg shadow-blue-900/25'
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
          className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 text-[#3954b4] sm:h-16"
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
          className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 text-[#3954b4] sm:h-16"
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
          ? 'bg-blue-500 text-white'
          : tone === 'orange'
            ? 'bg-orange-300 text-white'
            : 'bg-pink-100 text-slate-800'
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
    <div className="scoreit-live-card rounded-[1.7rem] bg-white p-6 shadow-xl shadow-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">Real Coin Toss</p>
          <p className="mt-2 text-sm font-bold text-slate-500">
            Pick which team calls Heads and Tails.
          </p>
        </div>
        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-black text-[#3954b4]">
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
                        ? 'bg-[#3954b4] text-white shadow-lg shadow-blue-900/25'
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
        className="mt-6 h-14 w-full rounded-2xl bg-[#3954b4] text-lg font-black text-white disabled:opacity-60"
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
  const nextWithTeams = {
    ...draft,
    tossWinner: draft.tossWinner === draft.team2 ? draft.team2 : draft.team1,
  }

  const startMatch = () => {
    onSetupChange(draft)
    setScreen('started')
  }

  if (screen === 'home') {
    return (
      <main className="min-h-svh bg-white pb-28 text-slate-800">
        <HomeHeader />
        <section className="mx-auto max-w-xl space-y-7 px-6 py-7">
          <AppIntroCard />
          <StartMatchCard onClick={() => setScreen('matchType')} />
          <div>
            <h2 className="mb-4 text-2xl font-black text-slate-600 sm:mb-5 sm:text-3xl">Recent Matches</h2>
            {storedMatches.length ? (
              <RecentMatchCard
                match={storedMatches[0]}
                onOpenMatch={onOpenMatch}
                onDeleteMatch={onDeleteMatch}
              />
            ) : (
              <div className="rounded-[2rem] bg-yellow-50 p-6 text-center text-slate-500">
                No recent matches yet.
              </div>
            )}
          </div>
        </section>
        <button
          type="button"
          className="fixed bottom-24 right-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-300 text-[#3954b4] shadow-xl sm:right-7 sm:h-16 sm:w-16"
        >
          <BarChart3 size={28} />
        </button>
        <BottomNav />
      </main>
    )
  }

  if (screen === 'matchType') {
    return (
      <main className="min-h-svh bg-slate-100 text-slate-800">
        <AppHeader title="Select Match Type" onBack={() => setScreen('home')} />
        <section className="mx-auto max-w-xl px-5 py-9">
          <div className="rounded-[1.7rem] bg-white p-7 shadow-xl shadow-slate-200">
            <div className="flex items-start gap-5">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-yellow-50 text-4xl sm:h-28 sm:w-28 sm:text-5xl">
                🏏
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Casual Match</h2>
                  <span className="rounded-2xl bg-orange-50 px-4 py-2 text-base font-black text-orange-700">
                    Offline
                  </span>
                </div>
                <p className="mt-3 text-xl font-bold text-slate-500">Fast & Simple Scoring</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 divide-x divide-slate-200 text-center text-sm font-black text-slate-500">
              <span className="px-2">Instant Start</span>
              <span className="px-2">Saved on this phone</span>
              <span className="px-2">No Login</span>
            </div>
            <button
              type="button"
              onClick={() => setScreen('rules')}
              className="mt-8 h-14 w-full rounded-xl bg-yellow-300 text-lg font-black text-[#3954b4] sm:h-16 sm:text-xl"
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
        <section className="mx-auto max-w-xl space-y-7 px-5 py-7 sm:space-y-10 sm:px-6 sm:py-9">
          {[
            { label: 'Striker Name', key: 'strikerName', Icon: User, placeholder: 'Enter Player 1 Name' },
            { label: 'Non-Striker Name', key: 'nonStrikerName', Icon: Users, placeholder: 'Enter Player 2 Name' },
            { label: 'Bowler Name', key: 'bowlerName', Icon: Trophy, placeholder: 'Enter Bowler Name' },
          ].map((field) => (
            <label key={field.key} className="block space-y-4">
              <span className="text-xl font-black text-slate-800">{field.label}</span>
              <span className="flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 sm:h-20 sm:gap-4 sm:px-6">
                <field.Icon className="text-slate-300" size={28} />
                <input
                  value={draft[field.key]}
                  onChange={(event) => set(field.key, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent text-xl font-bold text-slate-800 outline-none placeholder:text-slate-300"
                />
              </span>
            </label>
          ))}
          <div className="pt-16 text-center">
            <button
              type="button"
              onClick={startMatch}
              className="h-14 w-full max-w-sm rounded-2xl bg-yellow-300 text-2xl font-medium text-[#3954b4] shadow-md sm:h-16 sm:text-3xl"
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
        <section className="relative min-h-[38svh] overflow-hidden bg-gradient-to-b from-sky-500 to-emerald-900 px-5 py-10 text-center text-white sm:min-h-[46svh] sm:px-6 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative mx-auto max-w-md">
            <h1 className="text-4xl font-black tracking-wide sm:text-5xl">Match Started!</h1>
            <Trophy className="mx-auto mt-10 text-yellow-300 drop-shadow-2xl sm:mt-14" size={88} />
          </div>
        </section>
        <section className="relative mx-4 -mt-12 rounded-[2rem] bg-white p-5 text-center shadow-2xl shadow-slate-300 sm:mx-5 sm:-mt-14 sm:p-7">
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
          <p className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-amber-500">
            ⚡ Fast!! ⚡ Live! ⚡ Fun! ⚡
          </p>
          <button
            type="button"
            onClick={() => onStart(draft)}
            className="mt-7 h-14 w-full rounded-xl bg-blue-600 text-xl font-medium text-white sm:h-16 sm:text-2xl"
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
        <section className="mx-auto max-w-xl space-y-8 px-5 pb-32 pt-0">
          <div className="-mt-0 rounded-[1.7rem] bg-white p-6 shadow-xl shadow-slate-200">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Teams</p>
            <div className="space-y-5">
              <input
                value={draft.team1}
                onChange={(event) => set('team1', event.target.value)}
                placeholder="Host Team"
                className="h-16 w-full rounded-2xl bg-slate-100 px-5 text-xl font-bold outline-none placeholder:text-slate-500 sm:h-20 sm:px-6 sm:text-2xl"
              />
              <input
                value={draft.team2}
                onChange={(event) => set('team2', event.target.value)}
                placeholder="Visitor Team"
                className="h-16 w-full rounded-2xl bg-slate-100 px-5 text-xl font-bold outline-none placeholder:text-slate-500 sm:h-20 sm:px-6 sm:text-2xl"
              />
            </div>
          </div>

          <div className="rounded-[1.7rem] bg-white p-6 shadow-xl shadow-slate-200">
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
            <div className="mt-8 space-y-8">
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
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
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
                  draft.declaredNoStrike ? 'bg-[#3954b4]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block h-10 w-10 rounded-full bg-white transition ${
                    draft.declaredNoStrike ? 'translate-x-8' : ''
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
        <section className="mx-auto max-w-xl space-y-8 px-5 pb-32 pt-8">
          <div className="rounded-[1.7rem] bg-white p-6 text-center shadow-xl shadow-slate-200 sm:p-8">
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
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Pill>{draft.overs} Overs</Pill>
              <Pill>{draft.playersPerSide} Players</Pill>
              <Pill>{draft.wideRuns} Wide Run</Pill>
              <Pill>{draft.noBallRuns} No Ball Run</Pill>
            </div>
          </div>

          <div>
            <p className="mb-8 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Toss Details</p>
            <RealCoinToss
              team1={draft.team1 || 'Team 1'}
              team2={draft.team2 || 'Team 2'}
              coinCalls={coinCalls}
              onCoinCallsChange={(nextCalls) => set('coinCalls', nextCalls)}
              tossWinner={nextWithTeams.tossWinner}
              onWinner={(winner) => set('tossWinner', winner)}
            />
            <p className="mb-4 text-lg font-black">Who won the toss?</p>
            <Segment
              options={[draft.team1 || 'Team 1', draft.team2 || 'Team 2']}
              value={nextWithTeams.tossWinner}
              onChange={(value) => set('tossWinner', value)}
            />
            <p className="mb-4 mt-9 text-lg font-black">Elected to</p>
            <Segment options={['Bat', 'Bowl']} value={draft.electedTo} onChange={(value) => set('electedTo', value)} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 bg-white p-5 shadow-[0_-8px_28px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => {
            onSetupChange(draft)
            setScreen(screen === 'rules' ? 'toss' : 'players')
          }}
          className="h-14 w-full rounded-xl bg-yellow-300 text-2xl font-medium text-[#3954b4] sm:h-16 sm:text-3xl"
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
                ? 'bg-[#3954b4] text-white shadow-lg shadow-blue-900/25'
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
  return <span className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-500">{children}</span>
}

function SavedMatches({ storedMatches, onOpenMatch, onDeleteMatch }) {
  return (
    <div className="rounded-[1.7rem] bg-white p-5 shadow-xl shadow-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <Database className="text-[#3954b4]" size={22} />
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
