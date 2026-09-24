"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { fruits } from "@/data/fruits";
import { onNameEditRequest, saveVisitorName, useVisitorName } from "@/lib/visitorName";
import PhotoOrb from "./PhotoOrb";

const MAX_LENGTH = 20;

/** 第一次造訪時跳出，請訪客輸入稱呼 */
export default function WelcomeName() {
  const name = useVisitorName();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dismissed = useRef(false);
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);

  // 還沒有稱呼（且這次沒按過「先逛逛」）就打開視窗
  useEffect(() => {
    if (name === null && !dismissed.current && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [name]);

  // 首頁的「修改」按鈕會請這個視窗重新打開
  useEffect(
    () =>
      onNameEditRequest(() => {
        setEditing(true);
        setValue(name ?? "");
        dialogRef.current?.showModal();
      }),
    [name],
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    saveVisitorName(trimmed);
    dialogRef.current?.close();
  }

  function skip() {
    dismissed.current = true;
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        dismissed.current = true;
        setEditing(false);
      }}
      aria-labelledby="welcome-title"
      className="pop-dialog glass m-auto w-[min(92vw,440px)] overflow-hidden rounded-[2rem] bg-paper/80 p-0 text-ink backdrop:bg-ink/45"
    >
      <form onSubmit={handleSubmit} className="px-7 pb-8 pt-9 text-center sm:px-9">
        {/* 三顆水果照片疊在一起，當作歡迎插圖 */}
        <div className="flex justify-center -space-x-4">
          {[fruits[0], fruits[3], fruits[6]].map((f, i) => (
            <PhotoOrb
              key={f.name}
              photo={f.photo}
              sizes="64px"
              className={`h-16 w-16 ring-4 ring-paper ${i === 1 ? "z-10 -translate-y-2" : ""}`}
            />
          ))}
        </div>

        <p className="mt-6 text-xs tracking-[0.3em] text-ink-soft">
          {editing ? "修改稱呼" : "歡迎來到台灣好果"}
        </p>
        <h2 id="welcome-title" className="mt-3 font-serif text-3xl font-black leading-snug">
          {editing ? "想怎麼稱呼你？" : "先認識一下，你是？"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">留下你的稱呼，我們會在網站上歡迎你。</p>

        <label htmlFor="visitor-name" className="sr-only">
          你的稱呼
        </label>
        <input
          id="visitor-name"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX_LENGTH}
          placeholder="例如：小明、Amy"
          autoComplete="nickname"
          autoFocus
          className="mt-6 w-full rounded-full border border-ink/15 bg-white/70 px-6 py-3.5 text-center text-lg outline-none transition placeholder:text-ink/30 focus:border-ink/40 focus:bg-white"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          className="mt-4 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:bg-ink/30"
        >
          {editing ? "儲存" : "開始逛逛"}
        </button>
        <button
          type="button"
          onClick={skip}
          className="mt-3 text-sm text-ink-soft underline-offset-4 transition hover:text-ink hover:underline"
        >
          {editing ? "取消" : "先不用，直接看看"}
        </button>
      </form>
    </dialog>
  );
}
