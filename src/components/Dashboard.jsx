import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

function ballsToOvers(balls) {
  return `${Math.floor(balls / 6)}.${balls % 6}`
}

function rate(runs, balls) {
  return balls ? ((runs * 6) / balls).toFixed(1) : '0.0'
}

function batterStats(player, deliveries) {
  const playerBalls = deliveries.filter((delivery) => delivery.type === 'run')
  return {
    fours: playerBalls.filter((delivery) => delivery.batRuns === 4).length,
    sixes: playerBalls.filter((delivery) => delivery.batRuns === 6).length,
    sr: player.balls ? ((player.runs * 100) / player.balls).toFixed(1) : '0.0',
  }
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`scoreit-match-tab h-11 rounded-2xl px-3 text-[0.74rem] font-black uppercase tracking-[0.06em] transition sm:h-12 sm:text-sm ${
        active ? 'scoreit-match-tab-active' : ''
      }`}
    >
      {children}
    </button>
  )
}

function Ball({ children, tone = 'green' }) {
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-medium text-white shadow-md ${
        tone === 'yellow'
          ? 'bg-gradient-to-b from-yellow-200 to-yellow-500 text-[#3954b4]'
          : tone === 'blue'
            ? 'bg-gradient-to-b from-blue-300 to-[#3954b4]'
            : tone === 'red'
              ? 'bg-gradient-to-b from-red-400 to-red-900'
              : 'bg-gradient-to-b from-green-400 to-green-800'
      } scoreit-score-orb`}
    >
      {children}
    </span>
  )
}

function ScoreCircle({ children, tone, disabled, onClick }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="scoreit-score-button disabled:opacity-40">
      <Ball tone={tone}>{children}</Ball>
    </button>
  )
}

function PlayerTable({ innings }) {
  const striker = innings.batsmen.find((player) => player.id === innings.strikerId)
  const rows = innings.batsmen.slice(0, 2)
  return (
    <div className="scoreit-live-card rounded-3xl bg-white p-5 shadow-md shadow-slate-200">
      <div className="mb-5 grid grid-cols-[1fr_52px] rounded-2xl bg-slate-100 p-4">
        <div>
          <p className="text-xl font-black">{innings.team}, 1st inning</p>
          <p className="text-2xl font-medium text-slate-600">
            {innings.runs}/{innings.wickets} ({ballsToOvers(innings.legalBalls)})
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black">CRR</p>
          <p className="text-2xl font-medium text-slate-600">{rate(innings.runs, innings.legalBalls)}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_44px_44px_44px_44px_64px] border-b border-slate-400 pb-3 text-xl font-black text-slate-600">
        <span>Batsman</span>
        <span>R</span>
        <span>B</span>
        <span>4s</span>
        <span>6s</span>
        <span>SR</span>
      </div>
      {rows.map((player) => {
        const stats = batterStats(player, innings.deliveries)
        return (
          <div
            key={player.id}
            className="grid grid-cols-[1fr_44px_44px_44px_44px_64px] py-3 text-lg text-slate-600"
          >
            <span className={player.id === striker?.id ? 'font-black text-[#3954b4]' : ''}>
              {player.name}
              {player.id === striker?.id ? '*' : ''}
            </span>
            <span>{player.runs}</span>
            <span>{player.balls}</span>
            <span>{stats.fours}</span>
            <span>{stats.sixes}</span>
            <span>{stats.sr}</span>
          </div>
        )
      })}

      <div className="mt-4 grid grid-cols-[1fr_44px_44px_44px_44px_64px] border-b border-slate-400 pb-3 text-xl font-black text-slate-600">
        <span>Bowler</span>
        <span>O</span>
        <span>M</span>
        <span>R</span>
        <span>W</span>
        <span>ECO</span>
      </div>
      <div className="grid grid-cols-[1fr_44px_44px_44px_44px_64px] py-3 text-lg text-slate-600">
        <span>{innings.bowler.name}</span>
        <span>{ballsToOvers(innings.bowler.legalBalls)}</span>
        <span>0</span>
        <span>{innings.bowler.runs}</span>
        <span>{innings.bowler.wickets}</span>
        <span>{rate(innings.bowler.runs, innings.bowler.legalBalls)}</span>
      </div>
    </div>
  )
}

function ScoreboardView({ match }) {
  const [first, second] = match.innings
  return (
    <section className="space-y-7 px-5 py-7">
      <div className="scoreit-live-card relative grid grid-cols-2 overflow-hidden bg-slate-100">
        <div className="bg-pink-100/70 p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-fuchsia-700 text-3xl font-medium text-white">
            {match.setup.team1.slice(0, 1).toUpperCase()}
          </div>
          <p className="mt-4 text-3xl font-black">{first.runs}/{first.wickets}</p>
          <p className="mt-1 text-slate-500">{ballsToOvers(first.legalBalls)} ov</p>
          <p className="mt-2 font-black uppercase tracking-widest text-slate-400">{first.team}</p>
        </div>
        <div className="bg-rose-100/70 p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-700 text-3xl font-medium text-white">
            {match.setup.team2.slice(0, 1).toUpperCase()}
          </div>
          <p className="mt-4 text-3xl font-black">{second.runs}/{second.wickets}</p>
          <p className="mt-1 text-slate-500">{ballsToOvers(second.legalBalls)} ov</p>
          <p className="mt-2 font-black uppercase tracking-widest text-slate-400">{second.team}</p>
        </div>
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white bg-yellow-300 text-xl font-black">
          vs
        </span>
      </div>
      <PlayerTable innings={first} />
      {second.legalBalls || second.runs ? <PlayerTable innings={second} /> : null}
      <div className="grid grid-cols-2 gap-4">
        <button className="h-16 rounded-xl bg-yellow-300 text-lg font-medium text-[#3954b4]">
          Download Scorecard
        </button>
        <button className="h-16 rounded-xl bg-yellow-300 text-lg font-medium text-[#3954b4]">
          View Analytics
        </button>
      </div>
    </section>
  )
}

function NamePrompt({ innings, onSaveBatterName, onSaveBowlerName }) {
  const pendingBatter = innings.pendingBatterId
    ? innings.batsmen.find((player) => player.id === innings.pendingBatterId)
    : null
  const isBowlerPrompt = !pendingBatter && innings.pendingBowler
  const fallbackName = pendingBatter?.name || `Bowler ${Math.floor(innings.legalBalls / 6) + 1}`
  const [name, setName] = useState(fallbackName)

  if (!pendingBatter && !isBowlerPrompt) return null

  const title = pendingBatter ? 'New batsman name' : 'New bowler name'
  const description = pendingBatter
    ? 'A wicket has fallen. Enter the next batsman before scoring continues.'
    : 'Over completed. Enter the bowler for the next over.'

  const save = () => {
    if (pendingBatter) {
      onSaveBatterName(name)
    } else {
      onSaveBowlerName(name)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <section className="scoreit-live-card w-full rounded-[1.5rem] bg-white p-5 shadow-2xl sm:max-w-md">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
          Required
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{description}</p>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') save()
          }}
          className="mt-5 h-14 w-full rounded-2xl border border-white/10 bg-slate-100 px-4 text-lg font-black text-slate-900 outline-none"
          placeholder={pendingBatter ? 'Enter batsman name' : 'Enter bowler name'}
        />
        <button
          type="button"
          onClick={save}
          className="mt-4 h-14 w-full rounded-2xl bg-emerald-300 text-base font-black text-slate-950"
        >
          Save Name
        </button>
      </section>
    </div>
  )
}

function OversView({ match }) {
  return (
    <section className="px-5 py-8">
      {match.innings.map((innings, inningsIndex) => {
        const overRows = new Map()
        innings.deliveries.forEach((delivery) => {
          const row = overRows.get(delivery.overIndex) || []
          row.push(delivery)
          overRows.set(delivery.overIndex, row)
        })
        return (
          <div key={innings.team} className="scoreit-live-card mb-7 overflow-hidden rounded-2xl bg-slate-50 shadow">
            <h2 className="bg-[#3954b4] px-5 py-4 text-2xl font-medium text-white">
              {inningsIndex + 1}{inningsIndex === 0 ? 'st' : 'nd'} Inning
            </h2>
            {[...overRows.entries()].map(([over, deliveries]) => (
              <div key={over} className="border-b border-slate-200 p-5">
                <p className="text-xl text-slate-500">Over {over + 1}</p>
                <div className="mt-4 flex items-center gap-3">
                  <p className="mr-2 text-2xl font-medium text-slate-600">
                    {deliveries.reduce((sum, delivery) => sum + delivery.runs, 0)} Runs
                  </p>
                  {deliveries.map((delivery, index) => (
                    <Ball key={`${delivery.label}-${index}`}>{delivery.label}</Ball>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </section>
  )
}

export default function Dashboard({
  match,
  innings,
  summary,
  onScore,
  onUndo,
  onRotate,
  onSaveBatterName,
  onSaveBowlerName,
  onNewMatch,
}) {
  const [tab, setTab] = useState('Live Score')
  const hasPendingName = Boolean(innings.pendingBatterId || innings.pendingBowler)
  const promptKey = innings.pendingBatterId
    ? `batter-${innings.pendingBatterId}`
    : innings.pendingBowler
      ? `bowler-${innings.legalBalls}`
      : 'none'
  const canScore = match.status === 'live' && !hasPendingName
  const thisOver = innings.currentOverEvents

  return (
    <main className="min-h-svh bg-white text-slate-800">
      <header className="scoreit-match-header px-4 pb-6 pt-10 text-white sm:px-6 sm:pt-12">
        <div className="mb-6 flex items-center gap-3 pr-14">
          <button
            onClick={onNewMatch}
            className="scoreit-match-back flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
            type="button"
            aria-label="Back to matches"
          >
            <ChevronLeft size={25} />
          </button>
          <div className="min-w-0">
            <p className="scoreit-live-badge text-[0.62rem] font-black uppercase tracking-[0.24em] text-emerald-100">
              Match Center
            </p>
            <h1 className="mt-1 max-w-[16rem] text-xl font-black leading-[1.08] tracking-[-0.02em] sm:max-w-none sm:text-3xl">
              {match.setup.team1} <span className="text-amber-200">v/s</span> {match.setup.team2}
            </h1>
          </div>
        </div>
        <div className="scoreit-match-tabs grid grid-cols-3 gap-2 rounded-[1.35rem] p-1.5">
          {['Live Score', 'Scoreboard', 'Overs'].map((item) => (
            <TabButton key={item} active={tab === item} onClick={() => setTab(item)}>
              {item}
            </TabButton>
          ))}
        </div>
      </header>

      {tab === 'Scoreboard' ? <ScoreboardView match={match} /> : null}
      {tab === 'Overs' ? <OversView match={match} /> : null}

      {tab === 'Live Score' ? (
        <section className="space-y-6 px-5 py-5">
          <PlayerTable innings={innings} />

          <div className="scoreit-live-card flex items-center gap-4 rounded-3xl bg-slate-100 p-5">
            <span className="text-xl text-slate-600">This over</span>
            <div className="flex flex-wrap gap-3">
              {thisOver.length ? (
                thisOver.map((event, index) => <Ball key={`${event.label}-${index}`}>{event.label}</Ball>)
              ) : (
                <span className="text-slate-400">No balls yet</span>
              )}
            </div>
          </div>

          <div className="scoreit-live-card rounded-3xl bg-slate-100 p-5">
            <div className="grid grid-cols-5 gap-5">
              {[0, 1, 2].map((run) => (
                <ScoreCircle key={run} disabled={!canScore} onClick={() => onScore({ type: 'run', runs: run })}>
                  {run}
                </ScoreCircle>
              ))}
              <ScoreCircle disabled={!canScore} onClick={() => onScore({ type: 'run', runs: 5 })}>
                More
              </ScoreCircle>
              <ScoreCircle tone="yellow" disabled={!match.history.length} onClick={onUndo}>
                UNDO
              </ScoreCircle>
              {[3, 4, 6].map((run) => (
                <ScoreCircle key={run} disabled={!canScore} onClick={() => onScore({ type: 'run', runs: run })}>
                  {run}
                </ScoreCircle>
              ))}
              <ScoreCircle disabled={!canScore} onClick={() => onScore({ type: 'run', runs: 7 })}>
                5,7 OTH
              </ScoreCircle>
              <ScoreCircle tone="yellow" disabled={!canScore} onClick={onRotate}>
                SWAP
              </ScoreCircle>
              <ScoreCircle tone="blue" disabled={!canScore || !match.setup.widesEnabled} onClick={() => onScore({ type: 'wide' })}>
                WD
              </ScoreCircle>
              <ScoreCircle tone="blue" disabled={!canScore || !match.setup.noBallsEnabled} onClick={() => onScore({ type: 'noBall' })}>
                NB
              </ScoreCircle>
              <ScoreCircle tone="blue" disabled={!canScore} onClick={() => onScore({ type: 'declared', runs: 1 })}>
                LB
              </ScoreCircle>
              <ScoreCircle tone="blue" disabled={!canScore} onClick={() => onScore({ type: 'declared', runs: 1 })}>
                BYE
              </ScoreCircle>
              <ScoreCircle tone="red" disabled={!canScore} onClick={() => onScore({ type: 'wicket' })}>
                OUT
              </ScoreCircle>
            </div>
          </div>

          <p className="text-center text-sm font-medium text-slate-400">
            Overs {summary.overs} | CRR {summary.crr}
          </p>
        </section>
      ) : null}
      <NamePrompt
        key={promptKey}
        innings={innings}
        onSaveBatterName={onSaveBatterName}
        onSaveBowlerName={onSaveBowlerName}
      />
    </main>
  )
}
