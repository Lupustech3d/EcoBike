import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  className = "",
  variant = "primary",
  fullWidth = true,
  ...props
}: Props) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const width = fullWidth ? "w-full" : "";

  const stylesByVariant: Record<ButtonVariant, string> = {
    primary:
      "bg-[#22c55e] text-white hover:bg-[#15803d] focus:ring-[#22c55e] focus:ring-offset-[#f8fafc]",
    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300 focus:ring-offset-[#f8fafc]",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300 focus:ring-offset-[#f8fafc]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-[#f8fafc]",
  };

  return (
    <button
      className={[base, width, stylesByVariant[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
