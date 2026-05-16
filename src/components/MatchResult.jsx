import { Crown, Home, Share2, Sparkles, Trophy } from 'lucide-react'
import Analytics from './Analytics'

const ballsToOvers = (balls) => `${Math.floor(balls / 6)}.${balls % 6}`
const runRate = (runs, balls) => (balls ? ((runs * 6) / balls).toFixed(2) : '0.00')

function InningsCard({ innings, label, highlight }) {
  return (
    <div
      className={`rounded-[1.5rem] border p-4 ${
        highlight
          ? 'border-emerald-300/40 bg-emerald-300/10'
          : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-white">{innings.team}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {ballsToOvers(innings.legalBalls)} overs · RR {runRate(innings.runs, innings.legalBalls)}
          </p>
        </div>
        <p className="text-4xl font-black text-white">
          {innings.runs}/{innings.wickets}
        </p>
      </div>
    </div>
  )
}

function TopPerformer({ title, value, helper }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-black text-slate-100">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </div>
  )
}

function bestBatter(innings) {
  return [...innings.batsmen].sort((a, b) => b.runs - a.runs || b.balls - a.balls)[0]
}

export default function MatchResult({ match, analytics, onNewMatch, onShare, shareState }) {
  const [first, second] = match.innings
  const winner =
    second.runs > first.runs
      ? second.team
      : first.runs > second.runs
        ? first.team
        : 'Both teams'
  const tied = first.runs === second.runs
  const firstBest = bestBatter(first)
  const secondBest = bestBatter(second)

  return (
    <main className="min-h-svh bg-slate-950 px-3 py-4 text-slate-100 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-emerald-950/30 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_85%_5%,rgba(245,158,11,0.18),transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-amber-200/30 bg-amber-300/15 text-amber-200">
                {tied ? <Sparkles size={32} /> : <Crown size={34} />}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">
                Match Complete
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
                {tied ? 'What a finish. Match tied.' : `Congratulations, ${winner}!`}
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-bold text-amber-100">{match.result}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onShare}
                className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-300/20"
              >
                <Share2 size={17} />
                {shareState === 'copied' ? 'Copied' : 'Share Result'}
              </button>
              <button
                type="button"
                onClick={onNewMatch}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:brightness-110"
              >
                <Home size={17} />
                New Match
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InningsCard
            innings={first}
            label="First Innings"
            highlight={!tied && first.runs > second.runs}
          />
          <InningsCard
            innings={second}
            label="Second Innings"
            highlight={!tied && second.runs > first.runs}
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <TopPerformer
            title="Top Bat"
            value={`${firstBest?.name || '-'} · ${firstBest?.runs || 0}`}
            helper={`${first.team}, ${firstBest?.balls || 0} balls`}
          />
          <TopPerformer
            title="Chase Leader"
            value={`${secondBest?.name || '-'} · ${secondBest?.runs || 0}`}
            helper={`${second.team}, ${secondBest?.balls || 0} balls`}
          />
          <TopPerformer
            title="Final Highlight"
            value={match.result}
            helper="Saved in your last 200 matches"
          />
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="text-emerald-300" size={20} />
            <h2 className="text-xl font-black text-white">Final Match Analytics</h2>
          </div>
          <Analytics analytics={analytics} />
        </section>
      </div>
    </main>
  )
}
