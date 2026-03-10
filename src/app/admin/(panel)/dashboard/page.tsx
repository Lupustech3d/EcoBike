"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

type BikeStatus = "available" | "in_use" | "moving" | "accident" | "maintenance" | "stopped";

type Bike = {
  id: string;
  battery: number;
  x: number;
  y: number;
  status: BikeStatus;
  direction?: { dx: number; dy: number };
};

const initialBikes: Bike[] = [
  { id: "ECO-102", battery: 82, x: 22, y: 32, status: "available" },
  { id: "ECO-245", battery: 51, x: 64, y: 44, status: "moving", direction: { dx: -0.3, dy: 0.2 } },
  { id: "ECO-311", battery: 94, x: 48, y: 70, status: "available" },
  { id: "ECO-456", battery: 38, x: 75, y: 25, status: "in_use" },
  { id: "ECO-789", battery: 15, x: 35, y: 55, status: "accident" },
  { id: "ECO-523", battery: 67, x: 58, y: 18, status: "maintenance" },
  { id: "ECO-612", battery: 88, x: 18, y: 65, status: "stopped" },
  { id: "ECO-834", battery: 72, x: 80, y: 60, status: "moving", direction: { dx: 0.2, dy: -0.25 } },
];

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-600">{hint}</p>
    </Card>
  );
}

function BarChart() {
  const bars = [18, 26, 22, 30, 38, 34, 42];
  const max = Math.max(...bars);

  return (
    <div className="mt-3 flex items-end gap-2">
      {bars.map((v, idx) => (
        <div key={idx} className="flex w-full flex-col items-center gap-2">
          <div
            className="w-full rounded-xl bg-emerald-500/80"
            style={{ height: `${Math.round((v / max) * 120) + 12}px` }}
            title={`${v} corridas`}
          />
          <span className="text-[10px] font-medium text-slate-500">D{idx + 1}</span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  return (
    <div className="mt-4 flex items-center gap-4">
      <svg viewBox="0 0 36 36" className="h-20 w-20">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="4"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          strokeDasharray="68, 100"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-sm font-bold text-slate-900">Distribuição de status</p>
        <p className="mt-1 text-xs text-slate-600">68% ativas • 22% manutenção • 10% offline</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [bikes, setBikes] = useState<Bike[]>(initialBikes);

  useEffect(() => {
    const interval = setInterval(() => {
      setBikes((prev) =>
        prev.map((bike) => {
          if (bike.status === "moving" && bike.direction) {
            let newX = bike.x + bike.direction.dx;
            let newY = bike.y + bike.direction.dy;

            if (newX < 5 || newX > 90) bike.direction.dx *= -1;
            if (newY < 5 || newY > 85) bike.direction.dy *= -1;

            newX = Math.max(5, Math.min(90, newX));
            newY = Math.max(5, Math.min(85, newY));

            return { ...bike, x: newX, y: newY };
          }
          return bike;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const statusCounts = bikes.reduce((acc, bike) => {
    acc[bike.status] = (acc[bike.status] || 0) + 1;
    return acc;
  }, {} as Record<BikeStatus, number>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total bikes" value={bikes.length.toString()} hint="Frota monitorada" />
        <MetricCard label="Disponíveis" value={(statusCounts.available || 0).toString()} hint="Prontas para uso" />
        <MetricCard label="Em movimento" value={(statusCounts.moving || 0).toString()} hint="Tempo real" />
        <MetricCard label="Alertas" value={((statusCounts.accident || 0) + (statusCounts.maintenance || 0)).toString()} hint="Requer atenção" />
      </div>

      <Card className="p-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Mapa em tempo real</p>
            <p className="mt-1 text-xs text-slate-600">Monitoramento de frota • Atualização contínua</p>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600"></span>Disponível</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600"></span>Movimento</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-600"></span>Acidente</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-600"></span>Manutenção</span>
          </div>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-[#e8ede7] sm:h-96">
          {/* Map background with streets */}
          <div className="absolute inset-0" style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(0deg, rgba(200,200,200,.3) 2px, transparent 2px), linear-gradient(90deg, rgba(200,200,200,.3) 2px, transparent 2px)",
            backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
            backgroundPosition: "0 0, 0 0, 0 0, 0 0",
          }} />
          
          {/* Parks and green areas */}
          <div className="absolute left-[10%] top-[15%] h-32 w-40 rounded-lg bg-emerald-200/40" />
          <div className="absolute right-[15%] bottom-[20%] h-28 w-36 rounded-lg bg-emerald-200/40" />
          <div className="absolute left-[60%] top-[50%] h-24 w-32 rounded-lg bg-emerald-200/40" />
          
          {/* Buildings blocks */}
          <div className="absolute left-[25%] top-[25%] h-20 w-24 rounded bg-slate-300/30" />
          <div className="absolute right-[30%] top-[35%] h-24 w-28 rounded bg-slate-300/30" />
          <div className="absolute left-[40%] bottom-[30%] h-22 w-26 rounded bg-slate-300/30" />
          <div className="absolute right-[45%] bottom-[15%] h-18 w-22 rounded bg-slate-300/30" />
          
          {/* Main streets overlay */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage:
              "linear-gradient(to right, transparent 48%, rgba(150,150,150,.5) 48%, rgba(150,150,150,.5) 52%, transparent 52%), linear-gradient(to bottom, transparent 58%, rgba(150,150,150,.5) 58%, rgba(150,150,150,.5) 62%, transparent 62%)",
          }} />

          {bikes.map((bike) => {
            const statusConfig: Record<BikeStatus, { bg: string; ring: string; icon?: string }> = {
              available: { bg: "bg-emerald-600", ring: "ring-emerald-100" },
              in_use: { bg: "bg-slate-400", ring: "ring-slate-100" },
              moving: { bg: "bg-blue-600", ring: "ring-blue-100" },
              accident: { bg: "bg-red-600", ring: "ring-red-100", icon: "⚠" },
              maintenance: { bg: "bg-orange-600", ring: "ring-orange-100", icon: "🔧" },
              stopped: { bg: "bg-yellow-600", ring: "ring-yellow-100", icon: "⏸" },
            };

            const config = statusConfig[bike.status];

            return (
              <div
                key={bike.id}
                className="absolute transition-all duration-100"
                style={{ left: `${bike.x}%`, top: `${bike.y}%` }}
              >
                <span className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full ${config.bg} text-white shadow-lg ring-2 ${config.ring} sm:h-10 sm:w-10 sm:ring-4`}>
                  {config.icon ? (
                    <span className="text-xs sm:text-sm">{config.icon}</span>
                  ) : (
                    <span className="text-[10px] font-bold sm:text-xs">{bike.battery}%</span>
                  )}
                  {bike.status === "moving" && (
                    <span className="absolute -right-1 -top-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
                    </span>
                  )}
                  {bike.status === "accident" && (
                    <span className="absolute -right-1 -top-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                    </span>
                  )}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm">
                    {bike.id}
                  </span>
                </span>
              </div>
            );
          })}

          <div className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            Centro • EcoBike Zone
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-emerald-50 p-3 text-center">
            <p className="text-xs font-semibold text-slate-500">Disponíveis</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">{statusCounts.available || 0}</p>
          </div>
          <div className="rounded-xl bg-blue-50 p-3 text-center">
            <p className="text-xs font-semibold text-slate-500">Em movimento</p>
            <p className="mt-1 text-lg font-bold text-blue-700">{statusCounts.moving || 0}</p>
          </div>
          <div className="rounded-xl bg-red-50 p-3 text-center">
            <p className="text-xs font-semibold text-slate-500">Acidentes</p>
            <p className="mt-1 text-lg font-bold text-red-700">{statusCounts.accident || 0}</p>
          </div>
          <div className="rounded-xl bg-orange-50 p-3 text-center">
            <p className="text-xs font-semibold text-slate-500">Manutenção</p>
            <p className="mt-1 text-lg font-bold text-orange-700">{statusCounts.maintenance || 0}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm font-bold text-slate-900">Rides per day</p>
          <p className="mt-1 text-xs text-slate-600">Últimos 7 dias (mock)</p>
          <BarChart />
        </Card>

        <Card>
          <p className="text-sm font-bold text-slate-900">Bike status</p>
          <p className="mt-1 text-xs text-slate-600">Visão geral (mock)</p>
          <Donut />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-bold text-slate-900">Rides today</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-700">142</p>
          <p className="mt-2 text-xs text-slate-600">Pico: 18:00–19:00 (mock)</p>
        </Card>

        <Card>
          <p className="text-sm font-bold text-slate-900">Alertas</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-700">Bateria baixa em ECO-245</p>
              <span className="text-xs font-semibold text-slate-500">10min</span>
            </div>
            <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-700">Manutenção vencendo: ECO-311</p>
              <span className="text-xs font-semibold text-slate-500">hoje</span>
            </div>
          </div>
        </Card>
      </div>

      <p className="text-xs text-slate-500">Mock UI: métricas e gráficos são dados locais.</p>
    </div>
  );
}
