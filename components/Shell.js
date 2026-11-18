"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMachine } from "@xstate/react";
import { storyMachine } from "../lib/machine";
import Creature from "./Creature";
import Palette from "./Palette";

const Ctx = createContext(null);
export const useMiso = () => useContext(Ctx);

function Fx() {
  const [dots, setDots] = useState([]);
  const [p, setP] = useState({ x: -99, y: -99 });
  useEffect(() => {
    setDots(Array.from({ length: 64 }, () => ({ l: Math.random() * 100, t: Math.random() * 100, s: 2 + Math.random() * 3, d: 3.5 + Math.random() * 5, o: Math.random() * 4 })));
    const m = (e) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", m); return () => window.removeEventListener("pointermove", m);
  }, []);
  return (<>
    <div className="dots" aria-hidden>{dots.map((d, i) => <span key={i} style={{ left: d.l + "%", top: d.t + "%", width: d.s, height: d.s, animationDuration: d.d + "s", animationDelay: d.o + "s" }} />)}</div>
    <div className="reticle" aria-hidden style={{ transform: `translate(${p.x - 15}px,${p.y - 15}px)` }}><i /></div>
  </>);
}

export default function Shell({ children }) {
  const [state, send] = useMachine(storyMachine);
  const path = usePathname(), router = useRouter();
  const home = path === "/";
  const intro = home && state.matches({ story: "intro" });
  const asleep = state.matches({ presence: "asleep" });
  const mode = intro ? "center" : home ? "bl" : "tr";
  const go = (to) => router.push(to);

  useEffect(() => { if (home && state.matches({ story: "view" })) send({ type: "ROUTE_HOME" }); }, [path]); // eslint-disable-line
  useEffect(() => {
    let t = 0;
    const h = () => { const n = Date.now(); if (n - t > 1500) { t = n; send({ type: "ACTIVITY" }); } };
    window.addEventListener("pointermove", h); window.addEventListener("keydown", h);
    return () => { window.removeEventListener("pointermove", h); window.removeEventListener("keydown", h); };
  }, [send]);

  const mood = asleep ? "sleeping" : state.context.boops > 5 ? "overstimulated" : !home ? "focused" : state.context.node === "browsing" ? "unbothered" : "caffeinated";

  return (
    <Ctx.Provider value={{ state, send, go, mood, asleep }}>
      <Fx />
      <button className="kbd" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}>⌘K</button>
      <Creature mode={mode} asleep={asleep} boops={state.context.boops} onBoop={() => send({ type: "BOOP" })} />
      {home && !intro && (
        <div className="panel">
          <div className="status"><i className={asleep ? "z" : mood === "unbothered" ? "p" : ""} />{mood}</div>
          <button onClick={() => send({ type: "RESET" })}>intro ↺</button>
          <button onClick={() => send({ type: "SAY", say: "Click me to *boop*. Press *⌘K* for commands. Keys *A–D* answer questions." })}>help ?</button>
        </div>
      )}
      {children}
      <Palette />
    </Ctx.Provider>
  );
}
