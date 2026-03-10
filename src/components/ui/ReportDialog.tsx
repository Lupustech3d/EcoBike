"use client";

import { useState } from "react";
import { MediaUpload } from "./MediaUpload";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { type: string; description: string; file?: File }) => void;
};

const problemTypes = [
  { value: "mechanical", label: "Problema mecânico" },
  { value: "battery", label: "Bateria/elétrico" },
  { value: "accident", label: "Acidente" },
  { value: "theft", label: "Tentativa de roubo" },
  { value: "other", label: "Outro" },
];

export function ReportDialog({ open, onClose, onSubmit }: Props) {
  const [type, setType] = useState("mechanical");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>();

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit({ type, description, file });
    setType("mechanical");
    setDescription("");
    setFile(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
          <p className="text-base font-extrabold tracking-tight text-slate-900">Reportar problema</p>
          <p className="mt-1 text-sm text-slate-600">
            Descreva o problema e envie uma foto ou vídeo se possível
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Tipo de problema</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {problemTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o que aconteceu..."
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Evidência (opcional)</label>
              <div className="mt-2">
                <MediaUpload onFileSelect={setFile} />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-12 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 hover:bg-slate-50"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="h-12 rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
