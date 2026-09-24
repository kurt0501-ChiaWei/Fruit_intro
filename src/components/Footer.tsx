import Link from "next/link";
import { fruits } from "@/data/fruits";
import { photos } from "@/data/photos";
import Sphere from "./Sphere";

const columns = [
  {
    title: "目錄",
    links: [
      { href: "/#index", label: "水果索引" },
      { href: "/#season", label: "產季月曆" },
      { href: "/#gallery", label: "圖輯" },
      { href: "/#about", label: "風土" },
      { href: "/blog", label: "產季筆記" },
      { href: "/game", label: "接水果小遊戲" },
    ],
  },
  {
    title: "依季節",
    links: [
      { href: "/#season", label: "春｜鳳梨、蓮霧" },
      { href: "/#season", label: "夏｜芒果、荔枝" },
      { href: "/#season", label: "秋冬｜文旦、釋迦" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-5xl font-black tracking-wider sm:text-6xl">台灣好果</p>
            <p className="mt-3 font-latin text-2xl italic text-paper/60">Formosa Fruit Almanac</p>
            <div className="mt-8 flex -space-x-2">
              {fruits.map((f) => (
                <Sphere key={f.name} colors={f.colors} className="h-8 w-8 ring-2 ring-ink" />
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h3 className="text-xs tracking-[0.3em] text-paper/50">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-paper/85 transition hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 照片授權標示（CC 授權要求標註作者與授權） */}
        <div className="mt-16 border-t border-paper/15 pt-6 text-xs leading-6 text-paper/45">
          <p className="mb-1 tracking-[0.2em]">照片來源 — Wikimedia Commons</p>
          <p>
            {Object.values(photos).map((p, i) => (
              <span key={p.src}>
                {i > 0 && "．"}
                <a href={p.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                  {p.label}：{p.author}（{p.license}）
                </a>
              </span>
            ))}
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-paper/15 pt-6 text-sm text-paper/50 sm:flex-row">
          <p>© 2026 台灣好果．吃當季，吃在地。</p>
          <Link href="#" className="transition hover:text-paper">
            回到頂部 ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
