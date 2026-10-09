import {
  SiPython,
  SiJavascript,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
  SiScikitlearn,
  SiModelcontextprotocol,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiStreamlit,
  SiGradio,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

const stack = [
  { name: "Python", Icon: SiPython, color: "#4B8BBE" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "Hugging Face", Icon: SiHuggingface, color: "#FFB000" },
  { name: "LangGraph", Icon: SiLangchain, color: "#5BC8AC" },
  { name: "OpenAI", Icon: RiOpenaiFill, color: "#10A37F" },
  { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "MCP", Icon: SiModelcontextprotocol, color: "#D6D9DE" },
  { name: "NumPy", Icon: SiNumpy, color: "#4D77CF" },
  { name: "pandas", Icon: SiPandas, color: "#B39DDB" },
  { name: "Plotly", Icon: SiPlotly, color: "#7A76FF" },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  { name: "Gradio", Icon: SiGradio, color: "#F97316" },
  { name: "FastAPI", Icon: SiFastapi, color: "#12A594" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#69B34C" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#5B8DEF" },
  { name: "Redis", Icon: SiRedis, color: "#FF5C4D" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#E5E7EB" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
];

export default function Skills() {
  return (
    <section className="sec" id="stack">
      <div className="sec-head">
        <h2>Tech stack</h2>
        <span className="sec-link">{stack.length} tools</span>
      </div>

      <ul className="stack-row">
        {stack.map(({ name, Icon, color }) => (
          <li key={name} style={{ "--brand": color }} title={name}>
            <Icon aria-hidden="true" />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
