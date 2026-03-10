"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReportDialog } from "@/components/ui/ReportDialog";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ActiveRidePage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const pricePerMin = 0.69;
  const currentCost = useMemo(() => (seconds / 60) * pricePerMin, [seconds]);

  return (
    <AppShell
      title="Corrida ativa"
      subtitle="Boa pedalada — você está economizando CO₂"
      right={
        <Link
          href="/map"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Mapa
        </Link>
      }
    >
      <div className="space-y-4">
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500">Tempo</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">{formatTime(seconds)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500">Custo atual</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-emerald-700">R$ {currentCost.toFixed(2)}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600">Tarifa: R$ {pricePerMin.toFixed(2)}/min • Mock</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-900">Rota</p>
          <p className="mt-1 text-xs text-slate-600">Mapa de rota (mock)</p>

          <div className="mt-3 relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(34,197,94,.20), transparent 40%), radial-gradient(circle at 70% 75%, rgba(15,23,42,.10), transparent 45%), linear-gradient(to right, rgba(203,213,225,.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203,213,225,.45) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 32px 32px, 32px 32px",
            }} />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <path
                d="M15 70 C 30 40, 45 60, 60 35 S 85 30, 90 55"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="15" cy="70" r="4" fill="#15803d" />
              <circle cx="90" cy="55" r="4" fill="#15803d" />
            </svg>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-3">
          <Button type="button" variant="danger" onClick={() => setConfirmEnd(true)}>
            Encerrar corrida
          </Button>
          <Button type="button" variant="secondary" onClick={() => setReportOpen(true)}>
            Reportar problema
          </Button>
        </div>

        <ConfirmDialog
          open={confirmEnd}
          title="Encerrar corrida?"
          description="Você pode finalizar agora e a cobrança será encerrada (mock)."
          confirmLabel="Encerrar"
          cancelLabel="Cancelar"
          onClose={() => setConfirmEnd(false)}
          onConfirm={() => router.push("/history")}
        />

        <ReportDialog
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          onSubmit={(data) => {
            console.log("Problema reportado:", data);
            alert(`Problema reportado com sucesso!\nTipo: ${data.type}\nDescrição: ${data.description}\nArquivo: ${data.file?.name || "Nenhum"}`);
          }}
        />

        <p className="text-center text-xs text-slate-500">
          Mock UI: timer e custo são simulados localmente.
        </p>
      </div>
    </AppShell>
  );
}
