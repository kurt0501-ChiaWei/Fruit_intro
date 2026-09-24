"use server";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SignupState = {
  status: "idle" | "success" | "duplicate" | "error";
  message: string;
  /** 送出失敗時帶回輸入值，避免表單被清空 */
  email: string;
};

type Entry = { email: string; createdAt: string };

// 登記資料存在專案根目錄的 data/ 底下（不在 public/，外部無法直接下載）
const FILE = path.join(process.cwd(), "data", "order-requests.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readEntries(): Promise<Entry[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return []; // 檔案還不存在
  }
}

export async function registerOrderInterest(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  // 前端已經有檢查，但伺服器端一定要再驗證一次
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", message: "e-mail 格式好像不太對，再檢查一下？", email };
  }

  try {
    const entries = await readEntries();
    if (entries.some((e) => e.email === email)) {
      return { status: "duplicate", message: "這個 e-mail 已經登記過了，產季一到就會通知你。", email };
    }
    entries.push({ email, createdAt: new Date().toISOString() });
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(entries, null, 2), "utf8");
  } catch (err) {
    console.error("儲存訂購登記失敗", err);
    return { status: "error", message: "系統忙碌中，請稍後再試一次。", email };
  }

  return { status: "success", message: "登記成功！當季水果開放訂購時，我們會寄信通知你。", email };
}
