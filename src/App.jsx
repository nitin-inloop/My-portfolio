import Mascot from "./Mascot.jsx";
import Skills from "./Skills.jsx";
import { FaBrain, FaMicrophone, FaGraduationCap, FaMicrochip, FaCode, FaWind, FaGithub, FaLinkedinIn, FaEnvelope, FaGlobe, FaTrophy, FaMedal, FaAward, FaStar } from "react-icons/fa6";
import {
  profile,
  traits,
  intro,
  experience,
  honors,
  projects,
  education,
} from "./data.js";

const projIcons = {
  brain: <FaBrain />,
  mic: <FaMicrophone />,
  cap: <FaGraduationCap />,
  chip: <FaMicrochip />,
  code: <FaCode />,
  wind: <FaWind />,
};

/* q11-style boxed section title with RGB-fringe text and a pointer arrow */
function SecTitle({ children, center }) {
  return (
    <div className={center ? "sec-title center" : "sec-title"}>
      <span className="sec-box">
        <span className="sec-arrow" aria-hidden="true">▶</span>
        <h2>{children}</h2>
      </span>
    </div>
  );
}

function Mark({ children }) {
  return <span className="mark">{children}</span>;
}


export default function App() {
  return (
    <div className="page">
      {/* ---------- nav ---------- */}
      <header className="nav">
        <a className="logo" href="#top">nitin</a>
        <nav aria-label="Sections">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-gh" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </header>

      {/* ---------- hero (dark card) ---------- */}
      <section className="hero-wrap" id="about">
        <div className="hero">
          <div className="hero-body">
            <p className="status-line">
              <span className="status-dot" />
              {profile.status}
            </p>
            <p className="hello">// hello world, I'm</p>
            <h1>
              Nitin K. <em>Mishra</em>
            </h1>
            <p className="role-line">
              {profile.role} · {profile.location}
            </p>

            {intro.map((p, i) => (
              <p className="intro" key={i}>
                {p.text}
                {p.marks.map((m, j) => (
                  <span key={m}>
                    <Mark>{m}</Mark>
                    {j < p.marks.length - 2 ? ", " : j === p.marks.length - 2 ? " and " : ""}
                  </span>
                ))}
                {p.tail}
              </p>
            ))}

            <div className="hero-cta">
              <a className="btn solid" href={`mailto:${profile.email}`}>Email me</a>
              <a className="btn ghost" href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                {profile.portfolioLabel} ↗
              </a>
            </div>
          </div>
          <Mascot />
        </div>

        <div className="traits">
          {traits.map((t, i) => (
            <span className={`trait trait-${i % 3}`} key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* ---------- experience ---------- */}
      <section id="experience">
        <SecTitle>Experience</SecTitle>
        <div className="tl">
          {experience.map((e, i) => (
            <div className={`tl-item ${i % 2 ? "right" : "left"}`} key={e.role + e.org}>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-card">
                <span className="tl-years">{e.years}</span>
                <strong>{e.role}</strong>
                <span className="tl-org">@ {e.org}</span>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="honors">
          <span className="honors-label">★ Honors</span>
          <div className="stickers">
            {honors.map((h, i) => {
              const HonorIcon = [FaTrophy, FaMedal, FaAward, FaStar][i % 4];
              return (
                <div className={`sticker st-${i % 4}`} key={h.title}>
                  <HonorIcon aria-hidden="true" />
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="edu-bar">
          <span className="edu-years">{education.years}</span>
          <div className="edu-main">
            <strong>{education.degree}</strong>
            <span>{education.school}</span>
          </div>
          <div className="edu-progress">
            <span className="edu-progress-label">degree.exe — 50% compiled</span>
            <div className="bar"><div className="bar-fill" style={{ width: "50%" }} /></div>
          </div>
        </div>
      </section>

      {/* ---------- skills ---------- */}
      <section id="skills">
        <SecTitle>Skillset</SecTitle>
        <Skills />
      </section>

      {/* ---------- projects ---------- */}
      <section id="projects">
        <SecTitle>Projects</SecTitle>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <article className={p.span === 2 ? "proj flagship" : "proj"} key={p.name}>
              <span className="proj-num">{String(i + 1).padStart(2, "0")}</span>
              {p.span === 2 && <span className="flag-chip">FLAGSHIP</span>}
              <div className={`proj-ico ${p.color}`}>{projIcons[p.icon]}</div>
              <h3>{p.name}</h3>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span className="proj-tag" key={t}>{t}</span>
                ))}
              </div>
              <p>{p.desc}</p>
              <span className="proj-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
          <a
            className="proj gh-card"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="gh-big" aria-hidden="true" />
            <h3>More on GitHub →</h3>
            <span className="gh-chip">{profile.githubLabel}</span>
          </a>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact">
        <SecTitle>Contact</SecTitle>
        <div className="contact-box">
          <span className="cb-spark c1" aria-hidden="true">✦</span>
          <span className="cb-spark c2" aria-hidden="true">✚</span>
          <span className="cb-spark c3" aria-hidden="true">✦</span>
          <span className="cb-spark c4" aria-hidden="true">●</span>
          <span className="cb-script">say hello ✦</span>
          <h2>Let's build something real.</h2>
          <p className="cb-sub">Open to AI engineering roles, collaborations, and ambitious problems.</p>
          <a className="cb-email" href={`mailto:${profile.email}`}>
            <FaEnvelope aria-hidden="true" /> {profile.email}
          </a>
          <div className="cb-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn aria-hidden="true" /> LinkedIn
            </a>
            <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
              <FaGlobe aria-hidden="true" /> Portfolio
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span className="foot-logo">nitin</span>
        <span className="foot-fine">© 2026 NITIN K. MISHRA · BUILT WITH REACT · MADE IN INDIA ♥</span>
      </footer>
    </div>
  );
}
