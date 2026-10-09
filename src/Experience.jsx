import { FaWandMagicSparkles, FaCode, FaPeopleGroup, FaBrain, FaGraduationCap } from "react-icons/fa6";
import { experience } from "./data.js";

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
        {item.logo ? <img className="xp-logo" src={item.logo} alt="" loading="lazy" /> : <Icon />}
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
    </section>
  );
}
