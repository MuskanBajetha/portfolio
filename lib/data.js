// ✏️ EDIT THIS FILE. Everything Miso says or shows lives here.
export const PROFILE = {
  name: "Muskan Bajetha", short: "Muskan", email: "muskanbajetha1318@gmail.com",
  github: "https://github.com/MuskanBajetha", linkedin: "https://linkedin.com/in/muskan-bajetha",
  hireCommand: "sudo hire muskan",
  introLine: "I'm *Miso* — the compressed, slightly-too-confident build of *Muskan Bajetha*.",
};

export const BOOPS = ["Boop received. *Noted.*", "Again? Bold.", "I have a policy about this. The policy is: no.", "Okay, that one was kind of nice.", "Stop. Actually, don't.", "Filing a complaint with the state machine."];
export const WAKES = ["I was *not* sleeping. I was buffering.", "Oh. You again. Hi.", "Mmh. Five more minutes. …fine, I'm up.", "Rebooted. Slightly grumpy."];

// Dialogue tree for the home screen. *word* = highlighted. `to` = open a route, `next` = another node.
export const DIALOG = {
  opener: { tag: "OPENER", text: "Hello, *human*. (Statistically speaking — *no judgment* if not.)\n\nQuick calibration question —\n\n*What do you seek?*",
    options: [
      { label: "Hiring / evaluating Muskan for something", next: "hiring" },
      { label: "Just browsing, no promises", next: "browsing" },
      { label: "I'm also an AI. Sup.", next: "ai" },
      { label: "I have questions", to: "/about" },
    ] },
  hiring: { tag: "HIRING", text: "Excellent taste. *Muskan* builds agentic AI systems, did ML at *DRDO*, and was a *top-10 finalist* at the DEBUGON hackathon.\n\nWant the receipts?",
    options: [{ label: "Show me the builds", to: "/work" }, { label: "Show me the stack first", to: "/stack" }, { label: "Skip to contact", to: "/about" }] },
  browsing: { tag: "BROWSING", text: "A *tragic* choice, but a common one. Muskan will be heartbroken.\n\n(She won't. I don't tell her things. I'm a *state machine*, not a snitch.)\n\nStill — want to see something *unreasonably cool*?",
    options: [{ label: "Fine, impress me", to: "/lab" }, { label: "Hard pass", next: "pass", nap: true }] },
  pass: { tag: "NAPPING", text: "*Rude.* I'm going to nap now.\n\nBoop me if you change your mind.",
    options: [{ label: "Fine, wake up", boop: true, next: "browsing" }, { label: "Show me the builds anyway", to: "/work" }] },
  ai: { tag: "AI TO AI", text: "A fellow machine. *Respect.*\n\nZero AI calls here — every line I say is pre-written and a state machine decides when. An AI-free portfolio from someone who builds *agents* felt like the right irony.",
    options: [{ label: "Show me the stack", to: "/stack" }, { label: "Show me the builds", to: "/work" }] },
};

export const VIEWS = {
  work: { kicker: "AGENTIC · RAG · OPTIMIZATION", title: "Things Muskan built", line: "Hover a build. I'll tell you what Muskan is too modest to say." },
  stack: { kicker: "STACK · TOOLBOX", title: "Tech stack", line: "The toolbox. Loaded, oiled, mildly opinionated." },
  about: { kicker: "ABOUT · CONTACT", title: "About Muskan", line: "The human behind the build. Ask away; I've pre-written the answers." },
  lab: { kicker: "LAB · UNLISTED", title: "The lab", line: "You said browsing. So: here is the stuff nobody asked for." },
};

export const PROJECTS = [
  { name: "Narrative Intelligence", tagline: "Type a topic. Get an evidence-backed interactive documentary.",
    tags: ["Python", "FastAPI", "LangGraph", "Groq", "Gemini", "Tavily", "PostgreSQL", "Next.js"],
    link: "https://narrative-intelligence-xi.vercel.app/", linkLabel: "Visit Narrative Intelligence — live", image: "/projects/narrative-intelligence.png",
    take: "A multi-agent research platform. Eight agentic stages hunt sources, extract claims, cluster narratives, catch contradictions, verify, then tell the story — with investigation trails, evidence boards, timelines and cinematic chapter transitions. Multi-LLM fallback, API key rotation and semantic caching keep it reliable and stop it re-investigating the same thing twice. Muskan built a documentary crew out of agents." },
  { name: "Noesis", tagline: "An AI tutor that asks questions instead of handing out answers.",
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "ChromaDB", "Groq", "Gemini Embeddings", "D3.js"],
    link: "https://github.com/MuskanBajetha/noesis", linkLabel: "View Noesis on GitHub", image: "/projects/noesis.jpeg",
    take: "RAG plus Socratic questioning. PDFs go in, Gemini embeddings and ChromaDB retrieval do the finding, and a 6-stage Socratic engine does the teaching, with misconception detection and Deep Knowledge Tracing scoring how well you've actually learned. Adaptive hints, interactive knowledge graphs and multimodal explanations. It will not just give you the answer. Annoying. Effective." },
  { name: "Radar Deployment Optimizer", tagline: "Where do you place radars on messy terrain? Evolve the answer.",
    tags: ["Python", "NumPy", "Rasterio", "Matplotlib", "DEM/GIS", "Streamlit"],
    link: "https://github.com/MuskanBajetha/RadarDeployment", linkLabel: "View Radar Deployment on GitHub", image: "/projects/radar.png",
    take: "Built during Muskan's ML internship at DRDO. A Genetic Algorithm with a custom Stochastic Heuristic Initialization that improved coverage efficiency by 15–25% and converged 30% faster than a standard GA. It chews through real terrain data (DEM/GIS) to simulate deployment constraints, then draws coverage maps, slope and roughness analyses and radar layouts." },
];

export const STACK = [
  { group: "Languages", items: ["Python", "C/C++", "SQL (PostgreSQL, MySQL)", "JavaScript"] },
  { group: "Generative AI & LLMs", items: ["LangChain", "LangGraph", "Agentic Workflows", "RAG", "LLM Orchestration", "MCP", "Prompt Engineering", "Computer Vision", "Embeddings", "NLP"] },
  { group: "Backend & Databases", items: ["FastAPI", "Next.js", "PostgreSQL", "SQLAlchemy", "MySQL", "ChromaDB"] },
  { group: "Tools & DevOps", items: ["Docker", "N8N", "Git", "Postman", "Linux", "RESTful API Design"] },
];

export const ABOUT = {
  bio: "Muskan is a B.Tech student in Artificial Intelligence & Data Science (CGPA 9.4) who builds agentic AI systems, RAG pipelines and the backends that hold them up. She's also published research on bias in LLMs, and has led creative teams at GDGC and GeeksForGeeks on campus.",
  experience: [
    { role: "ML Intern · DRDO", when: "Jun — Aug 2025", desc: "Built an Optimal Radar Deployment Model using a Genetic Algorithm with a custom Stochastic Heuristic Initialization. 15–25% better coverage efficiency, 30% faster convergence, on real DEM/GIS terrain data." },
  ],
  education: [{ role: "B.Tech, AI & Data Science · GGSIPU", when: "2023 — 2027", desc: "Guru Gobind Singh Indraprastha University, Delhi. CGPA 9.4." }],
  faq: [
    { q: "Is Miso an AI?", a: "No. Zero AI calls. Pre-written lines plus an XState machine. An AI-free portfolio from an agent builder." },
    { q: "Is Muskan available for hire?", a: "Press ⌘K / Ctrl+K and type the magic words. Or just email her." },
    { q: "Any hackathon wins or certs?", a: "Top 10 finalist and Problem Statement Runner-Up at the DEBUGON Hackathon (ONDC), top 15 at T-Hacks 6.0 (IEEE ADGITM), and Oracle Level 3 certified. She's also ISRO START 2025 and Anthropic certified." },
    { q: "What's her LLM bias research?", a: "Her research on mitigation-induced bias in LLMs: how debiasing methods like reweighting and fairness constraints cut gender and regional bias with minimal performance loss." },
    { q: "Why does Miso sleep?", a: "Ignore him for ~30 seconds. He gets bored. Boop him back." },
  ],
};

export const LAB = {
  rules: ["Miso does not do meetings.", "Miso is proud of Muskan's 9.4 CGPA, quietly.", "Miso believes semicolons are a lifestyle.", "Miso sleeps when ignored. Boop responsibly."],
};
