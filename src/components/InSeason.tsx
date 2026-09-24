"use client";

import { fruits } from "@/data/fruits";
import { useCurrentMonth } from "@/lib/useCurrentMonth";
import Sphere from "./Sphere";

export default function InSeason() {
  const month = useCurrentMonth();
  const list = month ? fruits.filter((f) => f.months.includes(month)) : [];

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
        <p className="text-xs tracking-[0.25em] text-ink-soft">本月當季</p>
        <p className="font-latin text-3xl leading-none">
          {month ? String(month).padStart(2, "0") : "—"}
          <span className="ml-1 text-base italic text-ink-soft">月</span>
        </p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {list.map((f) => (
          <li key={f.name} className="flex items-center gap-3">
            <Sphere colors={f.colors} className="h-4 w-4" />
            <span className="font-serif font-bold">{f.name}</span>
            <span className="ml-auto text-xs text-ink-soft">{f.origin.split("、")[0]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
