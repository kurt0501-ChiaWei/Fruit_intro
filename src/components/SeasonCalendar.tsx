"use client";

import { fruits } from "@/data/fruits";
import { useCurrentMonth } from "@/lib/useCurrentMonth";

const months = Array.from({ length: 12 }, (_, i) => i + 1);

export default function SeasonCalendar() {
  const current = useCurrentMonth();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40 pb-4 text-left text-xs font-normal tracking-[0.2em] text-ink-soft">品項</th>
            {months.map((m) => (
              <th key={m} className="pb-4 font-normal">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-latin text-lg ${
                    m === current ? "bg-ink text-paper" : "text-ink-soft"
                  }`}
                >
                  {m}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <tr key={fruit.name} className="border-t border-ink/10">
              <td className="py-3 pr-4 font-serif font-bold whitespace-nowrap">{fruit.name}</td>
              {months.map((m) => {
                const on = fruit.months.includes(m);
                const prev = fruit.months.includes(m === 1 ? 12 : m - 1);
                const next = fruit.months.includes(m === 12 ? 1 : m + 1);
                return (
                  <td key={m} className={`py-3 ${m === current ? "bg-ink/[0.04]" : ""}`}>
                    {on && (
                      <div
                        className={`h-3 ${prev && m !== 1 ? "" : "ml-1 rounded-l-full"} ${
                          next && m !== 12 ? "" : "mr-1 rounded-r-full"
                        }`}
                        style={{ background: `linear-gradient(180deg, ${fruit.colors[0]}, ${fruit.colors[1]})` }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
