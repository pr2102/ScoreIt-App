import { useState } from 'react'
import {
  ChevronLeft,
  Database,
  Minus,
  Plus,
  Share2,
  Trash2,
  Trophy,
  User,
  Users,
} from 'lucide-react'

function Stepper({ step }) {
  return (
    <div className="px-7 pb-8 pt-5">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-7 h-1 rounded-full bg-white/25" />
        <div
          className="absolute left-0 top-7 h-1 rounded-full bg-yellow-300 transition-all"
          style={{ width: step === 1 ? '24%' : '100%' }}
        />
        {[1, 2].map((item) => (
          <div key={item} className="relative z-10 flex flex-col items-center gap-3">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-black ${
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
      <div className="flex h-24 items-end justify-center px-6 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full text-white"
          aria-label="Back"
        >
          <ChevronLeft size={34} />
        </button>
        <h1 className="text-2xl font-black">{title}</h1>
      </div>
      {step ? <Stepper step={step} /> : null}
    </header>
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

function Counter({ label, value, onChange, min = 1, max = 50 }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <div className="grid grid-cols-[86px_1fr_86px] items-center gap-5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, Number(value) - 1))}
          className="flex h-16 items-center justify-center rounded-2xl bg-slate-100 text-[#3954b4]"
        >
          <Minus size={28} />
        </button>
        <input
          value={value}
          onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
          className="h-16 rounded-2xl border border-slate-300 bg-slate-50 text-center text-3xl font-black text-slate-800 outline-none"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, Number(value) + 1))}
          className="flex h-16 items-center justify-center rounded-2xl bg-slate-100 text-[#3954b4]"
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
      className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black shadow-inner ${
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
  const [screen, setScreen] = useState('rules')
  const set = (key, value) => setDraft({ ...draft, [key]: value })
  const nextWithTeams = {
    ...draft,
    tossWinner: draft.tossWinner === draft.team2 ? draft.team2 : draft.team1,
  }

  const startMatch = () => {
    onSetupChange(draft)
    setScreen('started')
  }

  if (screen === 'players') {
    return (
      <main className="min-h-svh bg-white text-slate-800">
        <AppHeader title="Player Selection" onBack={() => setScreen('toss')} />
        <section className="mx-auto max-w-xl space-y-10 px-6 py-9">
          {[
            { label: 'Striker Name', key: 'strikerName', Icon: User, placeholder: 'Enter Player 1 Name' },
            { label: 'Non-Striker Name', key: 'nonStrikerName', Icon: Users, placeholder: 'Enter Player 2 Name' },
            { label: 'Bowler Name', key: 'bowlerName', Icon: Trophy, placeholder: 'Enter Bowler Name' },
          ].map((field) => (
            <label key={field.key} className="block space-y-4">
              <span className="text-xl font-black text-slate-800">{field.label}</span>
              <span className="flex h-20 items-center gap-4 rounded-2xl border border-slate-200 bg-slate-100 px-6">
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
              className="h-16 w-full max-w-sm rounded-2xl bg-yellow-300 text-3xl font-medium text-[#3954b4] shadow-md"
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
        <section className="relative min-h-[46svh] overflow-hidden bg-gradient-to-b from-sky-500 to-emerald-900 px-6 py-14 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative mx-auto max-w-md">
            <h1 className="text-5xl font-black tracking-wide">Match Started!</h1>
            <p className="mt-5 text-lg font-bold text-white/90">Share the live score link with your team.</p>
            <Trophy className="mx-auto mt-14 text-yellow-300 drop-shadow-2xl" size={112} />
          </div>
        </section>
        <section className="relative mx-5 -mt-14 rounded-[2rem] bg-white p-7 text-center shadow-2xl shadow-slate-300">
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
            <p className="text-2xl font-black text-slate-900">
              <span className="mr-3 text-red-500">●</span>Live Score!
            </p>
            <p className="mt-2 font-bold text-slate-500">Track the match in real-time.</p>
          </div>
          <p className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-amber-500">
            ⚡ Fast!! ⚡ Live! ⚡ Fun! ⚡
          </p>
          <button
            type="button"
            className="mt-7 h-16 w-full rounded-xl bg-yellow-300 text-2xl font-medium text-[#3954b4]"
          >
            <Share2 className="mr-2 inline" size={24} />
            Share Match Link
          </button>
          <button
            type="button"
            onClick={() => onStart(draft)}
            className="mt-5 h-16 w-full rounded-xl bg-blue-600 text-2xl font-medium text-white"
          >
            Start Scoring
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-slate-50 text-slate-800">
      <AppHeader title="Casual Match" step={screen === 'rules' ? 1 : 2} onBack={() => setScreen('rules')} />

      {screen === 'rules' ? (
        <section className="mx-auto max-w-xl space-y-8 px-5 pb-32 pt-0">
          <div className="-mt-0 rounded-[1.7rem] bg-white p-6 shadow-xl shadow-slate-200">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-slate-500">Teams</p>
            <div className="space-y-5">
              <input
                value={draft.team1}
                onChange={(event) => set('team1', event.target.value)}
                placeholder="Host Team"
                className="h-20 w-full rounded-2xl bg-slate-100 px-6 text-2xl font-bold outline-none placeholder:text-slate-500"
              />
              <input
                value={draft.team2}
                onChange={(event) => set('team2', event.target.value)}
                placeholder="Visitor Team"
                className="h-20 w-full rounded-2xl bg-slate-100 px-6 text-2xl font-bold outline-none placeholder:text-slate-500"
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
          <div className="rounded-[1.7rem] bg-white p-8 text-center shadow-xl shadow-slate-200">
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
          className="h-16 w-full rounded-xl bg-yellow-300 text-3xl font-medium text-[#3954b4]"
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
