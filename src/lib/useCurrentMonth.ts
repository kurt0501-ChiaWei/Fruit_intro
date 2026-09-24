"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** 回傳瀏覽器當下的月份（1–12）；伺服器端渲染時為 null，避免顯示成建置當天的月份 */
export function useCurrentMonth() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getMonth() + 1,
    () => null,
  );
}
