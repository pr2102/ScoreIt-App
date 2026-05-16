import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, Goal, PieChart as PieIcon, RadioTower } from 'lucide-react'

const chartText = '#94a3b8'
const grid = 'rgba(148, 163, 184, 0.14)'
const colors = ['#34d399', '#fbbf24', '#38bdf8', '#fb7185']

function ChartCard({ title, icon, children }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-emerald-300">{icon}</span>
        <h3 className="text-base font-black text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function tooltipStyle() {
  return {
    background: '#020617',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    color: '#f8fafc',
  }
}

function WagonWheel({ shots }) {
  const zoneMap = {
    'Off-side': { x: 82, y: 40 },
    'Leg-side': { x: 18, y: 58 },
    Straight: { x: 50, y: 10 },
    Behind: { x: 50, y: 88 },
  }

  return (
    <div className="relative mx-auto aspect-square max-h-80 w-full max-w-80 overflow-hidden rounded-full border border-emerald-300/30 bg-[radial-gradient(circle,#166534_0%,#14532d_38%,#052e16_70%)] shadow-inner shadow-black">
      <div className="absolute inset-[11%] rounded-full border border-lime-200/30" />
      <div className="absolute left-1/2 top-1/2 h-[44%] w-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/50 bg-amber-100/10" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {shots.map((shot, index) => {
          const point = zoneMap[shot.zone] || zoneMap.Straight
          const width = Math.min(6, Math.max(1.6, shot.runs / 2))
          return (
            <line
              key={`${shot.zone}-${index}`}
              x1="50"
              y1="50"
              x2={point.x}
              y2={point.y}
              stroke={shot.runs >= 4 ? '#fbbf24' : '#6ee7b7'}
              strokeWidth={width}
              strokeLinecap="round"
              opacity="0.76"
            />
          )
        })}
      </svg>
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </div>
  )
}

export default function Analytics({ analytics }) {
  const distribution = analytics.distribution.length
    ? analytics.distribution
    : [{ name: 'No runs yet', value: 1 }]

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Runs Per Over" icon={<Activity size={19} />}>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={analytics.runsPerOver}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="over" stroke={chartText} tickLine={false} axisLine={false} />
              <YAxis stroke={chartText} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle()} />
              <Bar
                dataKey="runs"
                radius={[8, 8, 0, 0]}
                fill="#34d399"
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Run Rate Per Over" icon={<RadioTower size={19} />}>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={analytics.runRatePerOver}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="over" stroke={chartText} tickLine={false} axisLine={false} />
              <YAxis stroke={chartText} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle()} />
              <Line type="monotone" dataKey="rate" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Wagon Wheel Simulation" icon={<Goal size={19} />}>
        <WagonWheel shots={analytics.wagonShots} />
      </ChartCard>

      <ChartCard title="Worm Chart" icon={<Activity size={19} />}>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={analytics.worm}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="ball" stroke={chartText} tickLine={false} axisLine={false} />
              <YAxis stroke={chartText} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle()} />
              <Legend />
              <Line type="monotone" dataKey="team1" name={analytics.team1} stroke="#34d399" strokeWidth={3} dot={false} connectNulls />
              <Line type="monotone" dataKey="team2" name={analytics.team2} stroke="#fbbf24" strokeWidth={3} dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Run Type Distribution" icon={<PieIcon size={19} />}>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip contentStyle={tooltipStyle()} />
              <Legend />
              <Pie
                data={distribution}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={95}
                paddingAngle={4}
              >
                {distribution.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </section>
  )
}
