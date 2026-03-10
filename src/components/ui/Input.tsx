import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className = "", id, ...props }: Props) {
  const inputId = id ?? props.name ?? label;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-900">
        {label}
      </label>
      <input
        id={inputId}
        className={[
          "h-12 w-full rounded-xl border bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none transition-colors",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-[#22c55e] focus:ring-2 focus:ring-emerald-200",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
