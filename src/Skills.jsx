import {
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiLangchain,
  SiHuggingface,
  SiPytorch,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

const stack = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "React", Icon: SiReact, color: "#149ECA" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#17171b" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "LangGraph", Icon: SiLangchain, color: "#1C3C3C" },
  { name: "HuggingFace", Icon: SiHuggingface, color: "#FF9D00" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "OpenAI", Icon: RiOpenaiFill, color: "#0FA47F" },
];

const concepts = [
  "RAG",
  "AI Agents",
  "MCP Servers",
  "Prompt Engineering",
  "Voice AI / TTS",
  "Fine-tuning · LoRA",
  "System Design",
];

export default function Skills() {
  return (
    <>
      <div className="stack-grid">
        {stack.map(({ name, Icon, color }) => (
          <div className="stack-tile" key={name} style={{ "--brand": color }}>
            <Icon className="stack-ico" aria-hidden="true" />
            <span className="stack-name">{name}</span>
          </div>
        ))}
      </div>
      <div className="concepts">
        {concepts.map((c) => (
          <span className="concept" key={c}>{c}</span>
        ))}
      </div>
    </>
  );
}
