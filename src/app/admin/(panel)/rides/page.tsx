import { Card } from "@/components/ui/Card";

type LiveRide = {
  id: string;
  bikeId: string;
  user: string;
  minutes: number;
  x: number;
  y: number;
};

const rides: LiveRide[] = [
  { id: "LIVE-201", bikeId: "ECO-102", user: "Ana Eco", minutes: 6, x: 25, y: 35 },
  { id: "LIVE-202", bikeId: "ECO-245", user: "Bruno Silva", minutes: 12, x: 55, y: 48 },
  { id: "LIVE-203", bikeId: "ECO-311", user: "Diego Souza", minutes: 3, x: 70, y: 72 },
];

export default function AdminRidesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-bold text-slate-900">Live ride monitoring</p>
        <p className="mt-1 text-xs text-slate-600">Mapa (mock) com corridas ao vivo</p>

        <div className="mt-4 relative h-80 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(34,197,94,.20), transparent 40%), radial-gradient(circle at 80% 70%, rgba(15,23,42,.10), transparent 45%), linear-gradient(to right, rgba(203,213,225,.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203,213,225,.45) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 36px 36px, 36px 36px",
            }}
          />

          {rides.map((r) => (
            <div
              key={r.id}
              className="absolute"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              title={`${r.bikeId} • ${r.user}`}
            >
              <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-4 ring-emerald-100">
                <span className="text-[10px] font-extrabold">{r.minutes}m</span>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm">
                  {r.bikeId}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            Monitoramento • Centro
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm font-bold text-slate-900">Corridas ativas</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Ride</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Bike</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">User</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Minutes</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-900">{r.id}</td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{r.bikeId}</td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{r.user}</td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{r.minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: sem atualização em tempo real.</p>
    </div>
  );
}
