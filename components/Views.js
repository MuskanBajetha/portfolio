"use client";
import { useEffect, useState } from "react";
import { useMiso } from "./Shell";
import { VIEWS, PROJECTS, STACK, ABOUT, LAB, PROFILE } from "../lib/data";
import Hl, { useTyped } from "./Hl";

function Head({ v, count }) {
  return (<header className="vhead"><p className="kicker">{v.kicker}</p><h1>{v.title}</h1>{count && <p className="count">{count}</p>}</header>);
}
function Aside({ text, k }) {
  const t = useTyped(text, 10);
  return (<aside className="aside" key={k}><b>MISO</b><p className="mono">{t}</p></aside>);
}
function Finish() {
  const { go } = useMiso();
  return <button className="finish" onClick={() => go("/")}>Finish track</button>;
}

function Work() {
  const [h, setH] = useState(0);
  const pad = String(PROJECTS.length).padStart(2, "0");
  return (<>
    <Head v={VIEWS.work} count={`${pad} builds indexed`} />
    <div className="split">
      <div className="list">
        {PROJECTS.map((p, i) => (
          <article key={p.name} tabIndex={0} className={`proj ${h === i ? "on" : ""}`} onMouseEnter={() => setH(i)} onFocus={() => setH(i)} onClick={() => setH(i)}>
            <h3>{p.name}</h3><p>{p.tagline}</p>
            <div className="reveal"><div>
              <div className="shot">{p.image ? <img src={p.image} alt={p.name} /> : <span>{p.name.split(" ").map((w) => w[0]).join("")}</span>}</div>
              <a href={p.link} target="_blank" rel="noreferrer">↗ {p.linkLabel}</a>
            </div></div>
            <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
      <Aside k={h} text={PROJECTS[h].take} />
    </div>
  </>);
}

function Stack() {
  const [g, setG] = useState(0);
  return (<>
    <Head v={VIEWS.stack} count={`${STACK.length} layers loaded`} />
    <div className="split"><div className="list">
      {STACK.map((s, i) => (
        <article key={s.group} className={`proj on-lite ${g === i ? "on" : ""}`} onMouseEnter={() => setG(i)}>
          <h3>{s.group}</h3><div className="chips big">{s.items.map((t) => <span key={t} style={{ letterSpacing: "0.06em" }}>{t}</span>)}</div>
        </article>))}
    </div><Aside k={g} text={`${STACK[g].group}: ${STACK[g].items.join(", ")}.`} /></div>
  </>);
}


function About() {
  const [open, setOpen] = useState(0), [copied, setCopied] = useState(false);
  const rows = (arr) => arr.map((e, i) => (<article key={i} className="row"><span className="when">{e.when}</span><div><h3>{e.role}</h3><p>{e.desc}</p></div></article>));
  return (<>
    <Head v={VIEWS.about} />
    <div className="split"><div className="list">
      <p className="bio">{ABOUT.bio}</p>
      <h4 className="sub">Experience</h4>{rows(ABOUT.experience)}
      <h4 className="sub">Education</h4>{rows(ABOUT.education)}
      <h4 className="sub">Questions</h4>
      {ABOUT.faq.map((f, i) => (<article key={i} className={`faq ${open === i ? "on" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}><h3>{f.q}<span>{open === i ? "–" : "+"}</span></h3><div className="reveal"><div><p>{f.a}</p></div></div></article>))}
      <h4 className="sub" id="contact">Contact</h4>
      <div className="chips big links">
        <a onClick={() => { navigator.clipboard?.writeText(PROFILE.email); setCopied(true); }}>{copied ? "✓ copied" : PROFILE.email}</a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
    </div><Aside k="a" text={VIEWS.about.line} /></div>
  </>);
}

function Lab() {
  const { state, send } = useMiso();
  const [s, setS] = useState(0);
  useEffect(() => { const id = setInterval(() => setS((v) => v + 1), 1000); return () => clearInterval(id); }, []);
  return (<>
    <Head v={VIEWS.lab} />
    <div className="split"><div className="list">
      <article className="proj on"><h3>Boop counter</h3><p className="big">{String(state.context.boops).padStart(3, "0")}</p><div className="chips"><span onClick={() => send({ type: "BOOP" })} style={{ cursor: "pointer" }}>boop ▸</span><span onClick={() => send({ type: "NAP" })} style={{ cursor: "pointer" }}>put to sleep ▸</span></div></article>
      <article className="proj"><h3>Session uptime</h3><p className="big">{String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}</p></article>
      <article className="proj"><h3>Miso's house rules</h3>{LAB.rules.map((r) => <p key={r}>▸ {r}</p>)}</article>
      <article className="proj"><h3>Hidden things</h3><p>Ignore Miso for 30 seconds. Press <kbd>⌘K</kbd> and type <code>{PROFILE.hireCommand}</code>.</p></article>
    </div><Aside k="l" text={VIEWS.lab.line} /></div>
  </>);
}

const MAP = { work: Work, stack: Stack, about: About, lab: Lab };
export default function View({ name }) {
  const C = MAP[name];
  return (<main className="view"><C /><Finish /></main>);
}
