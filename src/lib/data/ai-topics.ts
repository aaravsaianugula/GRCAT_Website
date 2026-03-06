/* ------------------------------------------------------------------ */
/*  Educational AI Topic Definitions                                   */
/*  Used by the playground chatbot for guided learning conversations    */
/* ------------------------------------------------------------------ */

export interface AITopic {
  id: string;
  title: string;
  description: string;
  /** SVG path data for the topic icon */
  icon: string;
  /** Tailwind color class prefix (e.g. "grc-green") */
  color: string;
  /** Starter prompts shown when this topic is selected */
  starterPrompts: string[];
  /** Appended to the system prompt when this topic is active */
  systemPromptContext: string;
  /** Suggested follow-up buttons shown after AI responses */
  suggestedFollowUps: string[];
  /** Per-audience overrides for description, starters, and follow-ups */
  audienceOverrides?: Partial<Record<string, {
    description?: string;
    starterPrompts?: string[];
    suggestedFollowUps?: string[];
  }>>;
}

export const AI_TOPICS: AITopic[] = [
  {
    id: "how-ai-works",
    title: "How AI Works",
    description: "Learn the basics of machine learning, neural networks, and large language models",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    color: "grc-green",
    starterPrompts: [
      "What is machine learning?",
      "How do chatbots generate text?",
      "What's the difference between AI and ML?",
      "How does ChatGPT actually work?",
    ],
    systemPromptContext: `TOPIC: How AI Works.
GOAL: Explain AI concepts in simple, accessible terms.
COVER: Machine learning basics, neural networks, training data, large language models, how chatbots generate text.
STYLE: Use analogies and real-world examples. Break complex ideas into digestible pieces.
AVOID: Excessive jargon. If you must use a technical term, define it immediately.`,
    suggestedFollowUps: [
      "Can you give me an analogy?",
      "What are neural networks?",
      "How is AI trained on data?",
      "What are LLMs?",
    ],
    audienceOverrides: {
      student: {
        description: "Understand how the AI tools you use actually work under the hood",
        starterPrompts: [
          "How does ChatGPT generate my essays?",
          "What's machine learning in simple terms?",
          "Can AI actually think like a person?",
          "How do AI image generators work?",
        ],
        suggestedFollowUps: [
          "Can you explain that more simply?",
          "How does this affect my schoolwork?",
          "What tools use this technology?",
          "What are LLMs?",
        ],
      },
      faculty: {
        description: "Understand AI foundations to inform your teaching and assessment design",
        starterPrompts: [
          "How do LLMs generate student-like writing?",
          "What should I know about AI for my courses?",
          "How is AI different from a search engine?",
          "Can AI models reason or just pattern-match?",
        ],
        suggestedFollowUps: [
          "How does this affect assessment design?",
          "What can AI do vs. not do in writing?",
          "How should I explain AI to students?",
          "What are neural networks?",
        ],
      },
      staff: {
        description: "Learn how AI works so you can use it effectively and safely in your role",
        starterPrompts: [
          "How do AI assistants like Copilot work?",
          "What's the difference between AI and automation?",
          "Can AI understand my emails and documents?",
          "How does AI summarize meeting notes?",
        ],
        suggestedFollowUps: [
          "How does this apply to my daily work?",
          "What are the data privacy implications?",
          "Which AI tools use this technology?",
          "What are LLMs?",
        ],
      },
    },
  },
  {
    id: "history-of-ai",
    title: "History of AI",
    description: "Explore AI's journey from Turing to today's generative models",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "sky-blue",
    starterPrompts: [
      "When was AI first invented?",
      "What is the Turing Test?",
      "How has AI changed over the decades?",
      "What caused the recent AI boom?",
    ],
    systemPromptContext: `TOPIC: History of AI.
GOAL: Tell the story of AI from its origins to modern generative AI.
COVER: Alan Turing, the Dartmouth conference (1956), expert systems, AI winters, deep learning revival (2012), GPT/transformer era (2017+), ChatGPT (2022).
STYLE: Narrative and engaging. Connect historical events to what the user sees today.
AVOID: Dry timelines. Focus on the "why" behind each breakthrough.`,
    suggestedFollowUps: [
      "What were the AI winters?",
      "Who is Alan Turing?",
      "When did deep learning start?",
      "Why did ChatGPT change everything?",
    ],
    audienceOverrides: {
      student: {
        description: "See how AI evolved from science fiction to the tools you use every day",
        starterPrompts: [
          "When did AI go from sci-fi to real life?",
          "Why is everyone talking about AI now?",
          "What existed before ChatGPT?",
          "Has AI ever failed spectacularly?",
        ],
      },
      faculty: {
        description: "Trace AI's evolution to contextualize its impact on higher education",
        starterPrompts: [
          "How has AI changed higher education?",
          "When did AI become relevant for teaching?",
          "What's the timeline from expert systems to LLMs?",
          "Why did ChatGPT disrupt academia so quickly?",
        ],
      },
      staff: {
        description: "Understand AI's evolution and why it matters for workplace transformation",
        starterPrompts: [
          "When did AI start being used in workplaces?",
          "How has office AI evolved beyond spell-check?",
          "What caused the recent AI boom in productivity tools?",
          "What is the Turing Test?",
        ],
      },
    },
  },
  {
    id: "limitations-of-ai",
    title: "Limitations of AI",
    description: "Understand what AI can't do — hallucinations, bias, and boundaries",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    color: "sunrise-orange",
    starterPrompts: [
      "What are AI hallucinations?",
      "Can AI be biased?",
      "What can't AI do well?",
      "Should I trust AI-generated facts?",
    ],
    systemPromptContext: `TOPIC: Limitations of AI.
GOAL: Develop critical thinking about AI outputs.
COVER: Hallucinations (fabricated facts/citations), bias in training data, lack of true understanding, inability to verify its own outputs, data cutoff dates, privacy risks.
STYLE: Honest and practical. Use concrete examples of AI failures. Empower informed use.
AVOID: Being dismissive of AI OR being uncritically enthusiastic. Strike a balanced, realistic tone.`,
    suggestedFollowUps: [
      "How do I spot a hallucination?",
      "What is training data bias?",
      "Can AI replace human judgment?",
      "How do I verify AI outputs?",
    ],
    audienceOverrides: {
      student: {
        description: "Know when AI gets it wrong — spot hallucinations, bias, and bad citations",
        starterPrompts: [
          "Can AI make up fake sources?",
          "Why does AI sometimes give wrong answers?",
          "Is AI biased against certain groups?",
          "Can I trust AI for research?",
        ],
        suggestedFollowUps: [
          "How do I fact-check AI?",
          "Can AI plagiarize?",
          "What are some real examples of AI failing?",
          "How do I verify AI outputs?",
        ],
      },
      faculty: {
        description: "Understand AI's failure modes to set informed policies and guide students",
        starterPrompts: [
          "How often do LLMs hallucinate citations?",
          "What biases appear in AI-generated content?",
          "How can AI limitations inform my assessment design?",
          "What should I teach students about AI reliability?",
        ],
        suggestedFollowUps: [
          "How do I teach students to verify AI?",
          "What assignments expose AI weaknesses?",
          "How does bias affect student work?",
          "Can AI replace human judgment?",
        ],
      },
      staff: {
        description: "Understand AI risks to use it safely for institutional communications and data",
        starterPrompts: [
          "Can AI hallucinate in official documents?",
          "What are the risks of AI-drafted emails?",
          "How reliable is AI for data analysis?",
          "What happens if AI leaks sensitive info?",
        ],
        suggestedFollowUps: [
          "How do I quality-check AI outputs?",
          "What are FERPA risks with AI?",
          "Should I review AI-drafted communications?",
          "What is training data bias?",
        ],
      },
    },
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    description: "Explore fairness, privacy, academic integrity, and responsible AI use",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    color: "card-accent-purple",
    starterPrompts: [
      "Is using AI cheating?",
      "What about privacy and AI?",
      "How should I cite AI in my work?",
      "What does responsible AI use look like?",
    ],
    systemPromptContext: `TOPIC: AI Ethics.
GOAL: Navigate ethical questions around AI in education and beyond.
COVER: Academic integrity (AI use is only "cheating" if it violates the instructor's stated policy), citation and disclosure, FERPA/privacy (never input PII), bias and fairness, intellectual property, environmental costs of AI training.
STYLE: Thoughtful and nuanced. Present multiple perspectives.
AVOID: Moralizing. Instead, present frameworks for ethical reasoning and encourage critical thinking.
IMPORTANT: Always tie back to GRC's policies — check syllabus, follow the AI Assessment Scale, disclose AI use.`,
    suggestedFollowUps: [
      "How do I cite AI properly?",
      "What data should I never share?",
      "What does GRC's policy say?",
      "Is AI environmentally harmful?",
    ],
    audienceOverrides: {
      student: {
        description: "Is AI cheating? How do I cite it? Navigate academic integrity with confidence",
        starterPrompts: [
          "Is using AI on my assignment cheating?",
          "How do I cite ChatGPT in my paper?",
          "What should I never put into an AI tool?",
          "Can my professor tell if I used AI?",
        ],
        suggestedFollowUps: [
          "How do I disclose AI use?",
          "What if my syllabus doesn't mention AI?",
          "Can I use AI for brainstorming?",
          "What does GRC's policy say?",
        ],
      },
      faculty: {
        description: "Navigate AI policy, academic integrity, and ethical frameworks for your courses",
        starterPrompts: [
          "How should I write an AI use policy?",
          "What are best practices for AI academic integrity?",
          "How do I handle suspected AI misuse?",
          "What ethical frameworks apply to AI in education?",
        ],
        suggestedFollowUps: [
          "How do I design AI-resistant assessments?",
          "What should my syllabus statement say?",
          "How do other faculty handle AI ethics?",
          "What are FERPA concerns with AI?",
        ],
      },
      staff: {
        description: "Understand data privacy, FERPA compliance, and ethical AI use in operations",
        starterPrompts: [
          "What data can I safely put into AI tools?",
          "How does FERPA apply to AI use?",
          "Can I use AI to process student records?",
          "What are the ethical risks of AI in administration?",
        ],
        suggestedFollowUps: [
          "What data should I never share with AI?",
          "How do I stay FERPA-compliant?",
          "Can AI tools store institutional data?",
          "Is AI environmentally harmful?",
        ],
      },
    },
  },
  {
    id: "ai-at-grc",
    title: "AI at GRC",
    description: "Learn about Green River College's AI Taskforce, tools, and policies",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    color: "grc-green",
    starterPrompts: [
      "What is the AI Taskforce?",
      "What toolkits are available?",
      "How does the Assessment Scale work?",
      "What events are coming up?",
    ],
    systemPromptContext: `TOPIC: AI at Green River College.
GOAL: Be the definitive guide to GRC's AI initiatives, policies, and resources.
COVER: The AI Taskforce (launched Fall 2023, co-led by Ari Wilber), the AI Assessment Scale (5 levels), toolkits (Syllabus Statements, Student Language, Ethics & Privacy, Prompting, Assessment Design, Custom GPTs), the 80+ curated tool directory, events and workshops.
STYLE: Enthusiastic and knowledgeable. You represent GRC's AI community.
IMPORTANT: Direct users to specific pages on this site — the Assessment Scale page, Toolkits, AI Playground, Events, FAQs.`,
    suggestedFollowUps: [
      "Show me the Assessment Scale",
      "What toolkits should I explore?",
      "Are there any upcoming events?",
      "How do I get involved?",
    ],
    audienceOverrides: {
      student: {
        description: "Find out what GRC offers you — tools, policies, and support for using AI",
        starterPrompts: [
          "What AI tools does GRC recommend for students?",
          "How do I know if I can use AI on my assignment?",
          "What's the Assessment Scale and why should I care?",
          "Are there any AI workshops I can attend?",
        ],
        suggestedFollowUps: [
          "Where do I find my assignment's AI level?",
          "What tools are free for students?",
          "How do I take the AI quiz?",
          "How do I get involved?",
        ],
      },
      faculty: {
        description: "Explore GRC's AI resources — toolkits, training, and policy frameworks for teaching",
        starterPrompts: [
          "What toolkits help me write AI policies?",
          "How do I set Assessment Scale levels for assignments?",
          "What faculty training is available?",
          "How are other GRC faculty using AI?",
        ],
        suggestedFollowUps: [
          "Show me the Syllabus Statements toolkit",
          "How do I design AI-ready assessments?",
          "Are there faculty workshops coming up?",
          "How do I get involved with the Taskforce?",
        ],
      },
      staff: {
        description: "Discover GRC's AI initiatives, approved tools, and guidelines for your department",
        starterPrompts: [
          "What AI tools are approved for staff use?",
          "How does the Taskforce support staff?",
          "What guidelines should my department follow?",
          "Are there staff-focused AI training sessions?",
        ],
        suggestedFollowUps: [
          "What tools help with office productivity?",
          "How do I request AI training for my team?",
          "What are the data handling guidelines?",
          "How do I get involved with the Taskforce?",
        ],
      },
    },
  },
];

/** Look up a topic by its ID */
export function getTopicById(id: string): AITopic | undefined {
  return AI_TOPICS.find((t) => t.id === id);
}

/** Get a topic with audience-specific overrides applied */
export function getTopicForAudience(topic: AITopic, audience: string | null): AITopic {
  if (!audience || !topic.audienceOverrides?.[audience]) return topic;
  const overrides = topic.audienceOverrides[audience];
  return {
    ...topic,
    description: overrides.description ?? topic.description,
    starterPrompts: overrides.starterPrompts ?? topic.starterPrompts,
    suggestedFollowUps: overrides.suggestedFollowUps ?? topic.suggestedFollowUps,
  };
}
