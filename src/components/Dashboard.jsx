import {
  Clipboard,
  RotateCcw,
  Share2,
  Shield,
  Sparkles,
  Timer,
  Undo2,
  Users,
} from 'lucide-react'

const zones = ['Off-side', 'Leg-side', 'Straight', 'Behind']

function Stat({ label, value, tone = 'text-white' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
      <p className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className={`mt-1 text-xl font-black ${tone}`}>{value}</p>
    </div>
  )
}

function PlayerRow({ player, active }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border p-3 ${
        active
          ? 'border-emerald-300/50 bg-emerald-300/10'
          : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      <div>
        <p className="font-bold text-slate-100">
          {player.name} {active ? <span className="text-emerald-300">*</span> : null}
        </p>
        <p className="text-xs text-slate-400">R {player.runs} · B {player.balls}</p>
      </div>
      <Users className={active ? 'text-emerald-300' : 'text-slate-500'} size={19} />
    </div>
  )
}

function ScoreButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-14 rounded-2xl border border-white/10 bg-white/[0.06] px-3 text-base font-black text-slate-100 shadow-lg shadow-black/10 transition hover:border-emerald-300/50 hover:bg-emerald-300/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}

export default function Dashboard({
  match,
  innings,
  summary,
  controls,
  onScore,
  onUndo,
  onRotate,
  onShare,
  shareState,
}) {
  const striker = innings.batsmen.find((player) => player.id === innings.strikerId)
  const nonStriker = innings.batsmen.find((player) => player.id !== innings.strikerId)
  const canScore = match.status === 'live'

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Innings {match.currentInnings + 1}
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">{innings.team}</h2>
            <p className="text-sm text-slate-400">
              {match.status === 'complete' ? match.result : 'Live scoring dashboard'}
            </p>
          </div>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-300/20"
          >
            {shareState === 'copied' ? <Clipboard size={17} /> : <Share2 size={17} />}
            {shareState === 'copied' ? 'Copied' : 'Share'}
          </button>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/14 to-white/[0.04] p-5">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Current Score
          </p>
          <div className="mt-2 flex items-end gap-3">
            <p className="text-6xl font-black leading-none text-white">
              {innings.runs}/{innings.wickets}
            </p>
            <p className="pb-2 text-sm font-bold text-slate-400">({summary.overs})</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Target" value={summary.target || '-'} tone="text-amber-200" />
          <Stat label="CRR" value={summary.crr} tone="text-emerald-200" />
          <Stat label="RRR" value={summary.rrr || '-'} tone="text-lime-200" />
          <Stat label="To Win" value={summary.toWin || '-'} tone="text-white" />
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
            <Timer size={17} className="text-emerald-300" />
            Current Over
          </div>
          <div className="flex min-h-12 flex-wrap items-center gap-2">
            {innings.currentOverEvents.length ? (
              innings.currentOverEvents.map((event, index) => (
                <span
                  key={`${event.label}-${index}`}
                  className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 px-3 text-sm font-black text-slate-100"
                >
                  {event.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">No deliveries yet</span>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-200">Active Batsmen</p>
              <button
                type="button"
                onClick={onRotate}
                disabled={!canScore}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-emerald-300/50 disabled:opacity-40"
              >
                <RotateCcw size={14} />
                Rotate
              </button>
            </div>
            {striker ? <PlayerRow player={striker} active /> : null}
            {nonStriker ? <PlayerRow player={nonStriker} /> : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
              <Shield size={17} className="text-amber-300" />
              Active Bowler
            </div>
            <p className="text-lg font-black text-white">{innings.bowler.name}</p>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <Stat label="O" value={summary.bowlerOvers} />
              <Stat label="M" value={summary.maidens} />
              <Stat label="R" value={innings.bowler.runs} />
              <Stat label="W" value={innings.bowler.wickets} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-black/20">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              Scoring
            </p>
            <h2 className="text-xl font-black text-white">Ball Controls</h2>
          </div>
          <button
            type="button"
            onClick={onUndo}
            disabled={!match.history.length}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-amber-300/50 disabled:opacity-40"
          >
            <Undo2 size={17} />
            Undo
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Shot Zone
            </span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-100 outline-none focus:border-emerald-300/70"
              value={controls.zone}
              onChange={(event) => controls.setZone(event.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone}>{zone}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Declared
            </span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-100 outline-none focus:border-emerald-300/70"
              type="number"
              min="1"
              value={controls.declaredRuns}
              onChange={(event) => controls.setDeclaredRuns(event.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 6].map((run) => (
            <ScoreButton key={run} disabled={!canScore} onClick={() => onScore({ type: 'run', runs: run })}>
              {run}
            </ScoreButton>
          ))}
          {match.setup.customBoundaries.map((run) => (
            <ScoreButton
              key={run}
              disabled={!canScore}
              onClick={() => onScore({ type: 'run', runs: run })}
              className="border-amber-300/25 bg-amber-300/10 text-amber-100"
            >
              {run}
            </ScoreButton>
          ))}
          <ScoreButton
            disabled={!canScore || !match.setup.widesEnabled}
            onClick={() => onScore({ type: 'wide' })}
          >
            Wd
          </ScoreButton>
          <ScoreButton
            disabled={!canScore || !match.setup.noBallsEnabled}
            onClick={() => onScore({ type: 'noBall' })}
          >
            Nb
          </ScoreButton>
          <ScoreButton
            disabled={!canScore}
            onClick={() => onScore({ type: 'wicket' })}
            className="border-rose-300/25 bg-rose-400/10 text-rose-100"
          >
            W
          </ScoreButton>
          <ScoreButton
            disabled={!canScore || !match.setup.declaredNoStrike}
            onClick={() => onScore({ type: 'declared', runs: Number(controls.declaredRuns) || 1 })}
            className="col-span-2 border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Sparkles size={17} />
              Declared
            </span>
          </ScoreButton>
        </div>
      </div>
    </section>
  )
}
