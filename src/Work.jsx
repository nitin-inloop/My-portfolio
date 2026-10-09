import { useState } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa6";
import { TechRow } from "./techIcons.jsx";
import { projects, profile } from "./data.js";

const INITIAL = 5;

function Card({ p }) {
  return (
    <article className={p.featured ? "card featured" : "card"}>
      <div className={p.fit === "contain" ? "card-shot contain" : "card-shot"}>
        <img src={p.img} alt={`${p.name} screenshot`} loading="lazy" decoding="async" />
      </div>

      <div className="card-body">
        <div className="card-top">
          <h3>{p.name}</h3>
          <span className={`chip chip-${p.status.toLowerCase()}`}>
            <i aria-hidden="true" />
            {p.status}
          </span>
        </div>

        <p>{p.desc}</p>

        <div className="card-foot">
          <TechRow keys={p.stack} />
          <div className="card-links">
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" /> Code
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                View <FaArrowRight aria-hidden="true" />
              </a>
            )}
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
