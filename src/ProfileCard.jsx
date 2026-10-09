import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaRegFileLines, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { profile, bio } from "./data.js";

/* Deterministic embers for the banner — same layout every render, no jitter on rerender. */
const EMBERS = Array.from({ length: 22 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${r(1) * 100}%`,
    top: `${r(2) * 100}%`,
    size: `${3 + r(3) * 6}px`,
    delay: `${r(4) * -9}s`,
    duration: `${7 + r(5) * 7}s`,
    opacity: 0.25 + r(6) * 0.55,
  };
});

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-GB", { timeZone: profile.timezone, hour12: false });
  return (
    <span className="banner-clock" title={`Local time in ${profile.location}`}>
      {time}
    </span>
  );
}

export default function ProfileCard({ contributionTotal }) {
  const [photoOk, setPhotoOk] = useState(true);

  const pills = [
    { href: profile.github, label: "GitHub", icon: <FaGithub /> },
    { href: profile.linkedin, label: "LinkedIn", icon: <FaLinkedinIn /> },
    { href: profile.twitter, label: "Twitter", icon: <FaXTwitter /> },
    { href: profile.resume, label: "Résumé", icon: <FaRegFileLines /> },
    { href: profile.portfolio, label: profile.portfolioLabel, icon: <FaArrowUpRightFromSquare /> },
  ].filter((p) => p.href);

  return (
    <section className="hero" id="top">
      <div className="banner">
        <div className="banner-embers" aria-hidden="true">
          {EMBERS.map((e, i) => (
            <i
              key={i}
              style={{
                left: e.left,
                top: e.top,
                width: e.size,
                height: e.size,
                opacity: e.opacity,
                animationDelay: e.delay,
                animationDuration: e.duration,
              }}
            />
          ))}
        </div>
        <Clock />

        <div className="banner-id">
          <div className="avatar">
            {photoOk ? (
              <img src={profile.photo} alt={profile.name} onError={() => setPhotoOk(false)} />
            ) : (
              <span>{profile.initials}</span>
            )}
          </div>
          <div className="banner-text">
            <h1>
              {profile.name}
              <span className="badge" title={profile.available} aria-label={profile.available} />
            </h1>
            <p className="banner-role">{profile.role}</p>
            <p className="banner-meta">
              <span className="dot-live" aria-hidden="true" />
              {profile.available}
              {contributionTotal != null && (
                <span className="meta-stat">
                  <span className="sep">·</span>
                  <strong>{contributionTotal.toLocaleString()}</strong> contributions this year
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="hero-bio">
        {bio.map((line, i) => (
          <p key={i} className={line.strong ? "strong" : ""}>
            {line.text}
          </p>
        ))}
      </div>

      <div className="hero-cta">
        <a className="btn solid" href="#work">
          My work
        </a>
        <a className="btn ghost" href={`mailto:${profile.email}`}>
          <HiOutlineMail aria-hidden="true" /> Send an email
        </a>
      </div>

      <div className="hero-pills">
        {pills.map((p) => (
          <a className="pill" key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
            {p.icon} {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}
