"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { fruits } from "@/data/fruits";
import { useVisitorName } from "@/lib/visitorName";

const LIVES = 3;
const BONUS_RATE = 0.12; // 發光水果出現機率
const BEST_KEY = "catch-fruit-best";

/* ── 最佳紀錄（localStorage） ── */
let bestCache: number | undefined;
const bestListeners = new Set<() => void>();
function readBest() {
  if (bestCache === undefined) {
    try {
      bestCache = Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      bestCache = 0;
    }
  }
  return bestCache;
}
function saveBest(n: number) {
  bestCache = n;
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    // 存不進去就只在這次有效
  }
  bestListeners.forEach((l) => l());
}
function useBest() {
  return useSyncExternalStore(
    (l) => {
      bestListeners.add(l);
      return () => bestListeners.delete(l);
    },
    readBest,
    () => 0,
  );
}

/* ── 遊戲物件 ── */
type Phase = "ready" | "playing" | "over";
type Drop = { x: number; y: number; r: number; vy: number; img: number; points: number; rot: number; spin: number };
type Pop = { x: number; y: number; text: string; color: string; life: number };
type Game = {
  running: boolean;
  w: number;
  h: number;
  basketX: number;
  targetX: number;
  drops: Drop[];
  pops: Pop[];
  spawnIn: number;
  elapsed: number;
  score: number;
  lives: number;
  left: boolean;
  right: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function CatchGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const game = useRef<Game>({
    running: false, w: 0, h: 0, basketX: 0, targetX: 0, drops: [], pops: [],
    spawnIn: 0, elapsed: 0, score: 0, lives: LIVES, left: false, right: false,
  });

  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [newBest, setNewBest] = useState(false);
  const best = useBest();
  const name = useVisitorName();

  // 預載水果照片（用 Next.js 圖片最佳化縮成小圖，載入比較快）
  useEffect(() => {
    images.current = fruits.map((f) => {
      const img = new Image();
      img.src = `/_next/image?url=${encodeURIComponent(f.photo.src)}&w=128&q=75`;
      return img;
    });
  }, []);

  // 畫布跟著容器大小變化，並處理高解析度螢幕
  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ro = new ResizeObserver(() => {
      const g = game.current;
      const dpr = window.devicePixelRatio || 1;
      g.w = wrap.clientWidth;
      g.h = wrap.clientHeight;
      canvas.width = g.w * dpr;
      canvas.height = g.h * dpr;
      canvas.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!g.running) g.basketX = g.targetX = g.w / 2;
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // 主迴圈：持續繪製；只有 running 時才更新遊戲狀態
  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    // canvas 不認得 CSS 變數，先取出 next/font 實際的字型名稱
    const serif = getComputedStyle(document.documentElement).getPropertyValue("--font-noto-serif").trim() || "serif";
    let raf = 0;
    let last = performance.now();

    function endGame(g: Game) {
      g.running = false;
      setPhase("over");
      if (g.score > readBest()) {
        saveBest(g.score);
        setNewBest(true);
      }
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05); // 切換分頁回來時避免一次跳太多
      last = now;
      const g = game.current;
      const { w, h } = g;
      const basketW = clamp(w * 0.18, 84, 140);
      const basketH = 40;
      const basketTop = h - 26 - basketH;
      const fruitR = clamp(w * 0.034, 18, 28);

      if (g.running) {
        g.elapsed += dt;

        // 鍵盤控制
        if (g.left) g.targetX -= 700 * dt;
        if (g.right) g.targetX += 700 * dt;
        g.targetX = clamp(g.targetX, basketW / 2, w - basketW / 2);
        g.basketX += (g.targetX - g.basketX) * Math.min(1, dt * 18);

        // 產生水果：越玩越快、越密
        g.spawnIn -= dt;
        if (g.spawnIn <= 0) {
          const bonus = Math.random() < BONUS_RATE;
          g.drops.push({
            x: fruitR + Math.random() * (w - fruitR * 2),
            y: -fruitR,
            r: bonus ? fruitR * 1.1 : fruitR,
            vy: Math.min(160 + g.elapsed * 7, 560) * (0.85 + Math.random() * 0.3),
            img: Math.floor(Math.random() * fruits.length),
            points: bonus ? 3 : 1,
            rot: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 3,
          });
          g.spawnIn = Math.max(0.36, 1.05 - g.elapsed * 0.014);
        }

        // 移動、接住、漏接
        for (let i = g.drops.length - 1; i >= 0; i--) {
          const d = g.drops[i];
          d.y += d.vy * dt;
          d.rot += d.spin * dt;
          const caught =
            d.y + d.r >= basketTop && d.y - d.r <= basketTop + 14 && Math.abs(d.x - g.basketX) <= basketW / 2 + d.r * 0.3;
          if (caught) {
            g.score += d.points;
            setScore(g.score);
            g.pops.push({ x: d.x, y: basketTop - 10, text: `+${d.points}`, color: d.points > 1 ? "#D2601F" : "#1c2a22", life: 1 });
            g.drops.splice(i, 1);
          } else if (d.y - d.r > h) {
            g.lives -= 1;
            setLives(g.lives);
            g.pops.push({ x: d.x, y: h - 20, text: "×", color: "#DF3549", life: 1 });
            g.drops.splice(i, 1);
            if (g.lives <= 0) endGame(g);
          }
        }
      }

      for (const p of g.pops) {
        p.life -= dt * 1.4;
        p.y -= 40 * dt;
      }
      g.pops = g.pops.filter((p) => p.life > 0);

      draw(ctx, g, { basketW, basketH, basketTop }, images.current, serif);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 鍵盤 ← → / A D
  useEffect(() => {
    if (phase !== "playing") return;
    const set = (e: KeyboardEvent, down: boolean) => {
      const g = game.current;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") g.left = down;
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") g.right = down;
      else return;
      e.preventDefault(); // 避免方向鍵捲動頁面
    };
    const onDown = (e: KeyboardEvent) => set(e, true);
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [phase]);

  function start() {
    const g = game.current;
    Object.assign(g, {
      running: true, drops: [], pops: [], spawnIn: 0.4, elapsed: 0, score: 0, lives: LIVES,
      left: false, right: false, basketX: g.w / 2, targetX: g.w / 2,
    });
    setScore(0);
    setLives(LIVES);
    setNewBest(false);
    setPhase("playing");
  }

  function moveTo(clientX: number) {
    const rect = canvasRef.current!.getBoundingClientRect();
    game.current.targetX = clientX - rect.left;
  }

  return (
    <div>
      {/* 計分列 */}
      <div className="mb-4 flex items-center justify-between gap-4 text-sm">
        <div className="flex items-baseline gap-2">
          <span className="text-ink-soft">得分</span>
          <span className="font-latin text-4xl leading-none">{score}</span>
        </div>
        <div className="flex items-center gap-1.5" aria-label={`剩下 ${lives} 條命`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <span
              key={i}
              className={`sphere h-5 w-5 transition ${i < lives ? "" : "opacity-20 grayscale"}`}
              style={{ "--l": "#FFA3A3", "--b": "#DF3549", "--d": "#86132C" } as CSSProperties}
            />
          ))}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-ink-soft">最佳</span>
          <span className="font-latin text-2xl leading-none">{best}</span>
        </div>
      </div>

      {/* 遊戲區 */}
      <div
        ref={wrapRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-b from-[#fdf6e8] via-[#f7ead3] to-[#efdcbc] sm:aspect-[16/10]"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={(e) => moveTo(e.clientX)}
          onPointerDown={(e) => moveTo(e.clientX)}
          className={`absolute inset-0 h-full w-full ${phase === "playing" ? "cursor-none touch-none" : ""}`}
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/10 p-5">
            <div className="glass w-full max-w-sm rounded-3xl px-7 py-8 text-center">
              {phase === "ready" ? (
                <>
                  <p className="text-xs tracking-[0.3em] text-ink-soft">小遊戲</p>
                  <h2 className="mt-3 font-serif text-3xl font-black">接水果</h2>
                  <ul className="mt-5 space-y-2 text-left text-sm leading-6 text-ink-soft">
                    <li>— 移動滑鼠、手指，或用鍵盤 ← → 控制籃子</li>
                    <li>— 接到一顆水果 +1 分，發光的水果 +3 分</li>
                    <li>— 漏接 {LIVES} 顆就結束，越後面掉得越快</li>
                  </ul>
                  <GameButton onClick={start}>開始遊戲</GameButton>
                </>
              ) : (
                <>
                  <p className="text-xs tracking-[0.3em] text-ink-soft">遊戲結束</p>
                  <p className="mt-3 font-serif text-lg font-bold">{name ? `${name}，你接到了` : "你接到了"}</p>
                  <p className="mt-1 font-latin text-7xl leading-none">{score}</p>
                  <p className="mt-1 text-sm text-ink-soft">分</p>
                  {newBest && (
                    <p className="mt-3 inline-block rounded-full bg-[#F79A2E] px-4 py-1 text-xs font-medium text-white">
                      新紀錄！
                    </p>
                  )}
                  <GameButton onClick={start}>再玩一次</GameButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GameButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      autoFocus
      className="mt-7 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition hover:bg-ink/85"
    >
      {children}
    </button>
  );
}

/* ── 繪圖 ── */
function draw(
  ctx: CanvasRenderingContext2D,
  g: Game,
  b: { basketW: number; basketH: number; basketTop: number },
  imgs: HTMLImageElement[],
  serif: string,
) {
  const { w, h } = g;
  ctx.clearRect(0, 0, w, h);

  // 地面
  ctx.fillStyle = "rgba(28, 42, 34, 0.08)";
  ctx.fillRect(0, h - 22, w, 22);

  // 水果
  for (const d of g.drops) {
    ctx.save();
    ctx.translate(d.x, d.y);

    if (d.points > 1) {
      // 發光外圈
      ctx.shadowColor = "rgba(247, 154, 46, 0.9)";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(0, 0, d.r + 3, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD37A";
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.shadowColor = "rgba(40, 30, 20, 0.25)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;
    }

    ctx.save();
    ctx.rotate(d.rot);
    ctx.beginPath();
    ctx.arc(0, 0, d.r, 0, Math.PI * 2);
    const img = imgs[d.img];
    ctx.fillStyle = fruits[d.img].colors[1];
    if (img?.complete && img.naturalWidth) {
      ctx.fill(); // 先畫陰影
      ctx.shadowColor = "transparent";
      ctx.clip();
      ctx.drawImage(img, -d.r, -d.r, d.r * 2, d.r * 2);
    } else {
      ctx.fill();
    }
    ctx.restore();

    // 亮面反光（不要陰影）
    ctx.shadowColor = "transparent";
    const grad = ctx.createLinearGradient(0, -d.r, 0, -d.r * 0.2);
    grad.addColorStop(0, "rgba(255,255,255,0.85)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(-d.r * 0.25, -d.r * 0.5, d.r * 0.42, d.r * 0.24, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 籃子
  const { basketW: bw, basketH: bh, basketTop: top } = b;
  const x = g.basketX - bw / 2;
  ctx.save();
  ctx.shadowColor = "rgba(28, 42, 34, 0.3)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;
  ctx.beginPath();
  ctx.moveTo(x, top);
  ctx.lineTo(x + bw, top);
  ctx.lineTo(x + bw - 12, top + bh - 10);
  ctx.quadraticCurveTo(x + bw - 14, top + bh, x + bw - 26, top + bh);
  ctx.lineTo(x + 26, top + bh);
  ctx.quadraticCurveTo(x + 14, top + bh, x + 12, top + bh - 10);
  ctx.closePath();
  const body = ctx.createLinearGradient(0, top, 0, top + bh);
  body.addColorStop(0, "#3a4d40");
  body.addColorStop(1, "#1c2a22");
  ctx.fillStyle = body;
  ctx.fill();
  ctx.restore();
  // 編織紋路
  ctx.strokeStyle = "rgba(243, 238, 228, 0.18)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 3; i++) {
    const y = top + (bh / 3) * i;
    const inset = 12 * (i / 3);
    ctx.beginPath();
    ctx.moveTo(x + inset + 4, y);
    ctx.lineTo(x + bw - inset - 4, y);
    ctx.stroke();
  }
  // 籃口
  ctx.fillStyle = "#F79A2E";
  ctx.beginPath();
  ctx.roundRect(x - 4, top - 5, bw + 8, 8, 4);
  ctx.fill();

  // 得分飄字
  ctx.textAlign = "center";
  ctx.font = `900 22px ${serif}`;
  for (const p of g.pops) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}
