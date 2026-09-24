"use client";

import Link from "next/link";
import { useState } from "react";
import Sphere from "./Sphere";

const links = [
  { href: "/#index", label: "水果索引" },
  { href: "/#season", label: "產季月曆" },
  { href: "/#gallery", label: "圖輯" },
  { href: "/#about", label: "風土" },
  { href: "/blog", label: "產季筆記" },
  { href: "/game", label: "小遊戲" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-[calc(100%-2rem)] max-w-6xl">
      <nav className="glass rounded-[1.75rem] px-5 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Sphere colors={["#FFD37A", "#F79A2E", "#C2521C"]} className="h-7 w-7" />
            <span className="font-serif text-lg font-black tracking-wider">台灣好果</span>
            <span className="hidden font-latin text-base italic text-ink-soft sm:inline">Formosa Fruit</span>
          </Link>

          {/* 桌機選單 */}
          <ul className="hidden items-center gap-8 text-sm lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft transition hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#season"
                className="rounded-full bg-ink px-5 py-2 font-medium text-paper transition hover:bg-ink/85"
              >
                本月當季
              </Link>
            </li>
          </ul>

          {/* 手機漢堡按鈕 */}
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          >
            <span className={`h-px w-5 bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* 手機選單 */}
        {open && (
          <ul className="mt-3 border-t border-ink/10 pt-2 lg:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-xl font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
