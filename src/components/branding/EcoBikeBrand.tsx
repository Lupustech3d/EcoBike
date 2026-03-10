import type { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  caption?: ReactNode;
};

export function EcoBikeBrand({
  title = "EcoBike",
  caption = "Energia limpa • Cidade em movimento",
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-emerald-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6.5" cy="17.5" r="3.5" />
          <circle cx="17.5" cy="17.5" r="3.5" />
          <path d="M6.5 17.5L10 10h3l2.5 7.5" />
          <path d="M14 10l2-3h3" />
          <path d="M10 10l-2-3" />
        </svg>
        <span className="text-lg font-extrabold tracking-tight text-emerald-700">
          {title}
        </span>
      </div>

      <p className="text-xs font-medium tracking-wide text-slate-600">{caption}</p>
    </div>
  );
}
