"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { requestNameEdit, useVisitorName } from "@/lib/visitorName";

/** 固定在右下角（抽獎按鈕上方）的個人化歡迎語 */
export default function Greeting() {
  const name = useVisitorName();
  const pathname = usePathname();

  // 還不知道稱呼、訪客選擇略過，或在遊戲頁（避免擋住籃子）時不顯示
  if (!name || pathname === "/game") return null;

  return (
    <p className="glass greeting-in fixed bottom-[5.25rem] right-5 z-40 flex h-10 max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-full py-1 pl-2 pr-2 text-sm sm:bottom-24 sm:right-8">
      <span
        className="sphere h-6 w-6 shrink-0"
        style={{ "--l": "#FFD37A", "--b": "#F79A2E", "--d": "#C2521C" } as CSSProperties}
      />
      <span className="truncate">
        嗨，<strong className="font-serif text-base font-black">{name}</strong>！歡迎來到台灣好果
      </span>
      <button
        type="button"
        onClick={requestNameEdit}
        className="shrink-0 rounded-full px-3 py-1 text-xs text-ink-soft transition hover:bg-white/70 hover:text-ink"
      >
        修改
      </button>
    </p>
  );
}
