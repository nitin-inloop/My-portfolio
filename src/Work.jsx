import { useState } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa6";
import { TechRow } from "./techIcons.jsx";
import { projects, profile } from "./data.js";

const INITIAL = 6;

function Card({ p }) {
  const [active, setActive] = useState(false);

  return (
    <article
      className={`card ${active ? "is-active" : ""}`}
      onClick={(e) => {
        if (e.target.closest("a")) return;
        setActive((prev) => !prev);
      }}
      tabIndex={0}
      role="region"
      aria-label={p.name}
    >
      <div className={p.fit === "contain" ? "card-shot contain" : "card-shot"}>
        <img src={p.img} alt={`${p.name} screenshot`} loading="lazy" decoding="async" />
      </div>

      <div className="card-overlay">
        <div className="card-info">
          <h3>{p.name}</h3>
          <div className="card-tags">
            {p.tags && p.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="chip">{tag}</span>
            ))}
          </div>
        </div>

        <div className="card-hover">
          <div className="card-hover-inner">
            <p className="card-desc-text">{p.desc}</p>
            <div className="card-foot">
              <TechRow keys={p.stack} />
              <div className="card-links">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <FaGithub aria-hidden="true" /> Code
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    View <FaArrowRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [all, setAll] = useState(false);
  const shown = all ? projects : projects.slice(0, INITIAL);
  const rest = projects.length - INITIAL;

  return (
    <section className="sec" id="work">
      <div className="sec-head">
        <h2>Selected work</h2>
        <a className="sec-link" href={profile.github} target="_blank" rel="noopener noreferrer">
          All repos ↗
        </a>
      </div>

      <div className="work-grid">
        {shown.map((p) => (
          <Card key={p.name} p={p} />
        ))}
      </div>

      {rest > 0 && (
        <button className="more" onClick={() => setAll((v) => !v)}>
          {all ? "Show less" : `+ ${rest} more projects`} <span aria-hidden="true">{all ? "↑" : "→"}</span>
        </button>
      )}
    </section>
  );
}
