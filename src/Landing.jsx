import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Clock, Move, Mail, Linkedin, Twitter } from "lucide-react";

/* ------------------------------------------------------------------ *
 *  EDIT ME  —  content, links, and the draggable placeholders below.
 * ------------------------------------------------------------------ */
const CONFIG = {
  name: "Gopi Bhatnagar",
  email: "hello@gopibhatnagar.com", // ← change me
  socials: { linkedin: "#", twitter: "#" }, // ← add your URLs
  timeZone: "Asia/Kolkata",
  tzLabel: "GMT+5:30",
  location: "Chennai", // ← shown in the footer "Currently"
  lastUpdated: "July 2026", // ← footer "Last updated"
  title: "Design Builder.",
  titleLine2: "Partly in canvas, rest in codebase.",
  ideology: [
    "I care about craft more than category. Whether it's a Figma frame or a component in the codebase, I sweat the same details — the easing on a transition, the tension in a wordmark, the reason a flow feels effortless when nobody can say why.",
    "Good work is mostly patience: the unglamorous back-and-forth of making something feel obvious. I like living close to the pixels and close to the code, because that's where the craft actually happens.",
  ],

  experience: [
    { name: "Razorpay", color: "#3395FF", initial: "R", year: "2023 — NOW" },
    { name: "Scaler", color: "#4B47E5", initial: "S", year: "2022 — 2023" },
    { name: "Kidzovo", color: "#F5A623", initial: "K", year: "2022" },
    { name: "TCS", color: "#E4181C", initial: "T", year: "2021" },
    { name: "Wongdoody", color: "#FF4E7A", initial: "W", year: "2021" },
    { name: "Ciena", color: "#00998F", initial: "C", year: "2020" },
  ],

  work: [
    { title: "Subscriptions", date: "2026", g: 0, to: "/work/subscriptions" },
    { title: "Growth experiments", date: "2025", g: 1, to: "/work/growth-experiments" },
    { title: "Step Group", date: "2024", g: 2, to: "/work/step-group" },
    { title: "Onboarding", upcoming: true, g: 3 },
  ],

  writing: [
    { date: "2025", title: "Scaling Razorpay's growth surface on Framer", read: "5 m", to: "/writing/framer" },
  ],

  // draggable placeholders — swap the greys for images/embeds later
  tidbits: [
    { id: "t1", x: 24, y: 44, w: 210, h: 140, kind: "card", g: 0 },
    { id: "t2", x: 300, y: 24, w: 178, h: 208, kind: "card", g: 1 },
    { id: "t3", x: 540, y: 66, w: 220, h: 150, kind: "card", g: 2 },
    { id: "t4", x: 150, y: 224, w: 190, h: 120, kind: "card", g: 3 },
    { id: "t5", x: 440, y: 246, w: 160, h: 112, kind: "card", g: 4 },
  ],
  playground: [
    { id: "p1", x: 40, y: 30, w: 120, h: 120, kind: "circle", g: 0 },
    { id: "p2", x: 220, y: 60, w: 190, h: 116, kind: "rect", g: 1 },
    { id: "p3", x: 470, y: 24, w: 96, h: 96, kind: "square", g: 2 },
    { id: "p4", x: 610, y: 120, w: 150, h: 150, kind: "circle", g: 3 },
    { id: "p5", x: 120, y: 210, w: 200, h: 120, kind: "rect", g: 4 },
    { id: "p6", x: 400, y: 224, w: 112, h: 112, kind: "square", g: 5 },
    { id: "p7", x: 560, y: 288, w: 140, h: 96, kind: "rect", g: 6 },
  ],

  photos: [], // avatar fan (last = front)
};

const AVATAR_GREYS = [
  "linear-gradient(135deg,#dedede,#cfcfcf)",
  "linear-gradient(135deg,#e6e6e6,#d8d8d8)",
  "linear-gradient(135deg,#eeeeee,#e0e0e0)",
  "linear-gradient(135deg,#ababab,#909090)",
];
const SHAPE_GREYS = [
  "linear-gradient(135deg,#e8e8e4,#d8d8d3)",
  "linear-gradient(135deg,#dcdcd7,#cbcbc5)",
  "linear-gradient(135deg,#efefeb,#dedeD8)",
  "linear-gradient(135deg,#d3d3ce,#c2c2bc)",
  "linear-gradient(135deg,#e4e4df,#d2d2cc)",
  "linear-gradient(135deg,#eaeae5,#d9d9d3)",
  "linear-gradient(135deg,#d8d8d2,#c6c6c0)",
];

function fmtTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: CONFIG.timeZone,
  }).format(new Date());
}

/* ---------------- draggable canvas ---------------- */
function DraggableCanvas({ items, height, hint, variant }) {
  const canvasRef = useRef(null);
  const drag = useRef(null);
  const zTop = useRef(items.length);
  const [pos, setPos] = useState(() => {
    const o = {};
    items.forEach((it, i) => (o[it.id] = { x: it.x, y: it.y, z: i + 1 }));
    return o;
  });

  // keep items inside the canvas on first paint + resize
  useEffect(() => {
    const clamp = () => {
      const r = canvasRef.current && canvasRef.current.getBoundingClientRect();
      if (!r) return;
      setPos((s) => {
        const o = { ...s };
        items.forEach((it) => {
          o[it.id] = {
            ...o[it.id],
            x: Math.max(0, Math.min(o[it.id].x, r.width - it.w)),
            y: Math.max(0, Math.min(o[it.id].y, r.height - it.h)),
          };
        });
        return o;
      });
    };
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, []); // eslint-disable-line

  const onDown = (e, id) => {
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
    const r = canvasRef.current.getBoundingClientRect();
    drag.current = { id, ox: e.clientX - r.left - pos[id].x, oy: e.clientY - r.top - pos[id].y };
    zTop.current += 1;
    setPos((s) => ({ ...s, [id]: { ...s[id], z: zTop.current } }));
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const it = items.find((i) => i.id === drag.current.id);
    let x = e.clientX - r.left - drag.current.ox;
    let y = e.clientY - r.top - drag.current.oy;
    x = Math.max(0, Math.min(x, r.width - it.w));
    y = Math.max(0, Math.min(y, r.height - it.h));
    setPos((s) => ({ ...s, [drag.current.id]: { ...s[drag.current.id], x, y } }));
  };
  const onUp = () => (drag.current = null);

  return (
    <div className={"canvas" + (variant ? " " + variant : "")} style={{ height }} ref={canvasRef}>
      {hint && (
        <span className="canvas-hint">
          <Move size={13} strokeWidth={1.75} /> {hint}
        </span>
      )}
      {items.map((it) => (
        <div
          key={it.id}
          className={"ci ci-" + it.kind}
          style={{
            left: pos[it.id].x, top: pos[it.id].y, zIndex: pos[it.id].z,
            width: it.w, height: it.h, backgroundImage: SHAPE_GREYS[it.g % SHAPE_GREYS.length],
          }}
          onPointerDown={(e) => onDown(e, it.id)}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      ))}
    </div>
  );
}

export default function AboutTemplate() {
  const reduced =
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rootRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [now, setNow] = useState(fmtTime);
  const [fanned, setFanned] = useState(false);
  const [eyes, setEyes] = useState({ show: false, x: 0, y: 0, icon: "👀" });
  const [veil, setVeil] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prev, setPrev] = useState({ show: false, x: 0, y: 0, g: 0 });
  const [dockHidden, setDockHidden] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);

  // fade the sticky pill out once the footer starts revealing
  useEffect(() => {
    const onScroll = () => {
      const dist = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setDockHidden(dist < 340);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const copyEmail = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    };
    try { navigator.clipboard.writeText(CONFIG.email).then(done, done); } catch (e) { done(); }
  };

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && !e.altKey) copyEmail();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // theme transition — soft dissolve / focus-in (feels like the light shifting)
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      if (rootRef.current) rootRef.current.setAttribute("data-theme", next);
      setTheme(next);
    };
    if (reduced || !document.startViewTransition) { apply(); return; }
    document.startViewTransition(apply);
  };

  const photoFor = (i) =>
    CONFIG.photos[i]
      ? { backgroundImage: `url(${CONFIG.photos[i]})` }
      : { backgroundImage: AVATAR_GREYS[i % AVATAR_GREYS.length] };

  const thumbFor = (it) =>
    it.thumb
      ? { backgroundImage: `url(${it.thumb})` }
      : { backgroundImage: SHAPE_GREYS[(it.g || 0) % SHAPE_GREYS.length] };

  return (
    <div className="gp" ref={rootRef} data-theme={theme}>
      <style>{css}</style>

      <div className="content">
      <div className="col">
        {/* TOP ROW */}
        <header className="bar">
          <span className="name">{CONFIG.name}</span>
          <div className="bar-right">
            <span className="clock">
              <Clock size={13} strokeWidth={1.75} />
              {now} {CONFIG.tzLabel}
            </span>
            <button
              className="switch"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="switch-icon" key={theme}>
                {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
              </span>
            </button>
          </div>
        </header>

        {/* ABOUT */}
        <main className="about">
          <div
            className={"ava" + (fanned ? " open" : "")}
            onClick={() => setFanned((v) => !v)}
            onMouseEnter={(e) => { setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "👀" }); setVeil(true); }}
            onMouseMove={(e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "👀" })}
            onMouseLeave={() => { setFanned(false); setEyes((s) => ({ ...s, show: false })); setVeil(false); }}
            role="img" aria-label={`${CONFIG.name} — photos`} tabIndex={0}
          >
            <span className="card c0" style={photoFor(0)} />
            <span className="card c1" style={photoFor(1)} />
            <span className="card c2" style={photoFor(2)} />
            <span className="card c3" style={photoFor(3)} />
            <span className="ava-tip" aria-hidden="true">Click to Know more</span>
          </div>

          <h1 className="title">
            {CONFIG.title}
            {CONFIG.titleLine2 ? (<><br />{CONFIG.titleLine2}</>) : null}
          </h1>

          <p className="ideology">{CONFIG.ideology[0]}</p>
          <p className="ideology">{CONFIG.ideology[1]}</p>

          <button className="pressc" onClick={copyEmail}>
            {copied ? (<>Email copied&nbsp;✓</>) : (<>Press <kbd>C</kbd> to copy my email</>)}
          </button>
        </main>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <span className="section-label">Experience</span>
          <p className="section-intro">I have 3+ years of work experience, some of which are:</p>
          <div className="exp-row">
            {CONFIG.experience.map((c) => (
              <span
                className="exp-item"
                key={c.name}
                onMouseEnter={(e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "💼" })}
                onMouseMove={(e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "💼" })}
                onMouseLeave={() => setEyes((s) => ({ ...s, show: false }))}
              >
                <span className="exp-tip">
                  <span className="et-name">{c.name}</span>
                  <span className="et-yr">{c.year}</span>
                </span>
                <span className="exp-badge" style={{ background: c.color }}>
                  {c.logo ? <img src={c.logo} alt={c.name} /> : c.initial}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* WORK — hover to preview */}
        <section className="section" id="work">
          <span className="section-label">work</span>
          <div className="list">
            {CONFIG.work.map((w) => {
              const handlers = {
                onMouseEnter: (e) => { setPrev({ show: true, x: e.clientX, y: e.clientY, g: w.g }); setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "📑" }); },
                onMouseMove: (e) => { setPrev({ show: true, x: e.clientX, y: e.clientY, g: w.g }); setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "📑" }); },
                onMouseLeave: () => { setPrev((p) => ({ ...p, show: false })); setEyes((s) => ({ ...s, show: false })); },
              };
              const inner = (
                <>
                  <span className="thumb" style={thumbFor(w)} />
                  <span className="rx-title">{w.title}</span>
                  {w.upcoming ? (
                    <span className="rx-badge">Upcoming</span>
                  ) : (
                    <span className="rx-date">{w.date}</span>
                  )}
                </>
              );
              return w.to ? (
                <Link className="rowx" key={w.title} to={w.to} {...handlers}>{inner}</Link>
              ) : (
                <div className="rowx" key={w.title} {...handlers}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* WRITING */}
        <section className="section" id="writing">
          <span className="section-label">Writing</span>
          <div className="wlist">
            {CONFIG.writing.map((a) => {
              const handlers = {
                onMouseEnter: (e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "✍️" }),
                onMouseMove: (e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "✍️" }),
                onMouseLeave: () => setEyes((s) => ({ ...s, show: false })),
              };
              const inner = (
                <>
                  <span className="w-date">{a.date}</span>
                  <span className="w-title">{a.title}</span>
                  <span className="w-read"><Clock size={13} strokeWidth={1.75} /> {a.read}</span>
                </>
              );
              return a.to ? (
                <Link className="wrow" key={a.title} to={a.to} {...handlers}>{inner}</Link>
              ) : (
                <a className="wrow" key={a.title} href="#" {...handlers}>{inner}</a>
              );
            })}
          </div>
        </section>

        {/* TIDBITS — draggable canvas */}
        <section className="section" id="tidbits">
          <span className="section-label">Tidbits</span>
          <DraggableCanvas items={CONFIG.tidbits} height={400} hint="drag to move" variant="mat" />
        </section>

        {/* PERSONAL — space reserved, content TBD */}
        <section className="section" id="personal">
          <span className="section-label">personal</span>
          <div className="personal-space" aria-hidden="true" />
        </section>
      </div>

        {(veil || fanned) && <div className="blur-veil" aria-hidden="true" />}
      </div>

      {/* SCROLL-REVEAL FOOTER (sits beneath the content) */}
      <footer
        className="site-footer"
        onMouseEnter={(e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "📩" })}
        onMouseMove={(e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon: "📩" })}
        onMouseLeave={() => setEyes((s) => ({ ...s, show: false }))}
      >
        <div className="ft-inner">
          <div className="ft-note" aria-hidden="true" />

          <div className="ft-veil" aria-hidden="true" />

          <div className="ft-social">
            <a className="ft-chip r1" href={`mailto:${CONFIG.email}`} aria-label="Email"><span className="ft-label">Email</span><Mail size={36} strokeWidth={2} /></a>
            <a className="ft-chip r2" href={CONFIG.socials.linkedin} aria-label="LinkedIn"><span className="ft-label">LinkedIn</span><Linkedin size={36} strokeWidth={2} /></a>
            <a className="ft-chip r3" href={CONFIG.socials.twitter} aria-label="Twitter"><span className="ft-label">Twitter</span><Twitter size={36} strokeWidth={2} /></a>
          </div>
        </div>
      </footer>

      {/* STICKY PILL DOCK */}
      <div className={"pilldock" + (dockHidden ? " hidden" : "")}>
        <a className="pd-btn" href={`mailto:${CONFIG.email}`} aria-label="Email">
          <Mail size={18} strokeWidth={1.9} /><span className="pd-tip">Email</span>
        </a>
        <a className="pd-btn" href={CONFIG.socials.linkedin} aria-label="LinkedIn">
          <Linkedin size={18} strokeWidth={1.9} /><span className="pd-tip">LinkedIn</span>
        </a>
        <a className="pd-btn" href={CONFIG.socials.twitter} aria-label="Twitter">
          <Twitter size={18} strokeWidth={1.9} /><span className="pd-tip">Twitter</span>
        </a>
      </div>
      {eyes.show && (
        <span className="eyes-cursor" style={{ left: eyes.x, top: eyes.y }} aria-hidden="true">{eyes.icon || "👀"}</span>
      )}
      {prev.show && (
        <div
          className="work-preview"
          style={{
            left: Math.min(prev.x + 24, (typeof window !== "undefined" ? window.innerWidth : 1200) - 284),
            top: Math.max(14, prev.y - 92),
          }}
        >
          <span className="wp-img" style={{ backgroundImage: SHAPE_GREYS[prev.g % SHAPE_GREYS.length] }} />
        </div>
      )}
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

::view-transition-old(root),::view-transition-new(root){mix-blend-mode:normal;}
::view-transition-old(root){z-index:0;animation:themeOut .34s cubic-bezier(.4,0,1,1) both;}
::view-transition-new(root){z-index:1;animation:themeIn .58s cubic-bezier(.16,1,.3,1) both;}
@keyframes themeOut{to{opacity:0;filter:blur(5px)}}
@keyframes themeIn{from{opacity:0;filter:blur(9px)}to{opacity:1;filter:blur(0)}}
@media (prefers-reduced-motion:reduce){
  ::view-transition-old(root),::view-transition-new(root){animation:none;}
}

.gp{
  --bg:#FFFFFF; --ink:#17170F; --muted:#6E6D62; --faint:#A2A196; --line:#E9E9E3;
  --kbd-bg:rgba(20,20,15,.06); --panel:#FFFFFF; --canvas-bg:#FBFBF9;
  --dot:rgba(20,20,15,.07); --footH:410px;
  min-height:100vh; color:var(--ink); overflow-x:hidden;
  background-color:var(--bg); background-image:none;
  font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
  transition:background-color .35s ease,color .35s ease;
}
.gp[data-theme="dark"]{
  --bg:#0E0E0C; --ink:#F2F1EA; --muted:#9A998E; --faint:#65655C; --line:#262521;
  --kbd-bg:rgba(255,255,255,.09); --panel:#191914; --canvas-bg:#141410;
  --dot:rgba(255,255,255,.07);
}
/* content layer — sits above the footer and reveals it on scroll */
.content{position:relative;z-index:2;background-color:var(--bg);margin-bottom:var(--footH);
  transition:background-color .35s ease;}
.gp[data-theme="dark"] .content{
  background-image:url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='54'%20height='54'%3E%3Cpath%20d='M0%200H54'%20stroke='%23ffffff'%20stroke-opacity='.09'%20stroke-dasharray='2%206'/%3E%3Cpath%20d='M0%200V54'%20stroke='%23ffffff'%20stroke-opacity='.09'%20stroke-dasharray='2%206'/%3E%3C/svg%3E");
  background-size:54px 54px;
}
.gp *{box-sizing:border-box;}
.gp button{font:inherit;color:inherit;background:none;border:none;cursor:pointer;}
.gp a{color:inherit;text-decoration:none;}
.gp *:focus-visible{outline:2px solid var(--ink);outline-offset:4px;border-radius:8px;}

/* theme switch (aligned in the top bar) */
.switch{width:38px;height:38px;border:1px solid var(--line);border-radius:50%;flex:0 0 auto;
  display:grid;place-items:center;color:var(--muted);
  transition:border-color .2s,transform .2s,color .2s;}
.switch:hover{border-color:var(--muted);color:var(--ink);transform:scale(1.06);}
.switch:active{transform:scale(.94);}
.switch:hover .switch-icon{transform:rotate(25deg);}
.switch-icon{display:grid;place-items:center;transition:transform .3s ease;animation:iconIn .5s cubic-bezier(.34,1.56,.64,1);}
@keyframes iconIn{from{opacity:0;transform:rotate(-120deg) scale(.4)}to{opacity:1;transform:rotate(0) scale(1)}}

/* column */
.col{max-width:940px;margin:0 auto;padding:0 clamp(20px,5vw,32px) 40px;}

/* top row */
.bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 0;}
.name{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--ink);}
.bar-right{display:inline-flex;align-items:center;gap:16px;}
.clock{display:inline-flex;align-items:center;justify-content:flex-end;gap:7px;
  min-width:150px;font-family:'JetBrains Mono',monospace;white-space:nowrap;
  font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums;letter-spacing:.02em;}

/* about */
.about{padding:clamp(44px,10vh,96px) 0 0;display:flex;flex-direction:column;align-items:flex-start;}
.ava{position:relative;width:78px;height:78px;margin-bottom:26px;cursor:none;z-index:20;}
.ava-tip{position:absolute;bottom:calc(100% + 14px);left:0;transform:translateY(5px);
  background:var(--ink);color:var(--bg);font-family:'JetBrains Mono',monospace;font-size:10px;
  letter-spacing:.14em;text-transform:uppercase;padding:6px 10px;border-radius:8px;white-space:nowrap;
  box-shadow:0 6px 16px rgba(0,0,0,.2);z-index:30;
  opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;}
.ava:hover .ava-tip,.ava:focus-visible .ava-tip,.ava.open .ava-tip{opacity:1;transform:translateY(0);}
.ava .card{position:absolute;inset:0;border-radius:15px;background-size:cover;background-position:center;
  border:2px solid var(--bg);box-shadow:0 4px 12px rgba(0,0,0,.13);
  transition:transform .5s cubic-bezier(.2,.85,.25,1);will-change:transform;}
.ava .c0{z-index:1;transform:translate(13px,-5px) rotate(5deg);}
.ava .c1{z-index:2;transform:translate(8px,7px) rotate(3deg);}
.ava .c2{z-index:3;transform:translate(16px,2px) rotate(8deg);}
.ava .c3{z-index:4;}
.ava:hover .c0,.ava:focus-visible .c0,.ava.open .c0{transform:translate(-4px,-34px) rotate(-3deg);}
.ava:hover .c1,.ava:focus-visible .c1,.ava.open .c1{transform:translate(40px,-18px) rotate(12deg);}
.ava:hover .c2,.ava:focus-visible .c2,.ava.open .c2{transform:translate(-38px,-18px) rotate(-13deg);}
.ava:hover .c3,.ava:focus-visible .c3,.ava.open .c3{transform:translate(0,4px) rotate(0) scale(1.03);}

.eyes-cursor{position:fixed;z-index:90;pointer-events:none;font-size:28px;line-height:1;transform:translate(-50%,-50%);}
.blur-veil{position:fixed;inset:0;z-index:10;pointer-events:none;
  -webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);
  background:color-mix(in srgb, var(--bg), transparent 42%);animation:veilin .28s ease both;}
@keyframes veilin{from{opacity:0}to{opacity:1}}

.title{font-family:'Hanken Grotesk',system-ui,sans-serif;font-weight:700;letter-spacing:-.02em;
  font-size:clamp(1.9rem,4.6vw,2.7rem);line-height:1.18;margin:0 0 28px;text-wrap:balance;}
.ideology{color:var(--muted);font-size:clamp(1rem,1.6vw,1.15rem);line-height:1.6;margin:0 0 16px;}
.ideology:last-of-type{margin-bottom:0;}

.pressc{display:inline-flex;align-items:center;gap:8px;margin-top:36px;font-size:15px;color:var(--muted);cursor:pointer;}
.pressc kbd{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;
  min-width:22px;height:22px;padding:0 6px;display:inline-flex;align-items:center;justify-content:center;
  background:var(--kbd-bg);border:1px solid var(--line);border-bottom-width:2px;border-radius:6px;color:var(--ink);}
.pressc:hover{color:var(--ink);}

/* sections */
.section{padding:clamp(22px,3.5vh,38px) 0;}
.section-label{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;
  text-transform:uppercase;letter-spacing:.16em;color:var(--faint);margin-bottom:26px;}
.section-intro{color:var(--muted);font-size:clamp(1rem,1.5vw,1.1rem);line-height:1.55;
  max-width:60ch;margin:-14px 0 26px;}

/* experience — b&w → colour + name */
.exp-row{display:flex;flex-wrap:wrap;gap:18px;}
.exp-item{position:relative;cursor:none;}
.exp-badge{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;overflow:hidden;
  color:#fff;font-family:'Hanken Grotesk',sans-serif;font-weight:800;font-size:20px;
  filter:grayscale(1);opacity:.82;cursor:default;
  transition:filter .28s ease,transform .28s ease,opacity .28s ease,box-shadow .28s ease;}
.exp-badge img{width:100%;height:100%;object-fit:cover;}
.exp-item:hover .exp-badge{filter:grayscale(0);opacity:1;transform:translateY(-4px) scale(1.05);
  box-shadow:0 8px 20px rgba(0,0,0,.18);}
.exp-tip{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) translateY(5px);
  background:#FFFFFF;color:#1A1A17;padding:7px 11px;border-radius:9px;white-space:nowrap;
  border:1px solid rgba(20,20,15,.08);box-shadow:0 10px 26px rgba(0,0,0,.16);
  display:flex;flex-direction:column;gap:1px;align-items:flex-start;
  opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:5;}
.exp-tip .et-name{font-family:'Inter',sans-serif;font-weight:600;font-size:12.5px;}
.exp-tip .et-yr{font-family:'JetBrains Mono',monospace;font-size:11px;color:#8A8A80;}
.exp-tip::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);
  border:6px solid transparent;border-top-color:#FFFFFF;}
.exp-item:hover .exp-tip{opacity:1;transform:translateX(-50%) translateY(0);}

/* thumbnail rows — work */
.list{border-top:1px solid var(--line);}
.rowx{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;cursor:none;
  padding:12px 4px;border-bottom:1px solid var(--line);}
.thumb{width:46px;height:46px;border-radius:9px;flex:0 0 auto;background-size:cover;background-position:center;
  box-shadow:0 3px 9px rgba(0,0,0,.15);transform:rotate(-5deg);transition:transform .22s ease;}
.rowx:hover .thumb{transform:rotate(0) scale(1.05);}
.rx-title{font-size:16px;color:var(--ink);}
.rowx:hover .rx-title{text-decoration:underline;text-underline-offset:3px;}
.rx-date{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--faint);white-space:nowrap;text-align:right;}
.rx-badge{justify-self:end;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.04em;
  padding:4px 10px;border-radius:999px;background:rgba(199,123,48,.14);color:#C77B30;white-space:nowrap;}

/* writing rows — date · title · read time */
.wlist{border-top:1px solid var(--line);}
.wrow{position:relative;isolation:isolate;display:grid;grid-template-columns:auto 1fr auto;gap:24px;
  align-items:center;cursor:none;padding:14px 8px;border-bottom:1px solid var(--line);}
.wrow::before{content:"";position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);
  width:100vw;z-index:-1;background:transparent;transition:background .18s ease;}
.wrow:hover::before{background:var(--kbd-bg);}
.w-date{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--faint);white-space:nowrap;}
.w-title{font-size:16px;color:var(--ink);}
.w-read{display:inline-flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;
  font-size:13px;color:var(--faint);white-space:nowrap;}

/* work hover preview */
.work-preview{position:fixed;z-index:80;pointer-events:none;width:260px;height:168px;
  border-radius:14px;overflow:hidden;border:4px solid var(--panel);
  box-shadow:0 22px 50px rgba(0,0,0,.30);animation:wpin .18s ease;}
.wp-img{display:block;width:100%;height:100%;background-size:cover;background-position:center;}
@keyframes wpin{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}

/* draggable canvas */
.canvas{position:relative;width:100%;border:1px solid var(--line);border-radius:18px;overflow:hidden;
  background-color:var(--canvas-bg);
  background-image:radial-gradient(var(--dot) 1px, transparent 1px);background-size:22px 22px;
  touch-action:none;user-select:none;-webkit-user-select:none;}
.canvas-hint{position:absolute;left:16px;bottom:14px;z-index:1;display:inline-flex;align-items:center;gap:6px;
  font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--faint);pointer-events:none;}
.ci{position:absolute;border-radius:16px;cursor:grab;background-size:cover;background-position:center;
  box-shadow:0 6px 18px rgba(0,0,0,.16);transition:box-shadow .2s ease;touch-action:none;}
.ci:hover{box-shadow:0 10px 24px rgba(0,0,0,.2);}
.ci:active{cursor:grabbing;box-shadow:0 16px 32px rgba(0,0,0,.26);}
.ci-circle{border-radius:50%;}

/* cutting-mat variant — for the Tidbits canvas */
.canvas.mat{
  border-color:rgba(0,0,0,.14);
  background-color:#4B6B57;
  background-image:
    linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px);
  background-size:120px 120px,120px 120px,24px 24px,24px 24px;
  background-position:-1px -1px,-1px -1px,-1px -1px,-1px -1px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
}
.canvas.mat::before{
  content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background:
    linear-gradient(135deg, transparent calc(50% - 1px), rgba(255,255,255,.16) 50%, transparent calc(50% + 1px)),
    linear-gradient(45deg, transparent calc(50% - 1px), rgba(255,255,255,.16) 50%, transparent calc(50% + 1px));
  background-size:240px 240px,240px 240px;
  background-repeat:repeat;
  mask-image:radial-gradient(circle at 0 0, black, transparent 70%);
}
.canvas.mat .canvas-hint{color:rgba(255,255,255,.72);}
.gp[data-theme="dark"] .canvas.mat{background-color:#33493B;}

/* reserved empty space for the personal section */
.personal-space{min-height:360px;}

/* sticky pill dock */
.pilldock{position:fixed;left:50%;transform:translateX(-50%);bottom:22px;z-index:70;
  display:inline-flex;align-items:center;gap:8px;padding:8px;
  background:var(--panel);border:1px solid var(--line);border-radius:999px;
  box-shadow:0 14px 34px rgba(0,0,0,.16), 0 2px 6px rgba(0,0,0,.06);
  transition:opacity .3s ease,transform .3s ease;}
.pilldock.hidden{opacity:0;transform:translateX(-50%) translateY(26px);pointer-events:none;}
.pd-btn{position:relative;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;
  background:transparent;color:var(--ink);
  transition:background .2s ease,transform .2s ease;}
.pd-btn:hover{background:var(--kbd-bg);transform:translateY(-2px);}
.pd-tip{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%) translateY(6px);
  background:var(--ink);color:var(--bg);font-family:'JetBrains Mono',monospace;font-size:10px;
  letter-spacing:.14em;text-transform:uppercase;padding:6px 10px;border-radius:8px;white-space:nowrap;
  box-shadow:0 6px 16px rgba(0,0,0,.2);
  opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;}
.pd-btn:hover .pd-tip{opacity:1;transform:translateX(-50%) translateY(0);}

/* emoji-cursor zones — hide the native cursor entirely */
.ava, .ava *, .exp-item, .exp-item *, .rowx, .rowx *, .wrow, .wrow *,
.site-footer, .site-footer *{cursor:none;}

/* scroll-reveal footer */
.site-footer{position:fixed;left:0;right:0;bottom:0;height:var(--footH);z-index:1;
  background:#84837B;color:#F5F4F0;overflow:hidden;
  display:flex;align-items:stretch;justify-content:center;}
.ft-inner{position:relative;width:100%;max-width:1040px;height:100%;padding:40px clamp(20px,5vw,40px) 34px;
  display:flex;flex-direction:column;align-items:center;}
.ft-top{width:100%;display:flex;justify-content:flex-start;align-items:flex-start;margin-bottom:0;}
.ft-right{text-align:right;}
.ft-k{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;
  text-transform:uppercase;opacity:.72;margin-bottom:7px;}
.ft-v{font-family:'Hanken Grotesk',sans-serif;font-weight:500;font-size:15px;}
.ft-note{width:min(560px,88%);height:210px;background:#1B1915;border-radius:16px;margin-top:auto;
  box-shadow:0 26px 60px rgba(0,0,0,.28);
  background-image:repeating-linear-gradient(#1B1915 0 33px, rgba(255,255,255,.05) 33px 34px);}

/* focus veil — blurs the footer behind the tiles on hover */
.ft-veil{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0;
  -webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);
  background:rgba(132,131,123,.28);transition:opacity .28s ease;}
.ft-inner:has(.ft-chip:hover) .ft-veil{opacity:1;}

.ft-social{display:flex;gap:0;margin-top:-54px;position:relative;z-index:2;}
.ft-chip{position:relative;width:104px;height:104px;border-radius:26px;border:4px solid #F5F4F0;background:#84837B;
  color:#F5F4F0;display:grid;place-items:center;box-shadow:0 14px 30px rgba(0,0,0,.22);margin-left:-24px;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1);}
.ft-chip.r1{margin-left:0;transform:rotate(-8deg);} .ft-chip.r2{transform:rotate(5deg);} .ft-chip.r3{transform:rotate(-3deg);}
.ft-chip:hover{transform:translateY(-6px) rotate(0deg) scale(1.05);z-index:3;}
.ft-label{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%) translateY(5px);
  background:#1B1915;color:#F5F4F0;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;padding:6px 10px;border-radius:8px;white-space:nowrap;
  opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;}
.ft-chip:hover .ft-label{opacity:1;transform:translateX(-50%) translateY(0) rotate(0deg);}

@media (max-width:640px){
  .canvas{height:360px !important;}
  .gp{--footH:470px;}
  .ft-note{height:180px;}
  .ft-chip{width:82px;height:82px;border-radius:22px;}
}
@media (max-width:420px){
  .bar{gap:8px;} .bar-right{gap:10px;} .name{letter-spacing:.08em;} .clock{min-width:0;}
}

@media (prefers-reduced-motion:reduce){
  .gp *,.gp *::before,.gp *::after{transition:none!important;animation:none!important;}
}
`;
