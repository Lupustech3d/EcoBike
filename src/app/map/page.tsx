"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Bike = {
  id: string;
  battery: number;
  distanceKm: number;
  pricePerMin: number;
  x: number;
  y: number;
  status: "available" | "in_use" | "moving";
  direction?: { dx: number; dy: number };
};

const initialBikes: Bike[] = [
  { id: "ECO-102", battery: 82, distanceKm: 0.4, pricePerMin: 0.69, x: 22, y: 32, status: "available" },
  { id: "ECO-245", battery: 51, distanceKm: 1.2, pricePerMin: 0.69, x: 64, y: 44, status: "moving", direction: { dx: -0.3, dy: 0.2 } },
  { id: "ECO-311", battery: 94, distanceKm: 0.8, pricePerMin: 0.79, x: 48, y: 70, status: "available" },
  { id: "ECO-456", battery: 38, distanceKm: 2.1, pricePerMin: 0.69, x: 75, y: 25, status: "in_use" },
];

export default function MapPage() {
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

  const availableBikes = bikes.filter((b) => b.status === "available");
  const movingBikes = bikes.filter((b) => b.status === "moving");

  return (
    <AppShell title="Mapa" subtitle="Bikes disponíveis perto de você">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Disponíveis: {availableBikes.length}</p>
              <p className="mt-1 text-xs text-slate-600">Em movimento: {movingBikes.length} • Tempo real</p>
            </div>
            <Link href="/ride/active" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Ver corrida ativa
            </Link>
          </div>

          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200 bg-[#e8ede7] sm:h-72">
            {/* Map background with streets */}
            <div className="absolute inset-0" style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(0deg, rgba(200,200,200,.3) 2px, transparent 2px), linear-gradient(90deg, rgba(200,200,200,.3) 2px, transparent 2px)",
              backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
              backgroundPosition: "0 0, 0 0, 0 0, 0 0",
            }} />
            
            {/* Parks and green areas */}
            <div className="absolute left-[10%] top-[15%] h-24 w-32 rounded-lg bg-emerald-200/40" />
            <div className="absolute right-[15%] bottom-[20%] h-20 w-28 rounded-lg bg-emerald-200/40" />
            
            {/* Buildings blocks */}
            <div className="absolute left-[25%] top-[25%] h-16 w-20 rounded bg-slate-300/30" />
            <div className="absolute right-[30%] top-[35%] h-20 w-24 rounded bg-slate-300/30" />
            <div className="absolute left-[40%] bottom-[30%] h-18 w-22 rounded bg-slate-300/30" />
            
            {/* Main streets overlay */}
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage:
                "linear-gradient(to right, transparent 48%, rgba(150,150,150,.5) 48%, rgba(150,150,150,.5) 52%, transparent 52%), linear-gradient(to bottom, transparent 58%, rgba(150,150,150,.5) 58%, rgba(150,150,150,.5) 62%, transparent 62%)",
            }} />

            {bikes.map((bike) => {
              const bgColor = bike.status === "available" ? "bg-emerald-600" : bike.status === "moving" ? "bg-blue-600" : "bg-slate-400";
              const ringColor = bike.status === "available" ? "ring-emerald-100" : bike.status === "moving" ? "ring-blue-100" : "ring-slate-100";
              
              return (
                <Link
                  key={bike.id}
                  href={bike.status === "available" ? `/bike/${encodeURIComponent(bike.id)}` : "#"}
                  className="absolute transition-all duration-100"
                  style={{ left: `${bike.x}%`, top: `${bike.y}%` }}
                  aria-label={`Ver bike ${bike.id}`}
                  onClick={(e) => bike.status !== "available" && e.preventDefault()}
                >
                  <span className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full ${bgColor} text-white shadow-lg ring-2 ${ringColor} transition-transform hover:scale-105 sm:h-10 sm:w-10 sm:ring-4`}>
                    <span className="text-[10px] font-bold sm:text-xs">{bike.battery}%</span>
                    {bike.status === "moving" && (
                      <span className="absolute -right-1 -top-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
                      </span>
                    )}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm">
                      {bike.id}
                    </span>
                  </span>
                </Link>
              );
            })}

            <div className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              Centro • EcoBike Zone
            </div>
          </div>
        </Card>

        <Button type="button">Escanear QR Code</Button>

        <div className="grid grid-cols-1 gap-3">
          {bikes.map((bike) => {
            const statusText = bike.status === "available" ? "Disponível" : bike.status === "moving" ? "Em movimento" : "Em uso";
            const statusColor = bike.status === "available" ? "text-emerald-700" : bike.status === "moving" ? "text-blue-700" : "text-slate-500";
            
            return (
              <Link key={bike.id} href={bike.status === "available" ? `/bike/${encodeURIComponent(bike.id)}` : "#"} onClick={(e) => bike.status !== "available" && e.preventDefault()}>
                <Card className="transition-colors hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{bike.id}</p>
                        <span className={`text-[10px] font-semibold ${statusColor}`}>{statusText}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">
                        Bateria {bike.battery}% • {bike.distanceKm.toFixed(1)} km • R$ {bike.pricePerMin.toFixed(2)}/min
                      </p>
                    </div>
                    {bike.status === "available" && <span className="text-xs font-semibold text-emerald-700">Detalhes</span>}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
