"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "worklancer:chatUnread";

type Listener = (total: number) => void;

const listeners = new Set<Listener>();

function readTotal(): number {
  if (typeof window === "undefined") return 0;

  const raw = window.localStorage.getItem(STORAGE_KEY);

  const parsed = raw ? Number(JSON.parse(raw)) : 0;

  return Number.isFinite(parsed) ? parsed : 0;
}

function writeTotal(total: number) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(total)
  );

  listeners.forEach((listener) => listener(total));
}

export function setChatUnreadTotal(total: number) {
  writeTotal(Math.max(0, Math.floor(total)));
}

export function getChatUnreadTotal(): number {
  return readTotal();
}

export function useChatUnreadTotal(): number {
  const [total, setTotal] = useState(() => readTotal());

  useEffect(() => {
    const listener: Listener = (value) => setTotal(value);

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return total;
}
