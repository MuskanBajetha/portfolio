"use client";
import { useEffect, useRef, useState } from "react";

export default function Creature({ mode, asleep, boops, onBoop }) {
  const ref = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
      setLook({ x: (dx / d) * 3.2, y: (dy / d) * 2.6 });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className={`mascot ${mode} ${asleep ? "asleep" : ""}`}>
      <button ref={ref} className="orbbtn" aria-label="Boop Miso" onClick={onBoop}>
        <div key={boops} className={boops ? "squish" : ""}>
          <svg className="orb" viewBox="0 0 100 112" width="96" height="108">
            <defs><radialGradient id="g" cx="40%" cy="35%" r="75%"><stop offset="0" stopColor="#4a2616" /><stop offset="1" stopColor="#1a0e09" /></radialGradient></defs>
            <ellipse cx="50" cy="106" rx="26" ry="4" fill="#ff7a45" opacity=".12" />
            <path d="M50 24 Q50 12 57 8" stroke="#ff7a45" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="57.5" cy="7" r="3" fill="#ff7a45" />
            <circle cx="50" cy="60" r="35" fill="url(#g)" stroke="#ff7a45" strokeWidth="3" />
            <ellipse cx="76" cy="100" rx="4" ry="5.5" fill="none" stroke="#ff7a45" strokeWidth="2" />
            {asleep ? (<g stroke="#e9d5c8" strokeWidth="2.4" strokeLinecap="round" fill="none"><path d="M32 60q6 4 12 0" /><path d="M56 60q6 4 12 0" /></g>) : (
              <g transform={`translate(${look.x} ${look.y})`}>
                <rect x="34" y="51.5" width="10" height="14" rx="3.4" fill="#120b08" /><rect x="56" y="51.5" width="10" height="14" rx="3.4" fill="#120b08" />
                <rect x="37" y="54" width="3" height="3.4" rx="1.2" fill="#fff" /><rect x="59" y="54" width="3" height="3.4" rx="1.2" fill="#fff" />
              </g>)}
            <ellipse cx="29" cy="71" rx="5" ry="3" fill="#ff7a45" opacity=".35" /><ellipse cx="71" cy="71" rx="5" ry="3" fill="#ff7a45" opacity=".35" />
          </svg>
        </div>
        {asleep && <span className="zzz">z<i>z</i><b>z</b></span>}
      </button>
    </div>
  );
}
