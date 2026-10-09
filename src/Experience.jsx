import { useState } from "react";
import {
  FaWandMagicSparkles,
  FaCode,
  FaPeopleGroup,
  FaBrain,
  FaGraduationCap,
  FaChevronDown,
} from "react-icons/fa6";
import { experience } from "./data.js";

const icons = {
  spark: FaWandMagicSparkles,
  code: FaCode,
  people: FaPeopleGroup,
  brain: FaBrain,
  cap: FaGraduationCap,
};

function Row({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icons[item.icon];

  return (
    <li
      className={`xp ${isOpen ? "is-open" : ""}`}
      onClick={() => setIsOpen((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
    >
      <span className="xp-ico" style={{ "--tint": item.tint }} aria-hidden="true">
        {item.logo ? <img className="xp-logo" src={item.logo} alt="" loading="lazy" /> : <Icon />}
      </span>

      <div className="xp-main">
        <h3>{item.org}</h3>
        <p className="xp-role">{item.role}</p>
        <div className="xp-detail-wrapper">
          <div className="xp-detail-inner">
            <p className="xp-detail">{item.detail}</p>
          </div>
        </div>
      </div>

      <div className="xp-right">
        {item.years && <span className="xp-years">{item.years}</span>}
        {(item.location || item.type) && (
          <span className="xp-sub">
            {item.location}
            {item.location && item.type ? " · " : ""}
            {item.type}
          </span>
        )}
        <span className="xp-chevron" aria-hidden="true">
          <FaChevronDown />
        </span>
      </div>
    </li>
  );
}

const INITIAL = 6;

export default function Experience() {
  const [all, setAll] = useState(false);
  const shown = all ? experience : experience.slice(0, INITIAL);
  const rest = experience.length - INITIAL;

  return (
    <section className="sec" id="experience">
      <div className="sec-head">
        <h2>Experience so far</h2>
      </div>

      <ul className="xp-list">
        {shown.map((item) => (
          <Row key={item.org + item.role} item={item} />
        ))}
      </ul>

      {rest > 0 && (
        <button className="more" onClick={() => setAll((v) => !v)}>
          {all ? "Show less" : `+ ${rest} more experience`} <span aria-hidden="true">{all ? "↑" : "→"}</span>
        </button>
      )}
    </section>
  );
}
