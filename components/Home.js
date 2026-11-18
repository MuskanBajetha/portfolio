"use client";
import { useEffect } from "react";
import { useMiso } from "./Shell";
import Hl, { useTyped } from "./Hl";
import { DIALOG, PROFILE } from "../lib/data";

export default function Home() {
  const { state, send, go } = useMiso();
  const intro = state.matches({ story: "intro" });
  const node = DIALOG[state.context.node] || DIALOG.opener;
  const text = state.context.say || node.text;
  const typed = useTyped(intro ? PROFILE.introLine : text);

  const pick = (o) => {
    if (o.boop) send({ type: "BOOP" });
    send({ type: "PICK", next: o.next });
    if (o.nap) setTimeout(() => send({ type: "NAP" }), 900);
    if (o.to) setTimeout(() => go(o.to), 450);
  };
  useEffect(() => {
    const k = (e) => {
      if (e.target.tagName === "INPUT" || intro || e.metaKey || e.ctrlKey) return;
      const i = "abcd".indexOf(e.key.toLowerCase());
      if (i > -1 && node.options[i]) pick(node.options[i]);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }); // eslint-disable-line

  if (intro) return (
    <main className="intro">
      <h1 className="mono"><Hl text={typed} /></h1>
      <button className="pill" onClick={() => send({ type: "CONTINUE" })}>continue ▸</button>
    </main>
  );
  return (
    <main className="chat">
      <section className="say"><span className="tag">&gt; MISO / {node.tag}</span><div className="mono"><Hl text={typed} /></div>
        <button className="skip" onClick={() => go("/work")}>skip the chat → browse everything</button></section>
      <section className="ask" key={state.context.node}><small>you —</small>
        {node.options.map((o, i) => (
          <button key={o.label} style={{ animationDelay: i * 70 + "ms" }} onClick={() => pick(o)}><span>{o.label}</span><kbd>{"ABCD"[i]}</kbd></button>
        ))}
      </section>
    </main>
  );
}
