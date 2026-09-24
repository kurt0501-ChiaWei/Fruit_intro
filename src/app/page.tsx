import Image from "next/image";
import Link from "next/link";
import { fruits, formatMonths } from "@/data/fruits";
import { photos } from "@/data/photos";
import PhotoOrb from "@/components/PhotoOrb";
import Parallax from "@/components/Parallax";
import InSeason from "@/components/InSeason";
import SeasonCalendar from "@/components/SeasonCalendar";

// 圖輯的排列：span 決定在格線中佔幾格
const gallery = [
  { photo: photos.mango, span: "md:col-span-2 md:row-span-2" },
  { photo: photos.lychee, span: "" },
  { photo: photos.waxApple, span: "" },
  { photo: photos.pineapple, span: "md:row-span-2" },
  { photo: photos.guava, span: "" },
  { photo: photos.papaya, span: "md:col-span-2" },
  { photo: photos.banana, span: "" },
  { photo: photos.sugarApple, span: "" },
  { photo: photos.watermelon, span: "md:col-span-2" },
  { photo: photos.pomelo, span: "" },
];

export default function Home() {
  return (
    <main>
      {/* ───────── 主視覺 ───────── */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-7">
          <Parallax speed={0.08}>
            <p className="text-xs tracking-[0.3em] text-ink-soft">
              台灣水果產季誌 <span className="mx-2 text-ink/30">/</span>
              <span className="font-latin text-sm italic tracking-normal">Vol. 01 — 2026</span>
            </p>
            <h1 className="mt-8 font-serif text-5xl font-black leading-[1.15] tracking-tight sm:text-7xl">
              一座島，
              <br />
              十二個月
              <br />
              都是
              <span className="relative inline-block">
                甜的
                <span className="absolute -bottom-1 left-0 -z-10 h-4 w-full rounded-full bg-[#F7B24A]/60" />
              </span>
              。
            </h1>
            <p className="mt-8 max-w-md leading-8 text-ink-soft">
              北回歸線從嘉義穿過，這座島一半熱帶、一半亞熱帶。從春天的鳳梨到冬天的蓮霧，
              我們整理了八種最值得認識的在地水果，以及它們的產地與產季。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/#index"
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-ink/85"
              >
                翻閱水果索引
              </Link>
              <Link href="/#season" className="group text-sm font-medium">
                產季月曆
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Parallax>
        </div>

        {/* 亮面照片球 + 玻璃卡 */}
        <div className="relative mx-auto h-[420px] w-full max-w-sm md:col-span-5 md:h-auto md:min-h-[480px] md:max-w-none">
          {/* 不同 speed 讓三顆球和卡片分出前後層次 */}
          <Parallax speed={0.1} className="absolute right-0 top-4 h-64 w-64 sm:h-80 sm:w-80">
            <PhotoOrb photo={photos.guava} sizes="320px" eager className="h-full w-full" />
          </Parallax>
          <Parallax speed={-0.18} className="absolute bottom-6 left-2 h-32 w-32 sm:h-40 sm:w-40">
            <PhotoOrb photo={photos.lychee} sizes="160px" eager className="h-full w-full" />
          </Parallax>
          <Parallax speed={0.35} className="absolute left-16 top-0 h-20 w-20">
            <PhotoOrb photo={photos.waxApple} sizes="80px" eager className="h-full w-full" />
          </Parallax>
          <Parallax speed={-0.06} className="absolute bottom-0 right-2 w-64 sm:right-6 sm:w-72">
            <div className="glass rounded-3xl p-5">
              <InSeason />
            </div>
          </Parallax>
        </div>
      </section>

      {/* 數據列 */}
      <section className="mx-auto max-w-6xl px-5">
        <dl className="grid grid-cols-1 border-y border-ink/15 sm:grid-cols-3">
          {[
            ["08", "種代表水果", "從北到南、從山到海"],
            ["12", "個月都有當季", "一年四季不斷檔"],
            ["23.5°", "北回歸線", "穿越嘉義水上"],
          ].map(([num, label, note], i) => (
            <div
              key={label}
              className={`flex items-baseline gap-4 py-7 sm:px-8 ${
                i > 0 ? "border-t border-ink/15 sm:border-l sm:border-t-0" : "sm:pl-0"
              }`}
            >
              <dt className="font-latin text-5xl leading-none">{num}</dt>
              <dd>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-ink-soft">{note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────── 水果索引 ───────── */}
      <section id="index" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-28">
        <SectionHead no="01" label="水果索引" title="八種，值得專程去產地吃的水果。" />
        <ol className="mt-14">
          {fruits.map((fruit, i) => (
            <li
              key={fruit.name}
              className="group grid grid-cols-[3.5rem_1fr] gap-x-5 gap-y-3 border-t border-ink/15 py-8 last:border-b md:grid-cols-[2.5rem_4.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,0.8fr)] md:items-center md:gap-x-8"
            >
              <span className="hidden font-latin text-xl text-ink/40 md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <PhotoOrb
                photo={fruit.photo}
                sizes="80px"
                className="row-span-3 h-14 w-14 transition duration-500 group-hover:-translate-y-1 group-hover:scale-110 md:row-span-1 md:h-[4.5rem] md:w-[4.5rem]"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold md:text-3xl">{fruit.name}</h3>
                <p className="mt-1 font-latin text-lg italic text-ink-soft">{fruit.latin}</p>
              </div>
              <p className="col-start-2 leading-7 text-ink-soft md:col-start-auto">{fruit.desc}</p>
              <dl className="col-start-2 grid grid-cols-[3rem_1fr] gap-y-1 text-sm md:col-start-auto">
                <dt className="text-ink-soft">產地</dt>
                <dd>{fruit.origin}</dd>
                <dt className="text-ink-soft">產季</dt>
                <dd>{formatMonths(fruit.months)}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── 產地特寫 ───────── */}
      <section className="mx-auto max-w-6xl px-5">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-14 sm:py-20"
          style={{ background: "linear-gradient(135deg, #F9B548 0%, #EE7D2B 60%, #D95A22 100%)" }}
        >
          {/* 背景大字捲得最慢，最有「遠景」的感覺 */}
          <Parallax speed={0.35} className="pointer-events-none absolute -bottom-24 -right-8 select-none">
            <span
              aria-hidden
              className="block font-serif text-[22rem] font-black leading-none text-white/15 sm:text-[30rem]"
            >
              芒
            </span>
          </Parallax>
          <div className="relative grid items-center gap-12 md:grid-cols-2">
            <Parallax speed={-0.1} className="flex justify-center">
              <div className="gloss gloss-flat aspect-[4/5] w-full max-w-xs -rotate-3 overflow-hidden rounded-[2rem] ring-8 ring-white/35 sm:max-w-sm">
                {/* 相框往上、照片在框內往下，形成雙層視差 */}
                <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[15%]">
                  <Image
                    src={photos.mango.src}
                    alt="愛文芒果"
                    fill
                    sizes="(min-width: 640px) 384px, 320px"
                    className="object-cover"
                  />
                </Parallax>
              </div>
            </Parallax>
            <div className="glass rounded-3xl p-8 text-ink sm:p-10">
              <p className="text-xs tracking-[0.3em] text-ink/60">產地特寫 — 台南玉井</p>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight sm:text-5xl">
                芒果之鄉的
                <br />
                夏天
              </h2>
              <p className="mt-6 leading-8 text-ink/75">
                玉井被稱為「芒果之鄉」。每年五月到八月，愛文芒果在山谷間成熟，
                果農清晨採收，當天就送進市場與冰店。香氣是它最好認的名片。
              </p>
              <dl className="mt-8 grid grid-cols-3 border-t border-ink/15 pt-5 text-sm">
                <div>
                  <dt className="text-ink/60">產季</dt>
                  <dd className="mt-1 font-latin text-2xl">5–8 月</dd>
                </div>
                <div>
                  <dt className="text-ink/60">品種</dt>
                  <dd className="mt-1 font-serif text-lg font-bold">愛文</dd>
                </div>
                <div>
                  <dt className="text-ink/60">風味</dt>
                  <dd className="mt-1 font-serif text-lg font-bold">濃香甜</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 產季月曆 ───────── */}
      <section id="season" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-28">
        <SectionHead no="02" label="產季月曆" title="什麼時候吃什麼，看這一張就夠。" />
        <div className="mt-14">
          <SeasonCalendar />
        </div>
      </section>

      {/* ───────── 圖輯 ───────── */}
      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-28">
        <SectionHead no="03" label="圖輯" title="切開來，才看得見的顏色。" />
        <div className="mt-14 grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
          {gallery.map(({ photo, span }, i) => (
            <figure
              key={photo.src}
              className={`gloss gloss-flat group overflow-hidden rounded-3xl ${span}`}
            >
              {/* 照片比框高一些，捲動時在框內上下移動 */}
              <Parallax speed={0.06 + (i % 3) * 0.015} className="absolute inset-x-0 -inset-y-[25%]">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(min-width: 768px) 560px, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </Parallax>
              <figcaption className="glass absolute bottom-3 left-3 z-10 rounded-full px-4 py-1.5 font-serif text-sm font-bold">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────── 風土 ───────── */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-28">
        <div className="grid gap-14 border-t border-ink/15 pt-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs tracking-[0.3em] text-ink-soft">
              <span className="font-latin text-sm italic tracking-normal">04</span> — 風土
            </p>
            <Parallax speed={-0.08}>
              <blockquote className="mt-6 font-serif text-3xl font-bold leading-snug sm:text-4xl">
                「好水果不只是種出來的，是這片土地和一代代農人，一起等出來的。」
              </blockquote>
            </Parallax>
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {[
              ["氣候", "橫跨熱帶與亞熱帶，加上高山地形，讓同一座島上能種出截然不同的水果，一年到頭都有當季。"],
              ["育種", "農民與研究單位長年投入品種改良，從金鑽鳳梨到珍珠芭樂，許多品種都是在台灣培育而成。"],
              ["距離", "島嶼不大，產地到城市的距離很近，水果能在接近最佳熟度時採收，新鮮送上餐桌。"],
            ].map(([title, text], i) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] border-b border-ink/15 py-7 first:pt-0">
                <span className="font-latin text-2xl italic text-ink/40">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold">{title}</h3>
                  <p className="mt-2 leading-8 text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

function SectionHead({ no, label, title }: { no: string; label: string; title: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <p className="text-xs tracking-[0.3em] text-ink-soft md:col-span-3 md:pt-3">
        <span className="font-latin text-sm italic tracking-normal">{no}</span> — {label}
      </p>
      <h2 className="font-serif text-3xl font-black leading-tight sm:text-5xl md:col-span-9">{title}</h2>
    </div>
  );
}
