"use client";

import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/ui/Card";

type Ride = {
  id: string;
  bikeId: string;
  date: string;
  time: string;
  durationMin: number;
  distanceKm: number;
  cost: number;
  co2Saved: number;
};

const rides: Ride[] = [
  { id: "RIDE-901", bikeId: "ECO-311", date: "09/03/2026", time: "14:32", durationMin: 18, distanceKm: 3.2, cost: 12.42, co2Saved: 0.64 },
  { id: "RIDE-873", bikeId: "ECO-102", date: "07/03/2026", time: "09:15", durationMin: 9, distanceKm: 1.5, cost: 6.21, co2Saved: 0.30 },
  { id: "RIDE-841", bikeId: "ECO-245", date: "02/03/2026", time: "18:45", durationMin: 24, distanceKm: 5.1, cost: 16.56, co2Saved: 1.02 },
  { id: "RIDE-822", bikeId: "ECO-102", date: "28/02/2026", time: "11:20", durationMin: 6, distanceKm: 0.9, cost: 4.14, co2Saved: 0.18 },
  { id: "RIDE-798", bikeId: "ECO-456", date: "25/02/2026", time: "16:05", durationMin: 32, distanceKm: 6.8, cost: 22.08, co2Saved: 1.36 },
];

export default function HistoryPage() {
  return (
    <AppShell title="Histórico" subtitle="Suas últimas pedaladas">
      <div className="space-y-3">
        {rides.map((ride) => (
          <Card key={ride.id} className="transition-colors hover:bg-slate-50">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">{ride.date} às {ride.time}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Bike {ride.bikeId} • {ride.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-emerald-700">
                    R$ {ride.cost.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500">Duração</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{ride.durationMin} min</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500">Distância</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{ride.distanceKm.toFixed(1)} km</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500">CO₂ evitado</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">{ride.co2Saved.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className="bg-gradient-to-br from-emerald-50 to-white">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">Total economizado este mês</p>
            <p className="mt-2 text-2xl font-extrabold text-emerald-700">
              {rides.reduce((sum, r) => sum + r.co2Saved, 0).toFixed(2)} kg CO₂
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Equivalente a plantar {Math.ceil(rides.reduce((sum, r) => sum + r.co2Saved, 0) * 2)} árvores
            </p>
          </div>
        </Card>

        <p className="pt-2 text-center text-xs text-slate-500">
          Mock UI: lista gerada com dados locais.
        </p>
      </div>
    </AppShell>
  );
}
