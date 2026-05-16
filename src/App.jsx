import { Component, useEffect, useMemo, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import Dashboard from './components/Dashboard'
import MatchSetup from './components/MatchSetup'
import MatchResult from './components/MatchResult'

const MATCH_STORE_KEY = 'scoreit:last-200-matches'
const MAX_STORED_MATCHES = 200

const initialSetup = {
  team1: 'Emerald Strikers',
  team2: 'Golden Royals',
  overs: '20',
  playersPerSide: '11',
  matchType: 'Limited Overs',
  pitchType: 'Ground Cricket',
  widesEnabled: true,
  noBallsEnabled: true,
  wideRuns: '1',
  noBallRuns: '1',
  declaredNoStrike: true,
  boundaryA: '12',
  boundaryB: '24',
  tossWinner: '',
  electedTo: 'Bat',
  strikerName: 'Batsman 1',
  nonStrikerName: 'Batsman 2',
  bowlerName: 'Bowler 1',
}

class ScoreItErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-svh items-center justify-center bg-slate-950 px-4 text-slate-100">
          <section className="max-w-md rounded-[1.5rem] border border-rose-300/20 bg-white/[0.05] p-6 text-center">
            <h1 className="text-2xl font-black text-white">ScoreIt needs a quick refresh</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The match data is saved on this device. Refresh the app and open the saved match to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-black text-slate-950"
            >
              Refresh ScoreIt
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

const clone = (value) => JSON.parse(JSON.stringify(value))
const ballsToOvers = (balls) => `${Math.floor(balls / 6)}.${balls % 6}`
const rate = (runs, balls) => (balls ? ((runs * 6) / balls).toFixed(2) : '0.00')
const createId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `match-${Date.now()}-${Math.random().toString(16).slice(2)}`

function createInnings(team, maxOvers, names = {}) {
  return {
    team,
    runs: 0,
    wickets: 0,
    legalBalls: 0,
    maxBalls: maxOvers * 6,
    currentOverEvents: [],
    deliveries: [],
    wagonShots: [],
    ballProgress: [],
    batsmen: [
      { id: 1, name: names.strikerName || 'Batsman 1', runs: 0, balls: 0 },
      { id: 2, name: names.nonStrikerName || 'Batsman 2', runs: 0, balls: 0 },
    ],
    nextBatsman: 3,
    strikerId: 1,
    bowler: { name: names.bowlerName || 'Bowler 1', legalBalls: 0, runs: 0, wickets: 0 },
  }
}

function sanitizeInnings(innings, team, maxOvers) {
  const base = createInnings(team, maxOvers)
  const merged = { ...base, ...(innings || {}) }

  return {
    ...merged,
    team: merged.team || team,
    runs: Number(merged.runs) || 0,
    wickets: Math.min(10, Math.max(0, Number(merged.wickets) || 0)),
    legalBalls: Math.max(0, Number(merged.legalBalls) || 0),
    maxBalls: Math.max(6, Number(merged.maxBalls) || maxOvers * 6),
    currentOverEvents: Array.isArray(merged.currentOverEvents) ? merged.currentOverEvents : [],
    deliveries: Array.isArray(merged.deliveries) ? merged.deliveries : [],
    wagonShots: Array.isArray(merged.wagonShots) ? merged.wagonShots : [],
    ballProgress: Array.isArray(merged.ballProgress) ? merged.ballProgress : [],
    batsmen: Array.isArray(merged.batsmen) && merged.batsmen.length >= 2 ? merged.batsmen : base.batsmen,
    nextBatsman: Math.max(3, Number(merged.nextBatsman) || 3),
    strikerId: merged.strikerId || base.strikerId,
    bowler: { ...base.bowler, ...(merged.bowler || {}) },
  }
}

function normalizeSetup(setup) {
  const safeSetup = { ...initialSetup, ...(setup || {}) }
  const customBoundaries = [safeSetup.boundaryA, safeSetup.boundaryB]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0 && ![0, 1, 2, 3, 4, 6].includes(value))

  return {
    ...safeSetup,
    team1: String(safeSetup.team1 || 'Team 1').trim() || 'Team 1',
    team2: String(safeSetup.team2 || 'Team 2').trim() || 'Team 2',
    overs: Math.max(1, Number(safeSetup.overs) || 1),
    playersPerSide: Math.max(2, Number(safeSetup.playersPerSide) || 11),
    wideRuns: Math.max(0, Number(safeSetup.wideRuns) || 0),
    noBallRuns: Math.max(0, Number(safeSetup.noBallRuns) || 0),
    customBoundaries: [...new Set(customBoundaries)],
  }
}

function startMatch(setup) {
  const rules = normalizeSetup(setup)
  const now = new Date().toISOString()
  const tossWinner = rules.tossWinner === rules.team2 ? rules.team2 : rules.team1
  const otherTeam = tossWinner === rules.team1 ? rules.team2 : rules.team1
  const battingFirst = rules.electedTo === 'Bowl' ? otherTeam : tossWinner
  const battingSecond = battingFirst === rules.team1 ? rules.team2 : rules.team1

  return {
    id: createId(),
    createdAt: now,
    updatedAt: now,
    setup: rules,
    innings: [
      createInnings(battingFirst, rules.overs, rules),
      createInnings(battingSecond, rules.overs),
    ],
    currentInnings: 0,
    target: null,
    status: 'live',
    result: '',
    history: [],
  }
}

function loadStoredMatches() {
  try {
    const matches = JSON.parse(localStorage.getItem(MATCH_STORE_KEY) || '[]')
    return Array.isArray(matches)
      ? matches.map((match) => sanitizeStoredMatch(match)).filter(Boolean)
      : []
  } catch {
    return []
  }
}

function saveStoredMatches(matches) {
  try {
    localStorage.setItem(MATCH_STORE_KEY, JSON.stringify(matches.slice(0, MAX_STORED_MATCHES)))
  } catch {
    // Storage can be unavailable or full in some Android WebView/private modes.
  }
}

function compactMatch(match) {
  return {
    ...match,
    updatedAt: new Date().toISOString(),
    history: [],
  }
}

function undoSnapshot(match) {
  return {
    ...clone(match),
    history: [],
  }
}

function upsertStoredMatch(matches, match) {
  const compact = compactMatch(match)
  return [compact, ...matches.filter((item) => item.id !== compact.id)].slice(0, MAX_STORED_MATCHES)
}

function sanitizeStoredMatch(match) {
  if (!match || typeof match !== 'object') return null

  const restored = clone(match)
  const overs = Math.max(1, Number(restored.setup?.overs) || 1)
  const teams = [restored.setup?.team1 || 'Team 1', restored.setup?.team2 || 'Team 2']

  restored.id = restored.id || createId()
  restored.createdAt = restored.createdAt || new Date().toISOString()
  restored.updatedAt = restored.updatedAt || restored.createdAt
  restored.setup = normalizeSetup({
    ...initialSetup,
    ...restored.setup,
    team1: teams[0],
    team2: teams[1],
    overs,
  })
  restored.innings = [0, 1].map((index) => sanitizeInnings(restored.innings?.[index], teams[index], overs))
  restored.currentInnings = Math.min(Number(restored.currentInnings) || 0, 1)
  restored.target = restored.target ?? null
  restored.status = restored.status === 'complete' ? 'complete' : 'live'
  restored.result = restored.result || ''
  restored.history = []

  return restored
}

function hydrateStoredMatch(match) {
  return sanitizeStoredMatch(match) || startMatch(initialSetup)
}

function rotateStrike(innings) {
  innings.strikerId = innings.batsmen.find((player) => player.id !== innings.strikerId)?.id ?? innings.strikerId
}

function replaceOutBatter(innings) {
  const index = innings.batsmen.findIndex((player) => player.id === innings.strikerId)
  if (index >= 0 && innings.wickets < 10) {
    innings.batsmen[index] = {
      id: innings.nextBatsman,
      name: `Batsman ${innings.nextBatsman}`,
      runs: 0,
      balls: 0,
    }
    innings.strikerId = innings.nextBatsman
    innings.nextBatsman += 1
  }
}

function completedMaidens(innings) {
  const overTotals = new Map()
  innings.deliveries.forEach((delivery) => {
    const current = overTotals.get(delivery.overIndex) || { runs: 0, legal: 0 }
    current.runs += delivery.bowlerRuns
    current.legal += delivery.legal ? 1 : 0
    overTotals.set(delivery.overIndex, current)
  })

  return [...overTotals.values()].filter((over) => over.legal === 6 && over.runs === 0).length
}

function finishIfNeeded(match) {
  const innings = match.innings[match.currentInnings]
  const inningsOver =
    innings.legalBalls >= innings.maxBalls ||
    innings.wickets >= 10 ||
    (match.currentInnings === 1 && innings.runs >= match.target)

  if (!inningsOver) return

  if (match.currentInnings === 0) {
    match.target = innings.runs + 1
    match.currentInnings = 1
    return
  }

  const first = match.innings[0]
  const second = match.innings[1]
  match.status = 'complete'

  if (second.runs >= match.target) {
    match.result = `${second.team} won by ${10 - second.wickets} wicket${10 - second.wickets === 1 ? '' : 's'}`
  } else if (second.runs === first.runs) {
    match.result = 'Match tied'
  } else {
    match.result = `${first.team} won by ${first.runs - second.runs} run${first.runs - second.runs === 1 ? '' : 's'}`
  }
}

function applyDelivery(match, action, zone) {
  if (!match?.innings?.[match.currentInnings]) return match

  const next = clone(match)
  if (next.status !== 'live') return next

  next.history = [undoSnapshot(match)]
  const innings = next.innings[next.currentInnings]
  const striker = innings.batsmen.find((player) => player.id === innings.strikerId)
  const legalBefore = innings.legalBalls
  const overIndex = Math.floor(legalBefore / 6)
  const delivery = {
    type: action.type,
    runs: 0,
    batRuns: 0,
    extraRuns: 0,
    bowlerRuns: 0,
    legal: true,
    label: '',
    overIndex,
    zone,
  }

  if (action.type === 'wide') {
    delivery.runs = Number(next.setup.wideRuns) || 0
    delivery.extraRuns = delivery.runs
    delivery.bowlerRuns = delivery.runs
    delivery.legal = false
    delivery.label = 'Wd'
  } else if (action.type === 'noBall') {
    delivery.runs = Number(next.setup.noBallRuns) || 0
    delivery.extraRuns = delivery.runs
    delivery.bowlerRuns = delivery.runs
    delivery.legal = false
    delivery.label = 'Nb'
  } else if (action.type === 'wicket') {
    delivery.legal = true
    delivery.label = 'W'
    innings.wickets += 1
    innings.bowler.wickets += 1
    if (striker) striker.balls += 1
  } else {
    const runs = Math.max(0, Number(action.runs) || 0)
    delivery.runs = runs
    delivery.bowlerRuns = runs
    delivery.legal = true
    delivery.label = action.type === 'declared' ? `D${runs}` : String(runs)
    if (action.type === 'run' && striker) {
      delivery.batRuns = runs
      striker.runs += runs
      striker.balls += 1
      if (runs > 0) innings.wagonShots.push({ runs, zone })
    }
  }

  innings.runs += delivery.runs
  innings.bowler.runs += delivery.bowlerRuns
  innings.deliveries.push(delivery)
  innings.currentOverEvents.push({ label: delivery.label, type: delivery.type })

  if (delivery.legal) {
    innings.legalBalls += 1
    innings.bowler.legalBalls += 1
    innings.ballProgress.push({ ball: innings.legalBalls, runs: innings.runs })

    if (action.type === 'wicket') {
      replaceOutBatter(innings)
    } else if (action.type === 'run' && delivery.runs % 2 === 1) {
      rotateStrike(innings)
    }

    if (innings.legalBalls % 6 === 0) {
      innings.currentOverEvents = []
      rotateStrike(innings)
    }
  }

  finishIfNeeded(next)
  return next
}

function buildAnalytics(match) {
  if (!match?.innings?.[match.currentInnings]) {
    return {
      runsPerOver: [{ over: 'O1', runs: 0 }],
      runRatePerOver: [{ over: 'O1', rate: 0 }],
      worm: [{ ball: 1, team1: null, team2: null }],
      distribution: [],
      wagonShots: [],
      team1: 'Team 1',
      team2: 'Team 2',
    }
  }

  const current = match.innings[match.currentInnings]
  const overMap = new Map()
  current.deliveries.forEach((delivery) => {
    const row = overMap.get(delivery.overIndex) || { over: `O${delivery.overIndex + 1}`, runs: 0, legal: 0 }
    row.runs += delivery.runs
    row.legal += delivery.legal ? 1 : 0
    overMap.set(delivery.overIndex, row)
  })

  const runsPerOver = [...overMap.values()]
  const runRatePerOver = runsPerOver.map((row, index) => {
    const runs = runsPerOver.slice(0, index + 1).reduce((sum, over) => sum + over.runs, 0)
    const balls = runsPerOver.slice(0, index + 1).reduce((sum, over) => sum + over.legal, 0)
    return { over: row.over, rate: Number(rate(runs, balls)) }
  })

  const maxBalls = Math.max(match.innings[0].ballProgress.length, match.innings[1].ballProgress.length, 1)
  const worm = Array.from({ length: maxBalls }, (_, index) => ({
    ball: index + 1,
    team1: match.innings[0].ballProgress[index]?.runs ?? null,
    team2: match.innings[1].ballProgress[index]?.runs ?? null,
  }))

  const singlesDoubles = current.deliveries
    .filter((delivery) => delivery.type === 'run' && delivery.batRuns > 0 && delivery.batRuns < 4)
    .reduce((sum, delivery) => sum + delivery.batRuns, 0)
  const boundaries = current.deliveries
    .filter((delivery) => delivery.type === 'run' && delivery.batRuns >= 4)
    .reduce((sum, delivery) => sum + delivery.batRuns, 0)
  const extras = current.deliveries.reduce((sum, delivery) => sum + delivery.extraRuns, 0)
  const declared = current.deliveries
    .filter((delivery) => delivery.type === 'declared')
    .reduce((sum, delivery) => sum + delivery.runs, 0)

  return {
    runsPerOver: runsPerOver.length ? runsPerOver : [{ over: 'O1', runs: 0 }],
    runRatePerOver: runRatePerOver.length ? runRatePerOver : [{ over: 'O1', rate: 0 }],
    worm,
    distribution: [
      { name: 'Singles/Doubles', value: singlesDoubles },
      { name: 'Boundaries', value: boundaries },
      { name: 'Extras', value: extras },
      { name: 'Declared', value: declared },
    ].filter((item) => item.value > 0),
    wagonShots: current.wagonShots,
    team1: match.innings[0].team,
    team2: match.innings[1].team,
  }
}

function buildSummary(match) {
  if (!match?.innings?.[match.currentInnings]) {
    return {
      overs: '0.0',
      crr: '0.00',
      rrr: null,
      target: null,
      toWin: null,
      bowlerOvers: '0.0',
      maidens: 0,
    }
  }

  const innings = match.innings[match.currentInnings]
  const ballsLeft = innings.maxBalls - innings.legalBalls
  const target = match.currentInnings === 1 ? match.target : null
  const toWin = target ? Math.max(0, target - innings.runs) : null

  return {
    overs: ballsToOvers(innings.legalBalls),
    crr: rate(innings.runs, innings.legalBalls),
    rrr: target && ballsLeft > 0 && toWin > 0 ? ((toWin * 6) / ballsLeft).toFixed(2) : null,
    target,
    toWin,
    bowlerOvers: ballsToOvers(innings.bowler.legalBalls),
    maidens: completedMaidens(innings),
  }
}

function shareText(match, summary) {
  if (!match?.innings?.[match.currentInnings]) return 'ScoreIt Match Update'

  const innings = match.innings[match.currentInnings]
  const striker = innings.batsmen.find((player) => player.id === innings.strikerId)
  const nonStriker = innings.batsmen.find((player) => player.id !== innings.strikerId)

  return [
    `ScoreIt Match Update`,
    `${match.setup.team1} vs ${match.setup.team2}`,
    `${innings.team}: ${innings.runs}/${innings.wickets} in ${summary.overs} overs`,
    summary.target ? `Target: ${summary.target} | Need: ${summary.toWin} | RRR: ${summary.rrr || '-'}` : `CRR: ${summary.crr}`,
    `Batting: ${striker?.name || '-'}* ${striker?.runs || 0}(${striker?.balls || 0}), ${nonStriker?.name || '-'} ${nonStriker?.runs || 0}(${nonStriker?.balls || 0})`,
    `Bowler: ${innings.bowler.name} ${summary.bowlerOvers}-${summary.maidens}-${innings.bowler.runs}-${innings.bowler.wickets}`,
    match.status === 'complete' ? `Result: ${match.result}` : `Current over: ${innings.currentOverEvents.map((event) => event.label).join(' ') || '-'}`,
  ].join('\n')
}

export default function App() {
  return (
    <ScoreItErrorBoundary>
      <ScoreItApp />
    </ScoreItErrorBoundary>
  )
}

function ScoreItApp() {
  const [setup, setSetup] = useState(initialSetup)
  const [match, setMatch] = useState(null)
  const [storedMatches, setStoredMatches] = useState(loadStoredMatches)
  const [zone, setZone] = useState('Off-side')
  const [declaredRuns, setDeclaredRuns] = useState('5')
  const [shareState, setShareState] = useState('idle')
  const [theme, setTheme] = useState(() => localStorage.getItem('scoreit-theme') || 'dark')

  const innings = match?.innings[match.currentInnings]
  const summary = useMemo(() => (match ? buildSummary(match) : null), [match])
  const analytics = useMemo(() => (match ? buildAnalytics(match) : null), [match])

  useEffect(() => {
    if (!match) return

    const saveTimer = window.setTimeout(() => {
      saveStoredMatches(upsertStoredMatch(loadStoredMatches(), match))
    }, 250)

    return () => window.clearTimeout(saveTimer)
  }, [match])

  useEffect(() => {
    localStorage.setItem('scoreit-theme', theme)
  }, [theme])

  useScoreItInteractions()

  const start = (nextSetup = setup) => {
    setSetup(nextSetup)
    setMatch(startMatch(nextSetup))
  }

  const returnToSetup = () => {
    setStoredMatches(loadStoredMatches())
    setMatch(null)
  }

  const openStoredMatch = (storedMatch) => {
    setMatch(hydrateStoredMatch(storedMatch))
  }

  const deleteStoredMatch = (matchId) => {
    setStoredMatches((current) => {
      const next = current.filter((item) => item.id !== matchId)
      saveStoredMatches(next)
      return next
    })
  }

  const score = (action) =>
    setMatch((current) => {
      try {
        return applyDelivery(current, action, zone)
      } catch {
        return current
      }
    })

  const undo = () => {
    setMatch((current) => {
      if (!current?.history.length) return current
      return current.history[0]
    })
  }

  const manualRotate = () => {
    setMatch((current) => {
      if (!current?.innings?.[current.currentInnings]) return current
      const next = clone(current)
      next.history = [undoSnapshot(current)]
      rotateStrike(next.innings[next.currentInnings])
      return next
    })
  }

  const share = async () => {
    const text = shareText(match, summary)
    try {
      await navigator.clipboard.writeText(text)
      setShareState('copied')
      window.setTimeout(() => setShareState('idle'), 1500)
    } catch {
      setShareState('failed')
      window.prompt('Copy match summary', text)
    }
  }

  let content

  if (!match) {
    content = (
      <MatchSetup
        setup={setup}
        onSetupChange={setSetup}
        onStart={start}
        storedMatches={storedMatches}
        onOpenMatch={openStoredMatch}
        onDeleteMatch={deleteStoredMatch}
      />
    )
  } else if (match.status === 'complete') {
    content = (
      <MatchResult
        match={match}
        analytics={analytics}
        onNewMatch={returnToSetup}
        onShare={share}
        shareState={shareState}
      />
    )
  } else {
    content = (
      <Dashboard
        match={match}
        innings={innings}
        summary={summary}
        controls={{ zone, setZone, declaredRuns, setDeclaredRuns }}
        onScore={score}
        onUndo={undo}
        onRotate={manualRotate}
        onShare={share}
        onNewMatch={returnToSetup}
        shareState={shareState}
      />
    )
  }

  return (
    <div className="scoreit-theme" data-theme={theme}>
      <button
        type="button"
        onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        className="scoreit-theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      {content}
    </div>
  )
}

function useScoreItInteractions() {
  useEffect(() => {
    let audioContext = null
    let lastSoundAt = 0

    const getAudioContext = () => {
      if (typeof window === 'undefined') return null

      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return null

      if (!audioContext || audioContext.state === 'closed') {
        audioContext = new AudioContext()
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {})
      }

      return audioContext
    }

    const playTapSound = (button) => {
      const now = performance.now()
      if (now - lastSoundAt < 28) return
      lastSoundAt = now

      const context = getAudioContext()
      if (!context) return

      const text = button.textContent?.trim().toLowerCase() || ''
      const isDanger = text.includes('wicket') || text.includes('delete') || text.includes('out')
      const isScore = /^[0-9]+$/.test(text) || ['wd', 'nb', 'undo'].includes(text)
      const sound = isDanger
        ? { start: 190, end: 90, peak: 0.07, duration: 0.075, type: 'square' }
        : isScore
          ? { start: 620, end: 860, peak: 0.055, duration: 0.05, type: 'triangle' }
          : { start: 430, end: 610, peak: 0.045, duration: 0.045, type: 'sine' }

      try {
        const startTime = context.currentTime + 0.004
        const oscillator = context.createOscillator()
        const gain = context.createGain()

        oscillator.type = sound.type
        oscillator.frequency.setValueAtTime(sound.start, startTime)
        oscillator.frequency.exponentialRampToValueAtTime(sound.end, startTime + sound.duration)
        gain.gain.setValueAtTime(0.0001, startTime)
        gain.gain.exponentialRampToValueAtTime(sound.peak, startTime + 0.008)
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + sound.duration)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start(startTime)
        oscillator.stop(startTime + sound.duration + 0.015)
      } catch {
        // Tap sounds are decorative; interaction should never depend on audio.
      }
    }

    const decorateTap = (button, event) => {
      const rect = button.getBoundingClientRect()
      const x = event.clientX ? `${event.clientX - rect.left}px` : '50%'
      const y = event.clientY ? `${event.clientY - rect.top}px` : '50%'

      button.style.setProperty('--tap-x', x)
      button.style.setProperty('--tap-y', y)
      button.classList.remove('scoreit-tap-burst')
      // Force restart of the burst animation for rapid repeated taps.
      void button.offsetWidth
      button.classList.add('scoreit-tap-burst')
      window.setTimeout(() => button.classList.remove('scoreit-tap-burst'), 420)
    }

    const onPointerDown = (event) => {
      const button = event.target.closest('button, [role="button"]')
      if (!button || !button.closest('.scoreit-theme')) return
      if (button.closest('.scoreit-ludo-page')) return
      if (button.disabled || button.getAttribute('aria-disabled') === 'true') return

      decorateTap(button, event)
      playTapSound(button)

      if (navigator.vibrate && button.tagName === 'BUTTON') {
        navigator.vibrate(8)
      }
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      if (audioContext?.state !== 'closed') {
        audioContext?.close().catch(() => {})
      }
    }
  }, [])
}
