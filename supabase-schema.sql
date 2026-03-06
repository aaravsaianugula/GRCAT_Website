-- ================================================================
-- GRC AI Taskforce — Supabase Schema + Seed Data
-- Run this entire script in Supabase Dashboard > SQL Editor
-- ================================================================

-- 1. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  audience_filter TEXT, -- NULL = all audiences, 'student', 'faculty', 'staff'
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date_label TEXT NOT NULL,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  is_upcoming BOOLEAN DEFAULT false,
  audience_highlights JSONB DEFAULT '{"student":false,"faculty":false,"staff":false}',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Page Content Table
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  body TEXT,
  audience TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_slug, section_key, audience)
);

-- 4. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Enable Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies — public read for published content
CREATE POLICY "Public can read published faqs" ON faqs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read published events" ON events
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read page content" ON page_content
  FOR SELECT USING (true);

CREATE POLICY "Public can insert feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Service role (secret key) bypasses RLS, so admin CRUD works without extra policies

-- ================================================================
-- SEED DATA: FAQs
-- ================================================================

-- General FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('general', 'What is AI, and why does it matter in college settings?', 'Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence. In education, AI matters because it''s transforming how we learn, teach, and prepare for careers. Students who understand AI will be better prepared for the modern workforce, while faculty can leverage AI to enhance teaching and provide personalized learning experiences.', 1, NULL),
('general', 'Is AI allowed at Green River College?', 'Yes, AI tools are allowed at Green River College, but their use depends on your instructor and course requirements. Always check your course syllabus for specific AI policies, as they may vary between classes. When in doubt, ask your instructor directly about their expectations regarding AI use in assignments and coursework.', 2, NULL),
('general', 'Why is GRC focusing on AI now?', 'Green River College is focusing on AI to ensure our community is future-ready. The college''s AI Task Force is working to develop guidelines that promote digital literacy and responsible AI use. By addressing AI now, GRC is preparing students for a workforce where AI skills are increasingly valuable while helping faculty integrate these tools effectively into their teaching practices.', 3, NULL),
('general', 'What is the AI Assessment Scale?', 'The AI Assessment Scale is a 5-level framework that helps faculty communicate how much AI use is permitted in each assignment. Level 1 means no AI use allowed, while Level 5 encourages creative AI exploration. Each level provides clear guidelines so students know exactly what''s expected. Check your syllabus to see which levels apply to your coursework.', 4, NULL),
('general', 'What AI tools does GRC recommend?', 'The AI Task Force curates a directory of 80+ AI tools across categories like writing, research, teaching, accessibility, and multimedia. Popular options include ChatGPT, Claude, Gemini, Grammarly, Perplexity, and NotebookLM. Visit the AI Playground page for the full directory with descriptions, pricing, and recommended use cases.', 5, NULL);

-- Student FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('student', 'Can I use AI for my assignments?', 'It depends on your instructor''s AI policy. Check your syllabus for the AI Assessment Scale level assigned to each activity. Level 1 means no AI at all, Level 2 allows AI for planning only, Level 3 permits AI collaboration on drafts, Level 4 allows extensive AI use, and Level 5 encourages creative AI exploration. Different assignments within the same course may have different levels.', 1, 'student'),
('student', 'Do I need to cite AI tools?', 'Yes. When AI use is permitted, you should always disclose which tools you used and how. Your instructor may have specific citation requirements. A good practice is to note the AI tool name, the date you used it, a summary of what you asked it to do, and how you modified or built upon its output.', 2, 'student'),
('student', 'What can I use AI for ethically?', 'When permitted by your instructor, you can use AI to brainstorm ideas, explain difficult concepts in simpler terms, polish grammar and sentence structure, create study materials like flashcards and practice questions, and get feedback on drafts. The key is to use AI as a learning supplement, not a replacement for your own thinking and effort.', 3, 'student'),
('student', 'What should I NOT do with AI?', 'Never copy AI-generated text and submit it as your own work (unless explicitly allowed), fabricate discussion posts or forum replies with AI, assume AI output is accurate without verifying it, or upload private information like student IDs or personal data into AI tools. Always check your syllabus and ask your instructor if you''re unsure.', 4, 'student'),
('student', 'Can AI detectors tell if I used AI?', 'AI detection tools are unreliable and can produce false positives — flagging human-written text as AI-generated. GRC does not recommend relying solely on AI detectors. Instead, the focus is on transparency: if you used AI, disclose it. Being honest about your AI use is always the best approach.', 5, 'student');

-- Faculty FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('faculty', 'How should I set AI policies for my courses?', 'Use the AI Assessment Scale to set clear expectations for each assignment. Include AI policy language in your syllabus — the Syllabus Statement Toolkit provides ready-to-use templates for each level. You can set different levels for different assignments. The key is clarity: students should always know what''s expected.', 1, 'faculty'),
('faculty', 'What are the guiding principles for faculty AI use?', 'Five principles guide faculty AI integration at GRC: (1) Student-Centered — prioritize learning outcomes in all AI decisions, (2) Academic Integrity — maintain high standards of honesty and fairness, (3) Transparency — clearly communicate how AI is used in course materials, (4) Equity & Inclusion — ensure AI supports all students and address biases, (5) Faculty Autonomy — respect faculty expertise in how AI is integrated into their courses.', 2, 'faculty'),
('faculty', 'How can AI help with course design?', 'AI can assist with generating weekly overviews, drafting measurable learning objectives, designing Canvas home pages, building course shells, creating rubrics, and developing assessment criteria. Use AI as a starting point and always review and customize the output to match your teaching style and course goals.', 3, 'faculty'),
('faculty', 'Should I use AI detection tools on student work?', 'GRC recommends against relying solely on AI detection tools, as they are unreliable and can falsely flag student work. Instead, focus on designing assessments that demonstrate authentic learning — such as process-based assignments, reflective components, in-class demonstrations, and portfolios that show growth over time.', 4, 'faculty'),
('faculty', 'What privacy guidelines should I follow?', 'Never input student names, IDs, or grades into public AI tools. Use institution-approved AI tools when working with student data. Inform students when AI is used to generate or evaluate course materials. Review AI-generated content for accuracy before sharing. Avoid requiring students to use AI tools that collect personal data without offering alternatives.', 5, 'faculty');

-- Policy FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('policy', 'Does GRC have an official AI policy?', 'GRC''s AI Task Force has developed a framework centered on the AI Assessment Scale, which gives faculty the flexibility to set course-specific AI policies. Rather than a blanket ban or blanket permission, this approach recognizes that appropriate AI use varies by discipline, assignment, and learning objective.', 1, NULL),
('policy', 'Is using AI considered academic dishonesty?', 'Not necessarily. AI use is only problematic when it violates the specific policy set by your instructor. If your syllabus states an assignment is Level 1 (No AI) and you use AI, that could be considered a violation of academic integrity. Always check your assignment''s AI level and follow the stated guidelines.', 2, NULL),
('policy', 'What are the ethical considerations for AI in education?', 'Key ethical considerations include: acknowledging AI''s limitations (bias, inaccuracy, hallucinations), ensuring AI supports rather than replaces human connection in teaching, considering equity implications for students with varying access to technology, modeling critical evaluation of AI outputs, and avoiding AI in high-stakes assessment without human oversight.', 3, NULL),
('policy', 'How does FERPA apply to AI tool usage?', 'FERPA protects student education records. When using AI tools, never input personally identifiable information (PII) such as student names, IDs, grades, or any FERPA-protected data. Use only institution-approved tools for student-data workflows. If a tool''s data practices are unclear, do not use it with student information.', 4, NULL),
('policy', 'What about AI bias and fairness?', 'AI models can reflect and amplify societal biases present in their training data. Faculty should review AI-generated content for stereotypes, underrepresentation, and cultural assumptions. Use diverse sources to validate AI outputs. Ensure AI-generated materials reflect inclusive practices and do not disadvantage any student group.', 5, NULL);

-- Tools FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('tools', 'Which AI tools are free for students?', 'Many AI tools offer free tiers: ChatGPT (free with GPT-4o mini), Claude (free tier), Gemini (free with Google account), Microsoft Copilot (free), Perplexity (free searches), Grammarly (free basic), and Canva AI (free with education account). The AI Playground page has full pricing details for 80+ tools.', 1, NULL),
('tools', 'What is the AI Playground?', 'The AI Playground is GRC''s curated directory of 80+ AI tools organized across categories like Generative AI, Writing, Teaching, Research, Accessibility, Productivity, Multimedia, and Presentations. Each tool listing includes a description, recommended use cases, and pricing. It''s your starting point for exploring AI tools.', 2, NULL),
('tools', 'Does GRC have custom AI tools?', 'Yes! The AI Task Force has developed custom GPTs purpose-built for GRC needs. These include tools for syllabus design, assignment rubric creation, and more. Visit the Custom GPTs & Tools toolkit to explore what''s available and how to use them.', 3, NULL),
('tools', 'How do I get started with AI tools?', 'Start by exploring the AI Playground to find tools relevant to your needs. Read the best practices for your role (student, faculty, or staff). Try a free tool like ChatGPT or Claude for basic tasks. Remember to always verify AI outputs, protect your privacy, and follow your course''s AI policy.', 4, NULL);

-- Staff FAQs
INSERT INTO faqs (category, question, answer, sort_order, audience_filter) VALUES
('staff', 'Can staff use AI tools for administrative workflows?', 'Yes, staff may use approved AI tools to streamline administrative tasks such as drafting communications, summarizing reports, and organizing data. Always follow institutional guidelines, avoid inputting sensitive or FERPA-protected data into public AI tools, and use institution-approved platforms when handling student or personnel records.', 1, 'staff'),
('staff', 'What FERPA considerations apply to staff using AI?', 'FERPA applies whenever you handle student education records. Never paste student names, IDs, grades, enrollment data, or disciplinary records into public AI tools like ChatGPT or Claude. Use only institution-approved, FERPA-compliant platforms for any workflow involving student information. When in doubt, consult your supervisor or the Registrar''s office.', 2, 'staff'),
('staff', 'How should staff handle AI-generated content in official communications?', 'AI-generated content used in official college communications should always be reviewed for accuracy, tone, and alignment with institutional messaging. Staff should verify facts, check links, and ensure the content meets accessibility standards before publishing. Disclose AI use when appropriate, especially in public-facing materials.', 3, 'staff'),
('staff', 'What AI tools are approved for institutional use?', 'The AI Task Force maintains a list of reviewed and approved AI tools. For sensitive data workflows, use only tools that have been vetted by IT and comply with the college''s data governance policies. The AI Playground page lists recommended tools, but always confirm with your department before using a new tool with institutional data.', 4, 'staff');

-- ================================================================
-- SEED DATA: Events
-- ================================================================

INSERT INTO events (title, date_label, event_type, description, is_upcoming, audience_highlights, sort_order) VALUES
('Canvas Nuts & Bolts: AI-Enhanced Course Design', 'Spring 2026', 'Workshop', 'Hands-on workshop integrating AI tools into Canvas course design — from AI-generated module overviews to accessible content creation.', true, '{"student":false,"faculty":true,"staff":false}', 1),
('AI Book Club: Co-Intelligence by Ethan Mollick', 'Spring 2026', 'Course', 'Faculty reading group exploring Co-Intelligence: Living and Working with AI. Weekly discussions on applying AI frameworks to teaching.', true, '{"student":false,"faculty":true,"staff":false}', 2),
('AI 101 for All: Campus-Wide AI Literacy', 'Winter 2026', 'Course', 'Expanded AI literacy program now open to all campus roles — students, faculty, staff, and administrators. Self-paced modules with live Q&A sessions.', true, '{"student":true,"faculty":true,"staff":true}', 3),
('AI 101 for Staff & Students Courses Launch', 'Fall 2025', 'Course', 'New AI literacy courses launched for staff and students, building on the successful faculty AI 101 course.', false, '{"student":true,"faculty":false,"staff":false}', 4),
('AI 101 Course for Faculty', 'Summer 2025', 'Course', '40-hour comprehensive AI course designed for educators covering tools, ethics, pedagogy, and hands-on practice.', false, '{"student":false,"faculty":true,"staff":false}', 5),
('AI in the Classroom Workshop Series', 'Spring 2025', 'Workshop', 'Hands-on workshops for faculty on integrating AI tools into teaching, assessment design, and student engagement.', false, '{"student":true,"faculty":true,"staff":false}', 6),
('LibGuide Launch & Toolkit Rollout', 'Winter 2025', 'Launch', 'Comprehensive AI resource hub launched with toolkits, best practices, and the AI Playground featuring 80+ tools.', false, '{"student":true,"faculty":true,"staff":true}', 7),
('Faculty Pilots & Workshop Series', 'Fall 2024', 'Training', 'Faculty piloted the AI Assessment Scale across departments with comprehensive workshop series for early adopters.', false, '{"student":false,"faculty":true,"staff":false}', 8),
('AI Presentations & Toolkit Launch', 'Summer 2024', 'Presentation', 'Initial toolkit launch for early adopters with presentations on AI policy frameworks and assessment strategies.', false, '{"student":false,"faculty":true,"staff":true}', 9),
('Custom GPTs Development & Policy Drafting', 'Spring 2024', 'Development', 'Development of custom GPTs for faculty use alongside comprehensive AI policy drafting for the institution.', false, '{"student":false,"faculty":true,"staff":true}', 10),
('Listening Sessions & AI Use Survey', 'Winter 2024', 'Forum', 'Campus-wide listening sessions and AI use survey conducted across all departments to understand needs and concerns.', false, '{"student":true,"faculty":true,"staff":true}', 11),
('AI Task Force Launch', 'Fall 2023', 'Milestone', 'The GRC AI Task Force was formed with initial planning and scope definition in response to rapid AI adoption across campus.', false, '{"student":false,"faculty":false,"staff":true}', 12);

-- ================================================================
-- Done! Verify with: SELECT count(*) FROM faqs; SELECT count(*) FROM events;
-- Expected: 29 FAQs, 12 Events
-- ================================================================
