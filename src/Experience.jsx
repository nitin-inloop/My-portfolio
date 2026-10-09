import { FaWandMagicSparkles, FaCode, FaPeopleGroup, FaBrain, FaGraduationCap } from "react-icons/fa6";
import { experience, honors, education } from "./data.js";

const icons = {
  spark: FaWandMagicSparkles,
  code: FaCode,
  people: FaPeopleGroup,
  brain: FaBrain,
  cap: FaGraduationCap,
};

function Row({ item }) {
  const Icon = icons[item.icon];
  return (
    <li className="xp">
      <span className="xp-ico" style={{ "--tint": item.tint }} aria-hidden="true">
        <Icon />
      </span>

      <div className="xp-main">
        <h3>
          {item.org}
          {item.type && <em className="xp-type">{item.type}</em>}
        </h3>
        <p className="xp-role">{item.role}</p>
        <p className="xp-detail">{item.detail}</p>
      </div>

      <div className="xp-when">
        <span className="xp-years">{item.years}</span>
        {item.location && <span className="xp-loc">{item.location}</span>}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="sec-head">
        <h2>Experience so far</h2>
      </div>

      <ul className="xp-list">
        {experience.map((item) => (
          <Row key={item.org + item.role} item={item} />
        ))}
      </ul>

      <div className="honor-strip">
        {honors.map((h) => (
          <div className="honor" key={h.label}>
            <strong>{h.value}</strong>
            <span>{h.label}</span>
            {h.note && <em>{h.note}</em>}
          </div>
        ))}
      </div>

      <div className="edu">
        <div className="edu-main">
          <strong>{education.degree}</strong>
          <span>{education.school}</span>
        </div>
        <div className="edu-right">
          <span className="edu-years">{education.years}</span>
          <div className="edu-bar" role="img" aria-label={`${education.progress}% complete`}>
            <div style={{ width: `${education.progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
