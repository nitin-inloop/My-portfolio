import { FaTrophy, FaMedal, FaAward, FaStar, FaLightbulb } from "react-icons/fa6";
import { achievements, education } from "./data.js";

const icons = {
  trophy: FaTrophy,
  medal: FaMedal,
  award: FaAward,
  star: FaStar,
  bulb: FaLightbulb,
};

export default function Achievements() {
  return (
    <section className="sec" id="achievements">
      <div className="sec-head">
        <h2>What I've achieved so far</h2>
      </div>

      <ul className="ach-list">
        {achievements.map((a) => {
          const Icon = icons[a.icon];
          return (
            <li className="ach" key={a.title} style={{ "--tint": a.tint }}>
              <span className="ach-ico" aria-hidden="true">
                <Icon />
              </span>

              <div className="ach-main">
                <h3>{a.title}</h3>
                {a.note && <p>{a.note}</p>}
              </div>

              <span className="ach-rank">{a.rank}</span>
            </li>
          );
        })}
      </ul>

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
