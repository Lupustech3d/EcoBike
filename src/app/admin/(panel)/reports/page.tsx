import { Card } from "@/components/ui/Card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-bold text-slate-900">Reports</p>
        <p className="mt-1 text-xs text-slate-600">Visão consolidada (mock)</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Receita (30 dias)</p>
            <p className="mt-2 text-xl font-extrabold text-slate-900">R$ 74.120</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Corridas (30 dias)</p>
            <p className="mt-2 text-xl font-extrabold text-slate-900">3.482</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Incidentes</p>
            <p className="mt-2 text-xl font-extrabold text-slate-900">18</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Manutenções</p>
            <p className="mt-2 text-xl font-extrabold text-slate-900">62</p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm font-bold text-slate-900">Export</p>
        <p className="mt-1 text-xs text-slate-600">Mock de exportação</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button className="h-12 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50">CSV</button>
          <button className="h-12 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50">PDF</button>
          <button className="h-12 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50">JSON</button>
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: export ainda não faz download.</p>
    </div>
  );
}
