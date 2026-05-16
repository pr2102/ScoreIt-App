import { Database, Settings, ShieldCheck, Swords, Trash2 } from 'lucide-react'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-300/70 focus:bg-white/[0.09]'

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:border-emerald-300/40"
    >
      <span>
        <span className="block text-sm font-semibold text-slate-100">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
      </span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          checked
            ? 'border-emerald-300 bg-emerald-400/80'
            : 'border-white/10 bg-slate-700'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </span>
    </button>
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
  const set = (key, value) => onSetupChange({ ...setup, [key]: value })

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-4 py-6 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-emerald-950/30">
        <div className="relative border-b border-white/10 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.24),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.16),transparent_32%)]" />
          <div className="relative">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 text-emerald-200">
              <Swords size={28} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">
              ScoreIt
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-white sm:text-6xl">
              Cricket scoring built for fast mobile match days.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Configure flexible local rules, custom boundaries, and start scoring with live analytics from ball one.
            </p>
          </div>
        </div>

        <form
          className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_0.9fr]"
          onSubmit={(event) => {
            event.preventDefault()
            onStart()
          }}
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-3 text-slate-100">
              <ShieldCheck className="text-emerald-300" size={22} />
              <h2 className="text-lg font-bold">Match Setup</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Team 1
                </span>
                <input
                  className={fieldClass}
                  value={setup.team1}
                  onChange={(event) => set('team1', event.target.value)}
                  placeholder="Falcons"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Team 2
                </span>
                <input
                  className={fieldClass}
                  value={setup.team2}
                  onChange={(event) => set('team2', event.target.value)}
                  placeholder="Titans"
                  required
                />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Overs
                </span>
                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  max="50"
                  value={setup.overs}
                  onChange={(event) => set('overs', event.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex items-center gap-3 text-slate-100">
              <Settings className="text-amber-300" size={22} />
              <h2 className="text-lg font-bold">Flexible Rules</h2>
            </div>
            <Toggle
              checked={setup.widesEnabled}
              onChange={(value) => set('widesEnabled', value)}
              label="Wide runs"
              description="Award +1 and keep the ball from counting."
            />
            <Toggle
              checked={setup.noBallsEnabled}
              onChange={(value) => set('noBallsEnabled', value)}
              label="No-ball runs"
              description="Award +1 and keep the ball from counting."
            />
            <Toggle
              checked={setup.declaredNoStrike}
              onChange={(value) => set('declaredNoStrike', value)}
              label="Declared runs without strike change"
              description="Add custom declared runs while keeping the striker."
            />
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Boundary A
                </span>
                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  value={setup.boundaryA}
                  onChange={(event) => set('boundaryA', event.target.value)}
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Boundary B
                </span>
                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  value={setup.boundaryB}
                  onChange={(event) => set('boundaryB', event.target.value)}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="lg:col-span-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-5 py-4 text-base font-black text-slate-950 shadow-xl shadow-emerald-950/40 transition hover:brightness-110 active:scale-[0.99]"
          >
            Start Match
          </button>
        </form>

        <div className="border-t border-white/10 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Database className="text-emerald-300" size={21} />
              <div>
                <h2 className="text-lg font-bold text-slate-100">Stored Matches</h2>
                <p className="text-xs text-slate-400">
                  Last {Math.min(storedMatches.length, 200)} of 200 matches saved on this device
                </p>
              </div>
            </div>
          </div>
          <div className="grid max-h-72 gap-3 overflow-y-auto pr-1">
            {storedMatches.length ? (
              storedMatches.slice(0, 8).map((match) => (
                <button
                  type="button"
                  key={match.id}
                  onClick={() => onOpenMatch(match)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-emerald-300/45 hover:bg-white/[0.07] focus-visible:border-emerald-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-100">{scoreLine(match)}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {match.status === 'complete' ? match.result : 'In progress'} - {matchDate(match)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        {match.setup.overs} ov
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-200">
                          {match.status === 'complete' ? 'View' : 'Continue'}
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`Delete ${match.setup.team1} vs ${match.setup.team2}`}
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
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-300/25 bg-rose-400/10 text-rose-100 transition hover:bg-rose-400/20"
                        >
                          <Trash2 size={15} />
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-5 text-sm text-slate-500">
                No stored matches yet. Start scoring and ScoreIt will keep a rolling archive automatically.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
