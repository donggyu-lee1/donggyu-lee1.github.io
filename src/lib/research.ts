export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  topic: "llm" | "geo";
  href: string;
  projectUrl?: string;
  summary: string;
}

export const publications: Publication[] = [
  {
    id: "01",
    title: "Ideological Bias in LLMs’ Economic Causal Reasoning",
    authors: "Donggyu Lee, Hyeok Yun, Jungwon Kim, Junsik Min, Sungwon Park, Sangyoon Park, Jihee Kim",
    venue: "COLM 2026",
    topic: "llm",
    summary: "Examines ideological bias in language models’ reasoning about cause and effect in economics.",
    href: "https://arxiv.org/abs/2604.21334",
    projectUrl: "https://econai.kaist.ac.kr/ideological-bias-in-llms/"
  },
  {
    id: "02",
    title: "EconCausal: A Context-Aware Causal Reasoning Benchmark for Large Language Models in Social Science",
    authors: "Donggyu Lee, Hyeok Yun, Meeyoung Cha, Sungwon Park, Sangyoon Park, Jihee Kim",
    venue: "NeurIPS 2026 EconML Workshop",
    topic: "llm",
    summary: "Tests whether language models can transfer causal knowledge between social-science contexts.",
    href: "https://arxiv.org/abs/2510.07231",
    projectUrl: "https://econai.kaist.ac.kr/econcausal/"
  },
  {
    id: "03",
    title: "From Simulated Citizens to Simulated Deliberation: Challenges in Representation and Interaction",
    authors: "Chaemin Jang, Junsik Min, Jaewoo Choi, Donggyu Lee, Haiin Lee, Junyoung Park, Namhee Kim, Hyunwoo Kim, Jungwon Kim, Juho Kim, Nuri Kim, Jihee Kim",
    venue: "NeurIPS 2026 SocialAgent Workshop · NeurIPS 2026 UserSim Workshop",
    topic: "llm",
    summary: "Studies representation and interaction challenges when language models simulate citizens and deliberation.",
    href: "https://arxiv.org/abs/2609.07573"
  },
  {
    id: "04",
    title: "Tracking Economic Disparities in North Korea: Satellite Imagery Analysis Using AI with Policy Insights",
    authors: "Sumin Lee, Hyoshin Kim, Donghyun Ahn, Donggyu Lee, Jungwon Kim, Hyeok Yun, Chaemin Jang, Dongman Lee, Meeyoung Cha, Jihee Kim",
    venue: "ACM GOODIT 2025",
    topic: "geo",
    summary: "Uses satellite imagery and AI to study regional economic disparities in North Korea.",
    href: "https://dl.acm.org/doi/10.1145/3748699.3749786"
  },
  {
    id: "05",
    title: "LLM-Driven Socio-Economic Estimation for Visegrád Countries",
    authors: "Donghyun Ahn, Sumin Lee, Donggyu Lee, Jungwon Kim, Sungwon Han, Seungeon Lee, Younhyung Chae, Jihee Kim, Meeyoung Cha",
    venue: "ACM GOODIT 2025",
    topic: "geo",
    summary: "Explores language models for estimating socioeconomic conditions in the Visegrád countries.",
    href: "https://dl.acm.org/doi/10.1145/3748699.3749803"
  }
];
