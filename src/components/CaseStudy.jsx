import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies.js";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.cs{--bg:#FFFFFF;--ink:#17170F;--muted:#6E6D62;--faint:#A2A196;--line:#E9E9E3;--body:#3A3A33;
  min-height:100vh;background:var(--bg);color:var(--ink);
  font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.cs *{box-sizing:border-box;}

.cs-bar{max-width:900px;margin:0 auto;padding:26px clamp(20px,5vw,32px);
  display:flex;justify-content:space-between;align-items:center;}
.cs-back{font-family:'JetBrains Mono',monospace;font-size:12px;text-transform:uppercase;
  letter-spacing:.1em;color:var(--muted);text-decoration:none;transition:color .18s ease;}
.cs-back:hover{color:var(--ink);}
.cs-kind{font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.16em;color:var(--faint);}

.cs-col{max-width:760px;margin:0 auto;padding:16px clamp(20px,5vw,32px) 120px;}
.cs-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.16em;color:var(--faint);}
.cs-title{font-family:'Hanken Grotesk',sans-serif;font-weight:800;letter-spacing:-.02em;
  font-size:clamp(2rem,5vw,3rem);line-height:1.05;margin:14px 0 0;}
.cs-tagline{font-size:clamp(1.05rem,2vw,1.3rem);color:var(--muted);line-height:1.5;margin:16px 0 0;max-width:60ch;}

.cs-meta{display:flex;gap:36px;flex-wrap:wrap;margin:30px 0 0;padding:20px 0;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.cs-m{display:flex;flex-direction:column;gap:5px;}
.cs-mk{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;
  letter-spacing:.14em;color:var(--faint);}
.cs-mv{font-size:14px;font-weight:500;}

.cs-hero{height:clamp(220px,42vw,420px);border-radius:16px;margin:36px 0 8px;
  background:linear-gradient(135deg,#EDEDE8,#D9D8D1);}
.cs-sec{margin:44px 0 0;}
.cs-h{font-family:'Hanken Grotesk',sans-serif;font-weight:700;letter-spacing:-.01em;
  font-size:1.5rem;margin:0 0 14px;}
.cs-p{font-size:1.05rem;line-height:1.65;color:var(--body);margin:0 0 16px;}
.cs-img{height:clamp(200px,36vw,360px);border-radius:14px;margin:26px 0 0;
  background:linear-gradient(135deg,#F0EFEA,#E1E0D9);}

.cs-foot{margin:66px 0 0;padding-top:28px;border-top:1px solid var(--line);}

.cs-lock-col{padding-top:64px;}
.cs-lock-form{display:flex;gap:10px;margin:28px 0 0;max-width:360px;}
.cs-lock-input{flex:1;font-family:'Inter',system-ui,sans-serif;font-size:15px;color:var(--ink);
  background:#FFFFFF;border:1px solid var(--line);border-radius:10px;padding:11px 14px;outline:none;
  transition:border-color .18s ease;}
.cs-lock-input:focus{border-color:var(--muted);}
.cs-lock-btn{font-family:'Inter',system-ui,sans-serif;font-weight:600;font-size:14px;color:#FFFFFF;
  background:var(--ink);border:none;border-radius:10px;padding:0 20px;cursor:pointer;transition:opacity .18s ease;}
.cs-lock-btn:hover{opacity:.86;}
.cs-lock-error{font-size:13px;color:#C43D3D;margin:14px 0 0;}
`;

export default function CaseStudy() {
  const { slug } = useParams();
  const cs = caseStudies[slug];
  const locked = !!(cs && cs.password);
  const storageKey = `cs-unlocked-${slug}`;

  const [unlocked, setUnlocked] = useState(() => {
    if (!locked) return true;
    try { return sessionStorage.getItem(storageKey) === "1"; } catch (e) { return false; }
  });
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pwd === cs.password) {
      setUnlocked(true);
      setError(false);
      try { sessionStorage.setItem(storageKey, "1"); } catch (e) {}
    } else {
      setError(true);
    }
  };

  if (!cs) {
    return (
      <div className="cs">
        <style>{css}</style>
        <header className="cs-bar">
          <Link className="cs-back" to="/">← Gopi Bhatnagar</Link>
        </header>
        <div className="cs-col">
          <span className="cs-eyebrow">404</span>
          <h1 className="cs-title">Nothing here yet</h1>
          <p className="cs-tagline">That case study doesn’t exist. Head back home.</p>
          <div className="cs-foot"><Link className="cs-back" to="/">← Back to home</Link></div>
        </div>
      </div>
    );
  }

  if (locked && !unlocked) {
    return (
      <div className="cs">
        <style>{css}</style>
        <header className="cs-bar">
          <Link className="cs-back" to="/">← Gopi Bhatnagar</Link>
          <span className="cs-kind">{cs.kind}</span>
        </header>
        <div className="cs-col cs-lock-col">
          <span className="cs-eyebrow">Protected</span>
          <h1 className="cs-title">{cs.title}</h1>
          <p className="cs-tagline">This case study is password protected. Enter the password to continue.</p>
          <form className="cs-lock-form" onSubmit={handleUnlock}>
            <input
              type="password"
              className="cs-lock-input"
              placeholder="Password"
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(false); }}
              autoFocus
            />
            <button type="submit" className="cs-lock-btn">Unlock</button>
          </form>
          {error && <p className="cs-lock-error">Wrong password — try again.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="cs">
      <style>{css}</style>

      <header className="cs-bar">
        <Link className="cs-back" to="/">← Gopi Bhatnagar</Link>
        <span className="cs-kind">{cs.kind}</span>
      </header>

      <div className="cs-col">
        <span className="cs-eyebrow">{cs.meta.Role} · {cs.meta.Year}</span>
        <h1 className="cs-title">{cs.title}</h1>
        <p className="cs-tagline">{cs.tagline}</p>

        <div className="cs-meta">
          {Object.entries(cs.meta).map(([k, v]) => (
            <div className="cs-m" key={k}>
              <span className="cs-mk">{k}</span>
              <span className="cs-mv">{v}</span>
            </div>
          ))}
        </div>

        <div className="cs-hero" aria-hidden="true" />

        {cs.sections.map((s, i) => (
          <section className="cs-sec" key={i}>
            <h2 className="cs-h">{s.h}</h2>
            {s.p.map((para, j) => <p className="cs-p" key={j}>{para}</p>)}
            {s.img && <div className="cs-img" aria-hidden="true" />}
          </section>
        ))}

        <div className="cs-foot">
          <Link className="cs-back" to="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
