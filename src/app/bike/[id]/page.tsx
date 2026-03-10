"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type BikeDetails = {
  id: string;
  battery: number;
  distanceKm: number;
  pricePerMin: number;
};

function mockBike(id: string): BikeDetails {
  const seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const battery = 40 + (seed % 61);
  const distanceKm = ((seed % 24) + 2) / 10;
  const pricePerMin = seed % 2 === 0 ? 0.69 : 0.79;
  return { id, battery, distanceKm, pricePerMin };
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default function BikeDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const bikeId = decodeURIComponent(params.id ?? "ECO-000");
  const bike = useMemo(() => mockBike(bikeId), [bikeId]);

  return (
    <AppShell
      title="Detalhes da Bike"
      subtitle="Pronta para rodar quando você estiver"
      right={
        <Link
          href="/map"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Voltar
        </Link>
      }
    >
      <div className="space-y-4">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500">Bike ID</p>
              <p className="mt-1 text-lg font-extrabold tracking-tight text-slate-900">{bike.id}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-center">
              <p className="text-xs font-semibold text-emerald-700">Bateria</p>
              <p className="mt-1 text-sm font-extrabold text-emerald-800">{bike.battery}%</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <StatRow label="Distância" value={`${bike.distanceKm.toFixed(1)} km`} />
            <StatRow label="Preço por minuto" value={`R$ ${bike.pricePerMin.toFixed(2)}/min`} />
            <StatRow label="Zona" value="Centro • EcoBike Zone" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50">
          <p className="text-sm font-semibold text-slate-900">Dica</p>
          <p className="mt-1 text-sm text-slate-600">
            Use capacete, respeite as faixas e escolha rotas com ciclovia.
          </p>
        </Card>

        <div className="grid grid-cols-1 gap-3">
          <Button type="button" onClick={() => router.push("/ride/active")}>
            Desbloquear bike
          </Button>
          <Button type="button" variant="secondary">Reservar bike</Button>
        </div>

        <p className="text-center text-xs text-slate-500">
          Mock UI: botões ainda não destravam de verdade.
        </p>
      </div>
    </AppShell>
  );
}
