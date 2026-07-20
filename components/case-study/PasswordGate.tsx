"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PasswordGate() {
  const router = useRouter();
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        // cookie is set — re-render the server component with content included
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <form className="cs-lock-form" onSubmit={handleUnlock}>
        <div className={`cs-lock-input-wrap${error ? " is-error" : ""}`}>
          <svg className="cs-lock-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="password"
            className="cs-lock-input"
            placeholder="Enter password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false); }}
            autoFocus
            aria-invalid={error}
            aria-describedby={error ? "cs-lock-error-msg" : undefined}
          />
        </div>
        <button type="submit" className="cs-lock-btn" disabled={busy || !pwd}>
          {busy ? <span className="cs-lock-spinner" aria-hidden="true" /> : "Unlock"}
        </button>
      </form>
      {error && (
        <p className="cs-lock-error" id="cs-lock-error-msg" role="alert">
          Wrong password — try again.
        </p>
      )}
    </>
  );
}
