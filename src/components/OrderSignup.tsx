"use client";

import { useActionState } from "react";
import { registerOrderInterest, type SignupState } from "@/app/actions/orderInterest";
import { photos } from "@/data/photos";
import PhotoOrb from "./PhotoOrb";

const initial: SignupState = { status: "idle", message: "", email: "" };

/** 頁面下方的訂購登記區：訪客留下 e-mail，產季開賣時通知 */
export default function OrderSignup() {
  const [state, formAction, pending] = useActionState(registerOrderInterest, initial);
  const done = state.status === "success" || state.status === "duplicate";

  return (
    <section id="order" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-8 pt-4">
      <div className="relative">
        {/* 玻璃卡後面的照片球，讓玻璃有東西可以透 */}
        <PhotoOrb photo={photos.mango} sizes="224px" className="absolute -left-4 -top-10 h-40 w-40 sm:h-56 sm:w-56" />
        <PhotoOrb photo={photos.lychee} sizes="160px" className="absolute -bottom-8 right-6 h-28 w-28 sm:h-40 sm:w-40" />

        <div className="glass relative grid gap-10 rounded-[2.5rem] px-6 py-12 sm:px-12 sm:py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-ink-soft">
              <span className="font-latin text-sm italic tracking-normal">Order</span> — 訂購登記
            </p>
            <h2 className="mt-4 font-serif text-3xl font-black leading-tight sm:text-4xl">
              想吃當季水果？
              <br />
              產季一到就通知你。
            </h2>
            <p className="mt-4 leading-8 text-ink-soft">
              留下 e-mail，當季水果開放訂購時，我們會第一時間寄信給你。
            </p>
          </div>

          <div>
            {done ? (
              <div role="status" className="rounded-3xl bg-white/60 px-6 py-8 text-center">
                <p className="font-serif text-2xl font-black">{state.status === "success" ? "謝謝你！" : "已經登記囉"}</p>
                <p className="mt-3 leading-7 text-ink-soft">{state.message}</p>
              </div>
            ) : (
              <form action={formAction}>
                <label htmlFor="order-email" className="text-sm font-medium">
                  你的 e-mail
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="order-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    defaultValue={state.email}
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    aria-invalid={state.status === "error"}
                    aria-describedby="order-help"
                    className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white/75 px-6 py-3.5 outline-none transition placeholder:text-ink/30 focus:border-ink/40 focus:bg-white aria-invalid:border-[#DF3549]"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition hover:bg-ink/85 disabled:cursor-wait disabled:bg-ink/50"
                  >
                    {pending ? "登記中⋯" : "登記通知"}
                  </button>
                </div>
                <p
                  id="order-help"
                  role={state.status === "error" ? "alert" : undefined}
                  className={`mt-3 text-sm ${state.status === "error" ? "text-[#C42A3E]" : "text-ink-soft"}`}
                >
                  {state.status === "error" ? state.message : "我們只會用這個 e-mail 通知訂購資訊，不會寄送其他廣告。"}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
