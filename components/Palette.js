"use client";
import { useEffect, useRef, useState } from "react";
import { useMiso } from "./Shell";
import { PROFILE } from "../lib/data";

export default function Palette() {
  const { send, go } = useMiso();
  const [open, setOpen] = useState(false), [q, setQ] = useState(""), ref = useRef(null);
  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => { if (open) { setQ(""); setTimeout(() => ref.current?.focus(), 0); } }, [open]);
  const cmds = [
    ["Go home", () => go("/")], ["Open builds", () => go("/work")], ["Open stack", () => go("/stack")], ["Open about", () => go("/about")], ["Open lab", () => go("/lab")],
    ["Boop Miso", () => send({ type: "BOOP" })], ["Put Miso to sleep", () => send({ type: "NAP" })],
    ["Copy email", () => navigator.clipboard?.writeText(PROFILE.email)],
    ["Open GitHub", () => window.open(PROFILE.github, "_blank")], ["Open LinkedIn", () => window.open(PROFILE.linkedin, "_blank")],
  ].map(([label, run]) => ({ label, run }));
  const hire = q.trim().toLowerCase() === PROFILE.hireCommand.toLowerCase();
  const list = hire ? [{ label: "▶ " + PROFILE.hireCommand, run: () => { go("/about"); send({ type: "SAY", say: `Excellent decision. Email *${PROFILE.email}*. I'll pretend I didn't see anything.` }); } }]
    : cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  const exec = (c) => { c?.run(); setOpen(false); };
  if (!open) return null;
  return (
    <div className="overlay" onClick={() => setOpen(false)}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input ref={ref} value={q} placeholder='> type a command (try "sudo hire")' onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && exec(list[0])} />
        {list.map((c) => <button key={c.label} onClick={() => exec(c)}>{c.label}</button>)}
        {!list.length && <p className="muted">Nothing. Miso shrugs.</p>}
      </div>
    </div>
  );
}
