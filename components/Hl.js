"use client";
import { useEffect, useState } from "react";
// Renders "*highlight*" markup and types it out.
export function useTyped(text, speed = 16) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed); return () => clearInterval(id); }, [text, speed]);
  return text.slice(0, n);
}
export default function Hl({ text }) {
  return text.split("\n\n").map((para, i) => (
    <p key={i}>{para.split("*").map((s, j) => (j % 2 ? <em key={j}>{s}</em> : s))}</p>
  ));
}
