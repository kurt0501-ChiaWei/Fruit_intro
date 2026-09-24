"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { fruits } from "@/data/fruits";
import PhotoOrb from "./PhotoOrb";

/** 中獎機率：10% */
const WIN_RATE = 0.1;

type Phase = "idle" | "spinning" | "win" | "lose";
type Confetti = { left: number; delay: number; duration: number; color: string; rotate: number };

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 去掉容易看錯的 0/O、1/I
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `FRUIT90-${s}`;
}

export default function LuckyDraw() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [current, setCurrent] = useState(0);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const onGamePage = usePathname() === "/game";

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  function open() {
    setPhase("idle");
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    clearTimers();
    setPhase("idle");
    setCopied(false);
    setConfetti([]);
  }

  function draw() {
    clearTimers();
    setPhase("spinning");
    setCopied(false);
    setConfetti([]);

    // 水果照片輪播，間隔越來越長，像轉盤慢慢停下
    let elapsed = 0;
    let delay = 60;
    let index = current;
    while (elapsed < 2200) {
      elapsed += delay;
      index = (index + 1) % fruits.length;
      const i = index;
      timers.current.push(window.setTimeout(() => setCurrent(i), elapsed));
      delay *= 1.12;
    }

    const win = Math.random() < WIN_RATE;
    timers.current.push(
      window.setTimeout(() => {
        if (win) {
          setCode(makeCode());
          setConfetti(
            Array.from({ length: 40 }, () => ({
              left: Math.random() * 100,
              delay: Math.random() * 0.4,
              duration: 1.6 + Math.random() * 1.2,
              color: fruits[Math.floor(Math.random() * fruits.length)].colors[1],
              rotate: Math.random() * 360,
            })),
          );
        }
        setPhase(win ? "win" : "lose");
      }, elapsed + 300),
    );
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // 瀏覽器不允許存取剪貼簿時，使用者仍可手動選取文字
    }
  }

  const fruit = fruits[current];

  return (
    <>
      {/* 右下角浮動按鈕（遊戲頁隱藏，避免擋住籃子） */}
      {!onGamePage && (
        <button
          type="button"
          onClick={open}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-sm font-medium text-paper shadow-xl shadow-ink/25 transition hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
        >
          <span className="relative flex h-9 w-9">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#F79A2E]/60" />
            <span className="sphere relative h-9 w-9" style={{ "--l": "#FFD37A", "--b": "#F79A2E", "--d": "#C2521C" } as CSSProperties} />
          </span>
          抽水果優惠
        </button>
      )}

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-labelledby="lucky-title"
        className="pop-dialog glass m-auto bg-paper/80 w-[min(92vw,420px)] overflow-hidden rounded-[2rem] p-0 text-ink backdrop:bg-ink/45"
      >
        <div className="relative px-7 pb-8 pt-7 text-center">
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-ink-soft transition hover:bg-white/60 hover:text-ink"
          >
            ×
          </button>

          <p className="text-xs tracking-[0.3em] text-ink-soft">今日水果抽獎</p>
          <h2 id="lucky-title" className="mt-3 font-serif text-3xl font-black">
            {phase === "win" ? "恭喜中獎！" : phase === "lose" ? "差一點點！" : "轉一顆好運水果"}
          </h2>

          {/* 水果轉盤：八顆照片疊在一起，只顯示目前這一顆 */}
          <div className="relative mx-auto mt-7 h-40 w-40">
            {fruits.map((f, i) => (
              <PhotoOrb
                key={f.name}
                photo={f.photo}
                sizes="160px"
                className={`absolute inset-0 h-40 w-40 transition-opacity duration-100 ${
                  i === current ? "opacity-100" : "opacity-0"
                } ${phase === "win" && i === current ? "scale-105" : ""}`}
              />
            ))}
          </div>
          <p className="mt-4 font-serif text-lg font-bold">{fruit.name}</p>

          {phase === "idle" && (
            <>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                每次抽獎有 <strong className="text-ink">10%</strong> 機會
                <br />
                獲得全站水果 <strong className="text-ink">9 折</strong>優惠券
              </p>
              <DrawButton onClick={draw}>開始抽獎</DrawButton>
            </>
          )}

          {phase === "spinning" && <p className="mt-3 text-sm text-ink-soft">抽獎中⋯⋯</p>}

          {phase === "win" && (
            <>
              <div className="mt-6 rounded-2xl border-2 border-dashed border-[#E4892B]/60 bg-white/55 px-5 py-5">
                <p className="text-xs tracking-[0.3em] text-ink-soft">水果優惠券</p>
                <p className="mt-1 font-serif text-5xl font-black text-[#D2601F]">9 折</p>
                <p className="mt-3 select-all font-mono text-lg tracking-widest">{code}</p>
              </div>
              <p className="mt-3 text-xs text-ink-soft">結帳時輸入優惠碼即可使用</p>
              <DrawButton onClick={copyCode}>{copied ? "已複製 ✓" : "複製優惠碼"}</DrawButton>
            </>
          )}

          {phase === "lose" && (
            <>
              <p className="mt-3 text-sm leading-7 text-ink-soft">這次沒有抽中，但當季水果一樣甜。</p>
              <DrawButton onClick={draw}>再抽一次</DrawButton>
            </>
          )}

          {/* 中獎彩帶 */}
          {confetti.map((c, i) => (
            <span
              key={i}
              aria-hidden
              className="confetti"
              style={{
                left: `${c.left}%`,
                background: c.color,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
                rotate: `${c.rotate}deg`,
              }}
            />
          ))}
        </div>
      </dialog>
    </>
  );
}

function DrawButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition hover:bg-ink/85"
    >
      {children}
    </button>
  );
}
