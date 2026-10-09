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
        <div className="exp-card">
          {experience.map((e) => (
            <div className="exp-row" key={e.role + e.org}>
              <span className="exp-years">{e.years}</span>
              <div className="exp-main">
                <strong>{e.role}</strong>
                <span className="exp-org">{e.org}</span>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="honors">
          <span className="honors-label">★ Honors</span>
          <div className="honors-grid">
            {honors.map((h) => (
              <div className={h.counter ? "honor counter" : "honor"} key={h.title}>
                <strong>{h.title}</strong>
                <span>{h.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="edu-bar">
          <span className="edu-years">{education.years}</span>
          <div className="edu-main">
            <strong>{education.degree}</strong>
            <span>{education.school}</span>
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
        <div className="contact-grid">
          <a className="ct-card wide" href={`mailto:${profile.email}`}>
            <span className="ct-ico violet"><FaEnvelope /></span>
            <div className="ct-body">
              <span className="ct-kind">EMAIL</span>
              <strong>{profile.email}</strong>
            </div>
            <span className="ct-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="ct-card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="ct-ico linkedin"><FaLinkedinIn /></span>
            <div className="ct-body">
              <span className="ct-kind">LINKEDIN</span>
              <strong>{profile.linkedinLabel}</strong>
            </div>
            <span className="ct-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="ct-card violet" href={profile.portfolio} target="_blank" rel="noopener noreferrer">
            <span className="ct-ico ondark"><FaGlobe /></span>
            <div className="ct-body">
              <span className="ct-kind">PORTFOLIO</span>
              <strong>{profile.portfolioLabel}</strong>
            </div>
            <span className="ct-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="ct-card dark wide" href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="ct-ico ondark"><FaGithub /></span>
            <div className="ct-body">
              <span className="ct-kind">GITHUB</span>
              <strong>{profile.githubLabel}</strong>
            </div>
            <span className="ct-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <span className="foot-logo">nitin</span>
        <span className="foot-fine">© 2026 NITIN K. MISHRA · BUILT WITH REACT · MADE IN INDIA ♥</span>
      </footer>
    </div>
  );
}
