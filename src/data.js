export const profile = {
  name: "Nitin K. Mishra",
  initials: "NM",
  // Drop your photo at public/profile.jpg and it shows in the About card.
  photo: "/profile.jpg",
  role: "AI Engineer",
  tagline: "I build AI systems that ship — not demos.",
  location: "Bhopal, India",
  status: "Products Before Pitch Decks.",
  email: "nitiniszod10@gmail.com",
  github: "https://github.com/nitinog10",
  githubLabel: "github.com/nitinog10",
  portfolio: "https://nitinn.dev",
  portfolioLabel: "nitinn.dev",
  linkedin: "https://www.linkedin.com/in/nitin-k-mishra-520615331",
  linkedinLabel: "in/nitin-k-mishra",
};

export const traits = ["Polymath", "Generalist", "AI Native", "Software Craftsman", "Synthesist"];

export const intro = [
  {
    text: "I'm Nitin — an AI engineer based in India building ",
    marks: ["MCP Servers", "Multi-Agent Systems", "LLM Based systems"],
    tail: " and platforms that people actually use, from idea to shipped.",
  },
  {
    text: "My work sits at the intersection of ",
    marks: ["AI engineering", "ML Systems", "Product thinking"],
    tail: ". I care about human-centered AI tools that reduce complexity instead of adding to it.",
  },
];

export const skills = [
  { group: "AI Engineering", color: "violet", items: ["RAG", "AI Agents", "LangGraph", "Prompt Engineering", "Voice AI / TTS"] },
  { group: "Model Work", color: "blue", items: ["Transformers", "Fine-tuning", "LoRA", "Whisper"] },
  { group: "Backend", color: "orange", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
  { group: "Frontend", color: "ink", items: ["React", "Next.js", "TailwindCSS"] },
];

export const experience = [
  {
    years: "2026",
    role: "SDE Intern",
    org: "EnTop Learning",
    desc: "Full-stack features and AI-assisted learning workflows in production.",
  },
  {
    years: "2026",
    role: "Mentor",
    org: "GSSoC'26",
    desc: "Mentoring contributors on the Open Source & Agentic AI track.",
  },
  {
    years: "2025",
    role: "AI Developer & Technical Operations",
    org: "Haron India",
    desc: "Built and ran AI systems and the technical operations behind them.",
  },
  {
    years: "2025–26",
    role: "Head Alumni",
    org: "Student Activity Council, OIST",
    desc: "Building the alumni network connecting students to industry.",
  },
  {
    years: "Now",
    role: "Founder",
    org: "Logorhythms",
    desc: "Building a creative-tech practice — brand systems and web experiences as one discipline.",
  },
];

export const honors = [
  { title: "NASA Space Apps Challenge'25", sub: "Regional Winner · Global Nominee" },
  { title: "OpenAI Builders Hackathon", sub: "Finalist" },
  { title: "6×", sub: "Hackathon Wins", counter: true },
  { title: "19×", sub: "Hackathon Finalist", counter: true },
];

export const projects = [
  {
    name: "DocuVerse",
    icon: "brain",
    color: "violet",
    tags: ["RAG", "Agents", "Knowledge Systems"],
    desc: "AI knowledge platform turning documents, conversations, and repos into actionable intelligence.",
    span: 2,
  },
  {
    name: "SonicPersona",
    icon: "mic",
    color: "orange",
    tags: ["Voice AI", "LoRA", "XTTS-v2", "Whisper"],
    desc: "Learns a person's vocal identity — personalized TTS fine-tuned with LoRA adapters, served real-time.",
  },
  {
    name: "CampusMitra",
    icon: "cap",
    color: "blue",
    tags: ["RAG", "Multi-agent"],
    desc: "Campus assistant on custom RAG — course-catalog search and scheduling for students.",
  },
  {
    name: "Mini-SLM",
    icon: "chip",
    color: "violet",
    tags: ["Transformers", "BPE", "WikiText-2"],
    desc: "GPT-style transformer (~7.3M params) with a custom BPE tokenizer, built end to end.",
  },
  {
    name: "CortexDev",
    icon: "code",
    color: "orange",
    tags: ["Codegen", "LoRA"],
    desc: "Fine-tuned CodeGen-350M producing clean, executable, code-only Python.",
  },
  {
    name: "AQI Intelligence",
    icon: "wind",
    color: "blue",
    tags: ["Forecasting", "Analytics"],
    desc: "National air-quality pipeline predicting regional index shifts 24h in advance.",
  },
];

export const education = {
  years: "2024 — 2028",
  degree: "B.Tech — Artificial Intelligence / AIML",
  school: "Oriental Group of Institutes",
};
