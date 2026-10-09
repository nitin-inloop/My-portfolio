/* Shared tech-icon registry: one key per technology, used by the project cards. */
import {
  SiPython,
  SiPytorch,
  SiHuggingface,
  SiStreamlit,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiGradio,
  SiLangchain,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiPlotly,
  SiNodedotjs,
  SiSupabase,
  SiModelcontextprotocol,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

export const TECH = {
  python: { name: "Python", Icon: SiPython, color: "#4B8BBE" },
  pytorch: { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  huggingface: { name: "Hugging Face", Icon: SiHuggingface, color: "#FFB000" },
  streamlit: { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  sklearn: { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  numpy: { name: "NumPy", Icon: SiNumpy, color: "#4D77CF" },
  pandas: { name: "pandas", Icon: SiPandas, color: "#B39DDB" },
  gradio: { name: "Gradio", Icon: SiGradio, color: "#F97316" },
  langchain: { name: "LangChain", Icon: SiLangchain, color: "#5BC8AC" },
  fastapi: { name: "FastAPI", Icon: SiFastapi, color: "#12A594" },
  react: { name: "React", Icon: SiReact, color: "#61DAFB" },
  next: { name: "Next.js", Icon: SiNextdotjs, color: "#E5E7EB" },
  tailwind: { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  postgres: { name: "PostgreSQL", Icon: SiPostgresql, color: "#5B8DEF" },
  plotly: { name: "Plotly", Icon: SiPlotly, color: "#7A76FF" },
  node: { name: "Node.js", Icon: SiNodedotjs, color: "#69B34C" },
  supabase: { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  openai: { name: "OpenAI", Icon: RiOpenaiFill, color: "#10A37F" },
  mcp: { name: "MCP", Icon: SiModelcontextprotocol, color: "#D6D9DE" },
  aws: { name: "AWS", Icon: FaAws, color: "#FF9900" },
};

export function TechRow({ keys }) {
  return (
    <div className="tech-row">
      {keys.map((k) => {
        const t = TECH[k];
        if (!t) return null;
        return (
          <span className="tech" key={k} style={{ "--brand": t.color }} title={t.name}>
            <t.Icon aria-hidden="true" />
            <i className="sr-only">{t.name}</i>
          </span>
        );
      })}
    </div>
  );
}
