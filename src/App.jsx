import { FaGithub, FaLinkedinIn, FaEnvelope, FaArrowUp } from "react-icons/fa6";
import ProfileCard from "./ProfileCard.jsx";
import Contributions, { useContributions } from "./Contributions.jsx";
import Experience from "./Experience.jsx";
import Achievements from "./Achievements.jsx";
import Work from "./Work.jsx";
import Mascot from "./Mascot.jsx";
import { Oneko } from "./oneko/index.js";
import { profile, quote } from "./data.js";

export default function App() {
  // Fetched once here so the hero and the graph share a single request.
  const contributions = useContributions(profile.githubUser);
  const total = contributions.status === "ok" ? contributions.data.total.lastYear : null;

  return (
    <div className="page">
      <Oneko />
      <header className="topbar">
        <a className="wordmark" href="#top">
          nitin
          <span className="wordmark-stroke" aria-hidden="true" />
        </a>
        <nav aria-label="Sections">
          <a href="#contributions">Activity</a>
          <a href="#experience">Experience</a>
          <a href="#achievements">Achievements</a>
          <a href="#work">Work</a>
        </nav>
        <a className="topbar-cta" href={`mailto:${profile.email}`}>
          Get in touch
        </a>
      </header>

      <main>
        <ProfileCard contributionTotal={total} />
        <Contributions user={profile.githubUser} profileUrl={profile.github} state={contributions} />
        <Experience />
        <Achievements />
        <Work />

        <section className="quote-sec">
          <span className="quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>{quote}</blockquote>
          <cite>— Nitin</cite>
          <Mascot />
        </section>
      </main>

      <footer>
        <div className="foot-left">
          <span className="foot-name">{profile.name}</span>
          <span className="foot-line">Don't make the little robot walk too far.</span>
        </div>
        <div className="foot-right">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FaEnvelope />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a className="foot-home" href="#top">
            <FaArrowUp aria-hidden="true" /> Home
          </a>
        </div>
        <div className="foot-fine">© {new Date().getFullYear()} {profile.name} · Built in India</div>
      </footer>
    </div>
  );
}
