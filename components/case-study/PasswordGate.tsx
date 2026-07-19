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
        <input
          type="password"
          className="cs-lock-input"
          placeholder="Password"
          value={pwd}
          onChange={(e) => { setPwd(e.target.value); setError(false); }}
          autoFocus
        />
        <button type="submit" className="cs-lock-btn" disabled={busy}>
          {busy ? "…" : "Unlock"}
        </button>
      </form>
      {error && <p className="cs-lock-error">Wrong password — try again.</p>}
    </>
  );
}
