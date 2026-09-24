"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Item = { el: HTMLElement; speed: number; offset: number };

// 所有視差元素共用一個 scroll 監聽與 rAF，避免每個元件各自監聽
const items = new Set<Item>();
let ticking = false;

function update() {
  ticking = false;
  const mid = window.innerHeight / 2;
  for (const item of items) {
    const rect = item.el.getBoundingClientRect();
    // 扣掉目前已套用的位移，取得元素「原本」的位置，避免越算越偏
    const center = rect.top - item.offset + rect.height / 2;
    // 只在元素進出畫面的範圍內移動；離開畫面後就不再累加，避免位移過大把頁面撐長
    const range = mid + rect.height / 2;
    const distance = Math.max(-range, Math.min(range, center - mid));
    item.offset = distance * -item.speed;
    item.el.style.transform = `translate3d(0, ${item.offset.toFixed(1)}px, 0)`;
  }
}

function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

function register(item: Item) {
  if (items.size === 0) {
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }
  items.add(item);
  requestUpdate();
}

function unregister(item: Item) {
  items.delete(item);
  if (items.size === 0) {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
  }
}

type Props = {
  /**
   * 視差強度。正數：比頁面捲得慢，感覺在遠處；負數：比頁面捲得快，感覺在近處。
   * 建議範圍 -0.3 ～ 0.3。
   */
  speed?: number;
  className?: string;
  children: ReactNode;
};

export default function Parallax({ speed = 0.15, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const item: Item = { el, speed, offset: 0 };
    register(item);
    return () => {
      unregister(item);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
