export interface QuizOption {
  text: string;
  levelWeights: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "When you get a writing assignment, what's your first instinct?",
    options: [
      { text: "Open a blank doc and start writing from scratch", levelWeights: { 1: 5, 2: 2, 3: 0, 4: 0, 5: 0 } },
      { text: "Brainstorm ideas with AI, then write it myself", levelWeights: { 1: 0, 2: 5, 3: 2, 4: 0, 5: 0 } },
      { text: "Draft with AI help, then heavily edit and revise", levelWeights: { 1: 0, 2: 1, 3: 5, 4: 2, 5: 0 } },
      { text: "Use AI as a co-writer and focus on directing it well", levelWeights: { 1: 0, 2: 0, 3: 1, 4: 5, 5: 3 } },
    ],
  },
  {
    question: "How do you feel about AI-generated content in your work?",
    options: [
      { text: "I'd rather do everything myself — it feels more authentic", levelWeights: { 1: 5, 2: 3, 3: 0, 4: 0, 5: 0 } },
      { text: "It's fine for idea generation, but the final work should be mine", levelWeights: { 1: 1, 2: 4, 3: 3, 4: 0, 5: 0 } },
      { text: "I'm comfortable using AI output if I understand and improve it", levelWeights: { 1: 0, 2: 0, 3: 4, 4: 4, 5: 1 } },
      { text: "AI is a tool like any other — the skill is in how you use it", levelWeights: { 1: 0, 2: 0, 3: 1, 4: 3, 5: 5 } },
    ],
  },
  {
    question: "How comfortable are you prompting AI tools?",
    options: [
      { text: "I've never really tried — or I'm not interested", levelWeights: { 1: 5, 2: 2, 3: 0, 4: 0, 5: 0 } },
      { text: "I can do basic prompts but nothing advanced", levelWeights: { 1: 0, 2: 4, 3: 3, 4: 0, 5: 0 } },
      { text: "I know how to write good prompts and iterate on results", levelWeights: { 1: 0, 2: 0, 3: 3, 4: 5, 5: 2 } },
      { text: "I experiment with complex prompts, chaining, and system instructions", levelWeights: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 5 } },
    ],
  },
  {
    question: "When it comes to verifying AI-generated information, you...",
    options: [
      { text: "Avoid AI content entirely to prevent accuracy issues", levelWeights: { 1: 5, 2: 2, 3: 0, 4: 0, 5: 0 } },
      { text: "Check every AI-generated fact against reliable sources", levelWeights: { 1: 1, 2: 3, 3: 5, 4: 2, 5: 0 } },
      { text: "Spot-check key claims and trust AI for common knowledge", levelWeights: { 1: 0, 2: 0, 3: 2, 4: 5, 5: 2 } },
      { text: "Build verification into your AI workflow systematically", levelWeights: { 1: 0, 2: 0, 3: 1, 4: 3, 5: 5 } },
    ],
  },
  {
    question: "What excites you most about AI in education?",
    options: [
      { text: "Nothing — I think it could undermine real learning", levelWeights: { 1: 5, 2: 2, 3: 0, 4: 0, 5: 0 } },
      { text: "It could help me understand difficult concepts better", levelWeights: { 1: 0, 2: 4, 3: 4, 4: 1, 5: 0 } },
      { text: "It lets me produce higher-quality work faster", levelWeights: { 1: 0, 2: 0, 3: 2, 4: 5, 5: 2 } },
      { text: "It opens up entirely new ways of creating and thinking", levelWeights: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 5 } },
    ],
  },
  {
    question: "How do you approach citing or disclosing AI use?",
    options: [
      { text: "I don't use AI, so there's nothing to cite", levelWeights: { 1: 5, 2: 1, 3: 0, 4: 0, 5: 0 } },
      { text: "I mention that I used AI if asked", levelWeights: { 1: 0, 2: 4, 3: 2, 4: 0, 5: 0 } },
      { text: "I include an AI disclosure statement with my submissions", levelWeights: { 1: 0, 2: 0, 3: 5, 4: 3, 5: 1 } },
      { text: "I document my full AI process — prompts, iterations, and rationale", levelWeights: { 1: 0, 2: 0, 3: 1, 4: 3, 5: 5 } },
    ],
  },
];

export interface LevelDescription {
  level: number;
  name: string;
  summary: string;
  color: string;
  href: string;
}

export const levelDescriptions: LevelDescription[] = [
  { level: 1, name: "No AI", summary: "You prefer to work independently without AI assistance. Some assignments require this approach.", color: "text-red-500", href: "/assessment-scale/1" },
  { level: 2, name: "AI for Planning", summary: "You're comfortable using AI for brainstorming and planning, but want to do the actual work yourself.", color: "text-orange-500", href: "/assessment-scale/2" },
  { level: 3, name: "AI Collaboration", summary: "You see AI as a collaborative partner for drafting and revision, while maintaining ownership of the final product.", color: "text-yellow-600", href: "/assessment-scale/3" },
  { level: 4, name: "AI Integration", summary: "You're skilled at directing AI tools and integrating their output into high-quality work.", color: "text-sky-blue", href: "/assessment-scale/4" },
  { level: 5, name: "AI Exploration", summary: "You push the boundaries of what's possible with AI, experimenting with creative and advanced workflows.", color: "text-gator-green", href: "/assessment-scale/5" },
];

export interface QuizResult {
  level: number;
  confidence: number;
  description: LevelDescription;
}

export function calculateResult(answers: number[]): QuizResult {
  const totals: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  answers.forEach((optionIndex, questionIndex) => {
    const option = quizQuestions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [level, weight] of Object.entries(option.levelWeights)) {
      totals[Number(level)] += weight;
    }
  });

  const maxScore = Math.max(...Object.values(totals));
  const level = Number(Object.entries(totals).reduce((a, b) => (b[1] > a[1] ? b : a))[0]);
  const totalPoints = Object.values(totals).reduce((sum, v) => sum + v, 0);
  const confidence = totalPoints > 0 ? Math.round((maxScore / totalPoints) * 100) : 0;

  return {
    level,
    confidence,
    description: levelDescriptions[level - 1],
  };
}
