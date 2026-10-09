import { useEffect, useState } from "react";
import OnekoCat from "./OnekoCat.jsx";

/* A cat that chases the cursor and a dog that flanks in behind it.
   Desktop only — there's no cursor to chase on a touch screen. */
export default function Oneko() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkDevice = () => setIsDesktop(mq.matches && !reduced.matches);

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Load saved preference
    const saved = localStorage.getItem("oneko-enabled");
    if (saved !== null) {
      setIsEnabled(saved === "true");
      window.onekoEnabled = saved === "true";
    } else {
      window.onekoEnabled = true;
    }

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Lets a toggle button elsewhere turn the pets off: dispatch a
  // CustomEvent('oneko-toggle', { detail: { enabled: false } }) on window.
  useEffect(() => {
    const handleToggle = (event) => {
      const newEnabled = event.detail.enabled;
      setIsEnabled(newEnabled);
      window.onekoEnabled = newEnabled;
      try {
        localStorage.setItem("oneko-enabled", String(newEnabled));
      } catch {
        /* preference just won't persist */
      }
    };

    window.addEventListener("oneko-toggle", handleToggle);
    return () => window.removeEventListener("oneko-toggle", handleToggle);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <OnekoCat enabled={isEnabled} catImage="/oneko/oneko.gif" />
      <OnekoCat
        enabled={isEnabled}
        catImage="/oneko/dog.gif"
        instanceId="oneko-dog"
        storageKey="oneko-dog"
        speed={9}
        initialX={typeof window !== "undefined" ? window.innerWidth - 32 : 96}
        initialY={typeof window !== "undefined" ? window.innerHeight - 32 : 32}
        targetOffsetX={48}
        approachAngle={-Math.PI / 3}
      />
    </>
  );
}
