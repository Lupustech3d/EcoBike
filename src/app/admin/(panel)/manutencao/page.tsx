"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type MaintenanceTicket = {
  id: string;
  bikeId: string;
  type: "preventiva" | "corretiva" | "emergencia";
  priority: "baixa" | "media" | "alta" | "critica";
  status: "aberto" | "em_andamento" | "aguardando_peca" | "concluido" | "cancelado";
  description: string;
  reportedBy: string;
  createdAt: string;
  estimatedTime?: string;
  assignedTo?: string;
};

type BikeInTransit = {
  id: string;
  bikeId: string;
  origin: string;
  destination: string;
  estimatedArrival: string;
  status: "em_transito" | "chegando" | "chegou";
  distance: number;
};

const maintenanceTickets: MaintenanceTicket[] = [
  { id: "MNT-001", bikeId: "ECO-789", type: "emergencia", priority: "critica", status: "em_andamento", description: "Acidente reportado - necessita inspeção completa", reportedBy: "Sistema", createdAt: "09/03/2026 15:30", estimatedTime: "2h", assignedTo: "Técnico João" },
  { id: "MNT-002", bikeId: "ECO-523", type: "preventiva", priority: "media", status: "aguardando_peca", description: "Revisão dos 1000km - troca de pastilhas de freio", reportedBy: "Admin", createdAt: "08/03/2026 10:00", estimatedTime: "1h", assignedTo: "Técnico Maria" },
  { id: "MNT-003", bikeId: "ECO-612", type: "corretiva", priority: "alta", status: "aberto", description: "Bateria não carrega - possível problema no conector", reportedBy: "Usuário #284", createdAt: "09/03/2026 09:15", estimatedTime: "3h" },
  { id: "MNT-004", bikeId: "ECO-245", type: "preventiva", priority: "baixa", status: "concluido", description: "Troca de pneu traseiro", reportedBy: "Admin", createdAt: "07/03/2026 14:00", assignedTo: "Técnico Pedro" },
  { id: "MNT-005", bikeId: "ECO-311", type: "corretiva", priority: "media", status: "aberto", description: "Freio dianteiro rangendo", reportedBy: "Usuário #192", createdAt: "09/03/2026 11:20" },
];

const bikesInTransit: BikeInTransit[] = [
  { id: "TRN-001", bikeId: "ECO-789", origin: "Zona Centro", destination: "Oficina Principal", estimatedArrival: "16:30", status: "em_transito", distance: 3.2 },
  { id: "TRN-002", bikeId: "ECO-523", origin: "Zona Sul", destination: "Oficina Norte", estimatedArrival: "17:00", status: "chegando", distance: 0.8 },
];

export default function ManutencaoPage() {
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    bikeId: "",
    type: "corretiva" as const,
    priority: "media" as const,
    description: "",
  });

  const handleCreateTicket = () => {
    console.log("Novo chamado criado:", newTicket);
    alert(`Chamado criado com sucesso!\nBike: ${newTicket.bikeId}\nTipo: ${newTicket.type}\nPrioridade: ${newTicket.priority}`);
    setShowNewTicketForm(false);
    setNewTicket({ bikeId: "", type: "corretiva", priority: "media", description: "" });
  };

  const statusCounts = maintenanceTickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Manutenção</h1>
          <p className="mt-1 text-sm text-slate-600">Gestão de chamados e veículos em manutenção</p>
        </div>
        <Button type="button" className="sm:w-auto" onClick={() => setShowNewTicketForm(!showNewTicketForm)}>
          {showNewTicketForm ? "Cancelar" : "+ Novo Chamado"}
        </Button>
      </div>

      {showNewTicketForm && (
        <Card className="p-5">
          <p className="text-sm font-bold text-slate-900">Abrir Novo Chamado</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">ID da Bike</label>
              <input
                type="text"
                value={newTicket.bikeId}
                onChange={(e) => setNewTicket({ ...newTicket, bikeId: e.target.value })}
                placeholder="Ex: ECO-102"
                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Tipo</label>
                <select
                  value={newTicket.type}
                  onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value as any })}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
                  <option value="emergencia">Emergência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Prioridade</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Descrição do Problema</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Descreva o problema encontrado..."
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Button type="button" onClick={handleCreateTicket} fullWidth>
              Criar Chamado
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500">Chamados Abertos</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-orange-700">
            {statusCounts.aberto || 0}
          </p>
          <p className="mt-2 text-xs text-slate-600">Aguardando atendimento</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500">Em Andamento</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-blue-700">
            {statusCounts.em_andamento || 0}
          </p>
          <p className="mt-2 text-xs text-slate-600">Sendo atendidos</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500">Aguardando Peça</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-yellow-700">
            {statusCounts.aguardando_peca || 0}
          </p>
          <p className="mt-2 text-xs text-slate-600">Bloqueados</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500">Concluídos Hoje</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-emerald-700">
            {statusCounts.concluido || 0}
          </p>
          <p className="mt-2 text-xs text-slate-600">Finalizados</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Veículos em Deslocamento para Manutenção</p>
            <p className="mt-1 text-xs text-slate-600">{bikesInTransit.length} bikes em trânsito</p>
          </div>
        </div>

        <div className="space-y-3">
          {bikesInTransit.map((transit) => (
            <div
              key={transit.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-white p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{transit.bikeId}</p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {transit.origin} → {transit.destination}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{transit.id}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-bold text-blue-700">{transit.distance.toFixed(1)} km</p>
                <p className="mt-0.5 text-xs text-slate-600">Chegada: {transit.estimatedArrival}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    transit.status === "em_transito"
                      ? "bg-blue-100 text-blue-700"
                      : transit.status === "chegando"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {transit.status === "em_transito" ? "Em trânsito" : transit.status === "chegando" ? "Chegando" : "Chegou"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4">
          <p className="text-sm font-bold text-slate-900">Chamados de Manutenção</p>
          <p className="mt-1 text-xs text-slate-600">{maintenanceTickets.length} chamados registrados</p>
        </div>

        <div className="space-y-3">
          {maintenanceTickets.map((ticket) => {
            const priorityColors = {
              baixa: "bg-slate-100 text-slate-700",
              media: "bg-yellow-100 text-yellow-700",
              alta: "bg-orange-100 text-orange-700",
              critica: "bg-red-100 text-red-700",
            };

            const statusColors = {
              aberto: "bg-orange-100 text-orange-700",
              em_andamento: "bg-blue-100 text-blue-700",
              aguardando_peca: "bg-yellow-100 text-yellow-700",
              concluido: "bg-emerald-100 text-emerald-700",
              cancelado: "bg-slate-100 text-slate-700",
            };

            const statusLabels = {
              aberto: "Aberto",
              em_andamento: "Em Andamento",
              aguardando_peca: "Aguardando Peça",
              concluido: "Concluído",
              cancelado: "Cancelado",
            };

            return (
              <div
                key={ticket.id}
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{ticket.bikeId}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityColors[ticket.priority]}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[ticket.status]}`}>
                        {statusLabels[ticket.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{ticket.description}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
                      <span>📋 {ticket.id}</span>
                      <span>🏷️ {ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}</span>
                      <span>👤 {ticket.reportedBy}</span>
                      <span>📅 {ticket.createdAt}</span>
                      {ticket.assignedTo && <span>🔧 {ticket.assignedTo}</span>}
                      {ticket.estimatedTime && <span>⏱️ {ticket.estimatedTime}</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: dados de manutenção simulados localmente.</p>
    </div>
  );
}
