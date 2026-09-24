"use client";

import { useSyncExternalStore } from "react";

const KEY = "visitor-name";
const EDIT_EVENT = "visitor-name:edit";

// undefined = 還沒讀過 localStorage；讀過後快取在這裡，避免每次渲染都去讀
let current: string | null | undefined;
const listeners = new Set<() => void>();

function read(): string | null {
  if (current === undefined) {
    try {
      current = localStorage.getItem(KEY);
    } catch {
      current = null; // 無痕模式或封鎖儲存空間時，當作沒有稱呼
    }
  }
  return current;
}

function notify() {
  listeners.forEach((l) => l());
}

// 在其他分頁修改稱呼時，這個分頁也同步更新
function handleStorage(e: StorageEvent) {
  if (e.key === KEY) {
    current = e.newValue;
    notify();
  }
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function saveVisitorName(name: string) {
  current = name;
  try {
    localStorage.setItem(KEY, name);
  } catch {
    // 存不進去也沒關係，這次瀏覽期間仍然有效
  }
  notify();
}

/**
 * 取得訪客稱呼（存在 localStorage，下次造訪會自動帶出）。
 * - undefined：伺服器端渲染中，還不知道
 * - null：訪客還沒輸入
 * - string：訪客的稱呼
 */
export function useVisitorName() {
  return useSyncExternalStore<string | null | undefined>(subscribe, read, () => undefined);
}

/** 請歡迎視窗重新打開，讓訪客修改稱呼 */
export function requestNameEdit() {
  window.dispatchEvent(new Event(EDIT_EVENT));
}

export function onNameEditRequest(handler: () => void) {
  window.addEventListener(EDIT_EVENT, handler);
  return () => window.removeEventListener(EDIT_EVENT, handler);
}
