import { Card } from "@/components/ui/Card";

type BikeRow = {
  id: string;
  location: string;
  status: "Active" | "Maintenance" | "Offline";
  lastMaintenance: string;
};

const bikes: BikeRow[] = [
  { id: "ECO-102", location: "Centro • Praça", status: "Active", lastMaintenance: "01/03/2026" },
  { id: "ECO-245", location: "Av. Principal", status: "Active", lastMaintenance: "22/02/2026" },
  { id: "ECO-311", location: "Parque Sul", status: "Maintenance", lastMaintenance: "09/03/2026" },
  { id: "ECO-401", location: "Rodoviária", status: "Offline", lastMaintenance: "10/02/2026" },
];

function StatusPill({ status }: { status: BikeRow["status"] }) {
  const styles: Record<BikeRow["status"], string> = {
    Active: "bg-emerald-50 text-emerald-800 border-emerald-200",
    Maintenance: "bg-amber-50 text-amber-800 border-amber-200",
    Offline: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", styles[status]].join(" ")}> 
      {status}
    </span>
  );
}

export default function AdminBikesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-bold text-slate-900">Bike management</p>
        <p className="mt-1 text-xs text-slate-600">Tabela com dados mock</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Bike ID</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Location</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Last maintenance</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-900">{b.id}</td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{b.location}</td>
                  <td className="border-b border-slate-100 py-3"><StatusPill status={b.status} /></td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{b.lastMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: ainda sem CRUD.</p>
    </div>
  );
}
