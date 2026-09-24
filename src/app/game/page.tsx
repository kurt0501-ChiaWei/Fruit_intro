import type { Metadata } from "next";
import CatchGame from "@/components/CatchGame";

export const metadata: Metadata = {
  title: "接水果小遊戲｜台灣好果",
  description: "移動籃子，接住從天而降的台灣水果。",
};

export default function GamePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24">
      <header className="grid gap-6 pb-10 pt-16 md:grid-cols-12 md:pt-20">
        <p className="text-xs tracking-[0.3em] text-ink-soft md:col-span-3 md:pt-4">
          <span className="font-latin text-sm italic tracking-normal">Play</span> — 小遊戲
        </p>
        <div className="md:col-span-9">
          <h1 className="font-serif text-4xl font-black leading-tight sm:text-6xl">接住，每一顆好水果。</h1>
          <p className="mt-5 max-w-md leading-8 text-ink-soft">休息一下，來玩接水果。看看你能接住幾顆？</p>
        </div>
      </header>

      <CatchGame />

      <p className="mt-6 text-center text-xs text-ink-soft">本遊戲純屬娛樂，分數不兌換任何獎品或優惠。</p>
    </main>
  );
}
