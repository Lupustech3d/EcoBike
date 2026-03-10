"use client";

import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-md px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
          <p className="text-base font-extrabold tracking-tight text-slate-900">{title}</p>
          {description ? (
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          ) : null}

          {children ? <div className="mt-4">{children}</div> : null}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-12 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 hover:bg-slate-50"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="h-12 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
