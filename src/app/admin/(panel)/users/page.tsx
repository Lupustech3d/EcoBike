import { Card } from "@/components/ui/Card";

type UserRow = {
  name: string;
  email: string;
  status: "Active" | "Blocked";
  rideCount: number;
};

const users: UserRow[] = [
  { name: "Ana Eco", email: "ana@ecobike.com", status: "Active", rideCount: 14 },
  { name: "Bruno Silva", email: "bruno@exemplo.com", status: "Active", rideCount: 6 },
  { name: "Carla Lima", email: "carla@exemplo.com", status: "Blocked", rideCount: 2 },
  { name: "Diego Souza", email: "diego@exemplo.com", status: "Active", rideCount: 9 },
];

function StatusPill({ status }: { status: UserRow["status"] }) {
  const styles: Record<UserRow["status"], string> = {
    Active: "bg-emerald-50 text-emerald-800 border-emerald-200",
    Blocked: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", styles[status]].join(" ")}> 
      {status}
    </span>
  );
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-bold text-slate-900">User management</p>
        <p className="mt-1 text-xs text-slate-600">Tabela com dados mock</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Name</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Email</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="border-b border-slate-200 pb-3 text-left text-xs font-semibold text-slate-500">Ride count</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="hover:bg-slate-50">
                  <td className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-900">{u.name}</td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{u.email}</td>
                  <td className="border-b border-slate-100 py-3"><StatusPill status={u.status} /></td>
                  <td className="border-b border-slate-100 py-3 text-sm text-slate-700">{u.rideCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: ainda sem ações de bloquear/editar.</p>
    </div>
  );
}
