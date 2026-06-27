/* ═══════════════════════════════════════
   StudyOS — Static Data
   ═══════════════════════════════════════ */

const DATA = {

  // ── Study Techniques ──
  techniques: [
    {
      id: 'active-recall',
      icon: '🧠',
      name: 'Active Recall',
      tagline: 'Test yourself instead of re-reading',
      badge: 'Most Effective',
      badgeColor: 'badge-blue',
      what: 'Active recall is the practice of retrieving information from memory without looking at it. Instead of passively reviewing notes, you force your brain to remember.',
      why: 'Every time you retrieve a memory, you strengthen the neural pathway to it — making future recall faster and easier.',
      science: 'The Testing Effect (Roediger & Karpicke, 2006): students who practiced retrieval retained 50% more after one week than those who re-read material.',
      steps: ['Close your notes.', 'Write down everything you remember on a blank page.', 'Check what you got wrong or missed.', 'Re-study only the gaps.', 'Repeat after 24 hours.'],
      example: 'Study photosynthesis. Close book. Write all you know. Check. Fill gaps. Test again next day.',
      mistakes: ['Looking at notes too soon', 'Only reading and highlighting', 'Not checking answers afterward']
    },
    {
      id: 'spaced-rep',
      icon: '📅',
      name: 'Spaced Repetition',
      tagline: 'Review at optimal intervals',
      badge: 'Memory Science',
      badgeColor: 'badge-purple',
      what: 'Reviewing material at increasing intervals (1, 3, 7, 15, 30, 90 days) to solidify long-term memory just before you forget it.',
      why: 'The Forgetting Curve (Ebbinghaus) shows we lose ~50% of info within 24 hours — spacing combats this.',
      science: 'Each spaced review strengthens the memory trace. You need ~6-7 spaced exposures for true long-term retention.',
      steps: ['Learn a topic.', 'Review same day.', 'Review after 1 day.', 'Review after 3 days.', 'Review after 7 days.', 'Review after 15 → 30 → 90 days.'],
      example: "Learned Newton's Laws Monday. Review Tuesday, Thursday, next Monday, and so on.",
      mistakes: ['Cramming all review in one day', 'Skipping intervals when you feel confident', 'Not tracking what needs review']
    },
    {
      id: 'feynman',
      icon: '🎤',
      name: 'Feynman Technique',
      tagline: 'Teach it like you\'re explaining to a child',
      badge: 'Deep Understanding',
      badgeColor: 'badge-orange',
      what: 'Explain a concept in simple, plain language as if teaching a 12-year-old. Gaps in your explanation reveal gaps in understanding.',
      why: 'You only truly understand something if you can explain it simply. Simplification forces clarity.',
      science: 'Richard Feynman, Nobel Prize physicist, built this as his personal learning strategy. It forces metacognition — thinking about your own thinking.',
      steps: ['Pick a topic.', 'Write a plain-language explanation.', 'Identify where you got stuck or vague.', 'Go back to source and re-study that part.', 'Simplify further with analogies.'],
      example: 'Explain photosynthesis: "Plants eat sunlight. They take CO2 from air and water from ground, and the sun helps them turn those into sugar they use as food."',
      mistakes: ['Using jargon and assuming you understand', 'Skipping the re-study step', 'Not using analogies']
    },
    {
      id: 'pomodoro',
      icon: '🍅',
      name: 'Pomodoro Technique',
      tagline: '25 min focus, 5 min break',
      badge: 'Focus',
      badgeColor: 'badge-blue',
      what: 'Work in timed 25-minute blocks with 5-minute breaks. After 4 pomodoros, take a 20–30 minute break.',
      why: 'Our brains can\'t sustain peak focus indefinitely. Forced breaks prevent fatigue and maintain performance.',
      science: 'Research shows the human brain can sustain deep focus for 45–90 minutes before needing rest. Micro-breaks improve sustained attention.',
      steps: ['Choose one task.', 'Set timer to 25 minutes.', 'Work with full focus.', 'Ring → take 5-min break.', 'After 4 cycles → 20-30 min break.'],
      example: 'Study calculus for 25 min, walk/stretch 5 min, repeat 4x, then 25 min rest.',
      mistakes: ['Checking phone during the 25 min', 'Skipping breaks thinking you\'re on a roll', 'Doing multiple tasks in one pomodoro']
    },
    {
      id: 'interleaving',
      icon: '🔀',
      name: 'Interleaving',
      tagline: 'Mix subjects for stronger learning',
      badge: 'Cognitive Science',
      badgeColor: 'badge-purple',
      what: 'Instead of blocking one subject at a time, alternate between subjects or problem types during a session.',
      why: 'Interleaving forces your brain to constantly retrieve and distinguish between concepts — creating deeper, more flexible knowledge.',
      science: 'Students who interleave practice score 43% higher on tests than those who block (Kornell & Bjork, 2008).',
      steps: ['Plan 3 subjects for a session.', 'Spend 20 min on Subject A.', 'Switch to Subject B for 20 min.', 'Switch to Subject C for 20 min.', 'Repeat cycle.'],
      example: 'Algebra → History → Biology → Algebra → History → Biology',
      mistakes: ['Thinking confusion means it\'s not working (it does)', 'Switching too rapidly (<10 min)', 'Interleaving random unrelated things']
    },
    {
      id: 'deep-work',
      icon: '🔭',
      name: 'Deep Work',
      tagline: 'Intense focus without distraction',
      badge: 'Cal Newport',
      badgeColor: 'badge-blue',
      what: 'Cognitively demanding work done in a state of distraction-free concentration — the work that pushes your limits and creates real value.',
      why: 'Deep work produces output of higher quality in less time than shallow, distracted work.',
      science: 'Cal Newport (Georgetown CS Prof) argues deep work is becoming increasingly rare and increasingly valuable simultaneously.',
      steps: ['Schedule a 1–3 hour deep work block.', 'No phone, no notifications.', 'Work on your hardest, most important task only.', 'Log how many deep hours you complete per day.', 'Build up gradually to 4 hours daily.'],
      example: 'Wake at 6am. No phone. Write or code for 3 hours. Shower, then check messages.',
      mistakes: ['Multitasking', 'Allowing notifications', 'Starting with easy tasks first']
    },
    {
      id: 'cornell',
      icon: '📝',
      name: 'Cornell Notes',
      tagline: 'A structured note-taking system',
      badge: 'Note-taking',
      badgeColor: 'badge-green',
      what: 'Divide your page: a narrow left column for cues/questions, a wide right column for notes, and a bottom section for summary.',
      why: 'Forces you to organize information, create questions for recall, and summarize — three high-impact learning activities.',
      science: 'Developed at Cornell University by Walter Pauk. The structure forces encoding at multiple cognitive levels.',
      steps: ['Divide page: 2.5" cue column | 6" notes column | 2" summary at bottom.', 'During lecture: notes in right column.', 'After: write key questions in left column.', 'Cover right, use questions to recall.', 'Write summary at bottom.'],
      example: 'Cue: "What is mitosis?" | Notes: "Cell divides into 2 identical cells, 4 phases..." | Summary: "Mitosis = asexual cell division for growth & repair."',
      mistakes: ['Not filling the cue column', 'Never using it for active recall', 'Making notes too long/verbose']
    },
    {
      id: 'blurting',
      icon: '💬',
      name: 'Blurting Method',
      tagline: 'Dump everything on paper, then check',
      badge: 'Active',
      badgeColor: 'badge-orange',
      what: 'After studying a topic, close everything and write (blurt) everything you know onto a blank page — messy, fast, non-stop.',
      why: 'Similar to active recall but even more freeform. The mess helps reveal exactly what\'s missing in your knowledge.',
      science: 'Engages retrieval practice with low pressure. The act of blurting activates your long-term memory storage in a relaxed way.',
      steps: ['Study a section.', 'Close everything.', 'On blank paper: write everything you know — words, phrases, diagrams.', 'Compare to source.', 'Highlight gaps. Re-study. Repeat.'],
      example: 'After reading about WWI, blurt: "1914, Archduke Franz Ferdinand, Austria-Hungary, Germany, trenches, Somme..." until you run dry.',
      mistakes: ['Being too neat — just blurt everything', 'Not checking and identifying gaps', 'Only blurting once']
    },
    {
      id: 'sq3r',
      icon: '🔍',
      name: 'SQ3R',
      tagline: 'Survey, Question, Read, Recite, Review',
      badge: 'Textbook Strategy',
      badgeColor: 'badge-green',
      what: 'A 5-step reading comprehension strategy: Survey (skim), Question (form questions), Read (actively), Recite (answer from memory), Review.',
      why: 'Turns passive reading into active learning. You read with purpose when you have questions to answer.',
      science: 'Francis P. Robinson developed this in 1946. Studies show structured reading increases retention vs passive reading by 30–40%.',
      steps: ['Survey: skim chapter, headings, bold text.', 'Question: turn each heading into a question.', 'Read: read to answer those questions.', 'Recite: close book, answer your questions.', 'Review: skim again, fill gaps.'],
      example: 'Heading: "The Water Cycle" → Question: "How does the water cycle work?" → Read to find out → Recite without notes → Review.',
      mistakes: ['Skipping the Survey step', 'Not forming questions first', 'Reading linearly without purpose']
    },
    {
      id: 'retrieval',
      icon: '🎯',
      name: 'Retrieval Practice',
      tagline: 'Practice tests > re-reading',
      badge: 'Evidence-based',
      badgeColor: 'badge-blue',
      what: 'Deliberately practice retrieving information through quizzes, flashcards, past papers, or self-testing — not re-reading.',
      why: 'Each retrieval attempt strengthens the memory. Re-reading creates illusion of competence; retrieval builds actual competence.',
      science: '"The Testing Effect" is one of the most replicated findings in cognitive psychology. Retrieval practice outperforms all other strategies.',
      steps: ['After a study session, quiz yourself.', 'Use past exam papers.', 'Create flashcards and test daily.', 'Ask a friend to quiz you.', 'Space retrieval over days and weeks.'],
      example: 'After studying Chemistry, attempt 10 past paper questions without notes. Check. Re-study wrong answers.',
      mistakes: ['Thinking you know it because you recognized it while reading', 'Using recognition quizzes (multiple choice only)', 'Not testing spaced across time']
    },
  ],

  // ── Roadmap Steps ──
  roadmapSteps: [
    { icon: '📚', title: 'Choose Subject', desc: 'Decide what you\'re studying today' },
    { icon: '👁', title: 'Preview', desc: 'Skim headings, diagrams, summaries (5 min)' },
    { icon: '🔍', title: 'Understand', desc: 'Read actively, take Cornell notes' },
    { icon: '🎤', title: 'Explain', desc: 'Feynman it — explain in your own words' },
    { icon: '🧠', title: 'Recall', desc: 'Close notes. Blurt everything you know' },
    { icon: '💪', title: 'Practice', desc: 'Solve problems, answer questions' },
    { icon: '🔄', title: 'Schedule Revision', desc: 'Add to spaced revision planner' },
    { icon: '✅', title: 'Done', desc: 'Mark complete. Rest your brain.' },
  ],

  // ── Focus Quotes ──
  quotes: [
    '"The secret of getting ahead is getting started." — Mark Twain',
    '"Concentrate all your thoughts upon the work at hand." — Alexander Graham Bell',
    '"Do not wait; the time will never be just right." — Napoleon Hill',
    '"A goal without a plan is just a wish." — Antoine de Saint-Exupéry',
    '"It\'s not that I\'m so smart, it\'s just that I stay with problems longer." — Einstein',
    '"The expert in anything was once a beginner." — Helen Hayes',
    '"Knowledge is the eye of desire and can become the pilot of the soul." — Will Durant',
    '"An investment in knowledge pays the best interest." — Benjamin Franklin',
    '"The capacity to learn is a gift; the ability to learn is a skill." — Brian Herbert',
    '"Live as if you were to die tomorrow. Learn as if you were to live forever." — Gandhi',
  ],

  // ── Sleep Info ──
  sleepInfo: [
    { icon: '🌙', title: 'Sleep Cycles', body: 'Sleep has 5 cycles of ~90 min each. Each cycle includes light sleep, deep sleep (NREM), and REM. Deep sleep consolidates memories; REM enhances creativity.' },
    { icon: '🧠', title: 'Memory Consolidation', body: 'While you sleep, your hippocampus replays the day\'s learning and transfers it to long-term storage in the cortex. No sleep = no memory formation.' },
    { icon: '⏰', title: 'Circadian Rhythm', body: 'Your body runs on a 24-hour clock. Light controls it. Morning sunlight sets your rhythm; blue light at night disrupts it and delays sleep.' },
    { icon: '🛏', title: 'Sleep Hygiene', body: 'Cool room (18–20°C), dark, no screens 1hr before bed, same sleep/wake time daily. These factors determine sleep quality far more than duration alone.' },
    { icon: '📊', title: 'How Much You Need', body: 'Students need 7–9 hours. Less than 6 hours impairs attention, memory encoding, and emotional regulation — equivalent to being drunk.' },
    { icon: '💡', title: 'Nap Strategy', body: 'A 10–20 min nap (no more!) boosts alertness and learning without causing grogginess. A 90-min nap gives a full sleep cycle for creative tasks.' },
  ],

  // ── Gym Info ──
  gymInfo: [
    { icon: '🏃', title: 'BDNF — Brain Fertilizer', body: 'Exercise triggers BDNF (Brain-Derived Neurotrophic Factor) — a protein that grows new neurons and strengthens connections, especially in the hippocampus (memory center).' },
    { icon: '💊', title: 'Dopamine & Focus', body: 'Aerobic exercise increases dopamine, serotonin, and norepinephrine — the same chemicals targeted by ADHD medication. 20 min cardio = natural Ritalin.' },
    { icon: '🧬', title: 'Neuroplasticity', body: 'Regular exercise physically changes brain structure. Students who exercise have larger hippocampi and show superior learning on memory tests.' },
    { icon: '😌', title: 'Stress Reduction', body: 'Exercise metabolizes cortisol (stress hormone) and trains your stress-response system. Consistent exercisers literally handle pressure better.' },
    { icon: '🎯', title: 'Best Time to Exercise', body: 'Morning exercise optimizes focus and mood for the rest of the day. Post-workout is an ideal window for studying — BDNF is elevated for 2–3 hours.' },
    { icon: '🔄', title: 'Minimum Effective Dose', body: '20–30 min of moderate cardio, 3–5x/week. Even a 10-minute brisk walk significantly improves cognitive performance and mood.' },
  ],

  gymActivities: [
    { icon: '🏋', name: 'Strength Training', meta: 'Weight lifting, resistance' },
    { icon: '🏃', name: 'Cardio / Running', meta: 'Jogging, cycling, elliptical' },
    { icon: '🧘', name: 'Yoga / Stretching', meta: 'Flexibility, recovery' },
    { icon: '🚶', name: 'Walking', meta: 'At least 7,000 steps' },
    { icon: '🏊', name: 'Swimming', meta: 'Full-body cardio' },
    { icon: '⚽', name: 'Sports', meta: 'Any team/recreational sport' },
  ],

  // ── Nutrition ──
  nutritionItems: [
    { icon: '💧', name: 'Water', meta: 'Target: 2–3 Litres', tip: 'Even mild dehydration (1–2%) impairs cognitive function and mood.' },
    { icon: '🥩', name: 'Protein', meta: '0.8g per kg bodyweight', tip: 'Amino acids build neurotransmitters including dopamine and serotonin.' },
    { icon: '🐟', name: 'Omega-3 Fatty Acids', meta: 'Fish, walnuts, flaxseed', tip: 'DHA is the primary structural fat in the brain; critical for synaptic plasticity.' },
    { icon: '🫐', name: 'Antioxidant Fruits', meta: 'Blueberries, berries, citrus', tip: 'Polyphenols in blueberries directly improve memory and reduce brain aging.' },
    { icon: '🥦', name: 'Leafy Vegetables', meta: 'Spinach, kale, broccoli', tip: 'High in folate, vitamin K — linked to slower cognitive decline.' },
    { icon: '🥑', name: 'Healthy Fats', meta: 'Avocado, olive oil, nuts', tip: 'Monounsaturated fats protect neurons and support blood-brain barrier integrity.' },
    { icon: '☕', name: 'Coffee / Green Tea', meta: 'Moderate: 1–3 cups', tip: 'Caffeine improves focus, alertness, and reaction time. L-Theanine in tea smooths the effect.' },
    { icon: '🍫', name: 'Dark Chocolate', meta: '70%+ cacao, small amount', tip: 'Flavonoids increase blood flow to the brain. Magnesium supports nerve function.' },
  ],

  // ── Relax Cards ──
  relaxItems: [
    { icon: '📦', name: 'Box Breathing', desc: 'Activate calm in 4 cycles', type: 'box' },
    { icon: '4️⃣', name: '4-7-8 Breathing', desc: 'Rapid anxiety relief', type: '478' },
    { icon: '🧘', name: 'Meditation', desc: '5-minute mindfulness session', type: 'meditate' },
    { icon: '💪', name: 'Progressive Muscle', desc: 'Release tension head to toe', type: 'pmr' },
    { icon: '👁', name: 'Eye Relaxation', desc: '20-20-20 rule for screens', type: 'eye' },
    { icon: '🌿', name: 'Nature Break', desc: 'Step outside for 10 minutes', type: 'nature' },
    { icon: '🎵', name: 'Music Therapy', desc: 'Listen with full attention', type: 'music' },
    { icon: '🤸', name: 'Stretch Break', desc: 'Desk stretches for learners', type: 'stretch' },
  ],

  // ── Memory Games ──
  memoryGames: [
    { id: 'number', icon: '🔢', name: 'Number Memory', desc: 'Memorize a growing number sequence' },
    { id: 'word',   icon: '📝', name: 'Word Memory',   desc: 'Remember a list of words' },
    { id: 'pattern',icon: '⬛', name: 'Pattern Memory', desc: 'Copy the grid pattern' },
    { id: 'reaction',icon:'⚡', name: 'Reaction Time',  desc: 'Test your neural speed' },
    { id: 'sequence',icon:'🔤',name: 'Sequence Memory', desc: 'Remember the order of items' },
  ],

  // ── Knowledge Hub ──
  knowledgeTopics: [
    { icon: '🧠', title: 'How Memory Works', short: 'Encoding, storage, retrieval — and why you forget', body: 'Memory is not a recording. It\'s a reconstruction. Every time you recall something, you slightly alter it.\n\nStages: Encoding (input) → Storage (hippocampus holds it) → Consolidation (sleep transfers to cortex) → Retrieval (prefrontal cortex reconstructs).\n\nTypes: Sensory (milliseconds) → Working Memory (20–30 sec) → Long-term Memory (lifetime with rehearsal).\n\nThe Forgetting Curve: Without review, we lose 70% within 24 hours. Spaced repetition flattens the curve.' },
    { icon: '⚡', title: 'Attention & Focus', short: 'Why focus is scarce and how to guard it', body: 'The brain\'s attentional system has limited bandwidth. You cannot truly multitask — you can only rapid-switch, and each switch costs cognitive resources ("switching cost").\n\nThe prefrontal cortex manages executive attention. It\'s exhausted by distractions and decision fatigue.\n\nDeep focus requires: eliminating interruptions, single-tasking, and building focus like a muscle through daily practice.' },
    { icon: '🔧', title: 'Working Memory', short: 'The brain\'s RAM — small but crucial', body: 'Working memory is the cognitive workspace where you hold and manipulate information in real-time. It\'s severely limited: ~4 chunks for most adults.\n\nOverloading it causes cognitive overwhelm. Strategies that reduce working memory load (taking notes, chunking information, using diagrams) free it up for deeper processing.' },
    { icon: '📦', title: 'Long-Term Memory', short: 'How to build knowledge that lasts', body: 'Long-term memory is virtually unlimited in capacity. But encoding is selective — only repeated, emotionally tagged, or deliberately rehearsed information survives.\n\nDeclarative (facts) vs Procedural (skills). Skills become automatic through repetition; facts require spaced retrieval.\n\nElaboration — connecting new info to what you already know — dramatically improves storage and retrieval.' },
    { icon: '☁', title: 'Brain Fog', short: 'What causes it and how to clear it', body: 'Brain fog — difficulty thinking, concentrating, and remembering — has clear triggers: sleep deprivation, poor nutrition, chronic stress, sedentary lifestyle, dehydration, and excessive screen time.\n\nCures: 7–9 hrs sleep, 30 min exercise, 2L+ water, reducing processed food, meditation, and digital breaks.\n\nMost brain fog is lifestyle-induced and lifestyle-reversible.' },
    { icon: '🌿', title: 'Neuroplasticity', short: 'Your brain can physically change at any age', body: 'Neuroplasticity is the brain\'s ability to reorganize by forming new neural connections throughout life. It is not fixed after childhood.\n\nDriven by: learning new skills, exercise (BDNF), sleep, and deliberate practice.\n\nMyelination — the insulation of neural pathways — increases with repetition, making learned skills faster and more automatic. This is literally what practice does to your brain.' },
    { icon: '😤', title: 'Stress & Learning', short: 'The right amount of stress helps. Too much destroys.', body: 'Cortisol (stress hormone) in moderate doses sharpens focus and memory. But chronic high cortisol literally shrinks the hippocampus — the brain\'s memory center.\n\nAcute stress before a task → helpful. Chronic stress from deadline culture → harmful.\n\nManagement: exercise, breathing, sleep, and reframing pressure as challenge (not threat) all reduce cortisol impact.' },
    { icon: '💫', title: 'Dopamine & Motivation', short: 'The reward chemical that drives all learning', body: 'Dopamine is not the "pleasure" chemical — it\'s the anticipation/motivation chemical. It drives you toward rewards, not just satisfaction from them.\n\nLearning triggers dopamine when progress is visible. Gamify your studying: streaks, milestones, and checkmarks all work.\n\nDopamine is depleted by: excessive social media, porn, junk food, and video games — all of which give massive dopamine spikes, making normal study feel grey by comparison.' },
    { icon: '🔁', title: 'Habit Formation', short: 'How routines become automatic', body: 'Habits are formed through the habit loop: Cue → Routine → Reward. Repetition moves behavior from the prefrontal cortex (deliberate) to the basal ganglia (automatic).\n\nIt takes 66 days average (not 21) to form a habit — per a UCL study (Lally, 2010).\n\nStrategy: attach new habits to existing ones (habit stacking), reduce friction, and make the reward immediate.' },
    { icon: '🏆', title: 'Motivation Science', short: 'Why willpower fails and systems win', body: 'Motivation is unreliable — it fluctuates with mood, energy, and environment. Research shows that high performers don\'t rely on motivation; they rely on systems, environments, and habits.\n\nSelf-Determination Theory: intrinsic motivation (curiosity, mastery, purpose) is far more durable than extrinsic (grades, money).\n\nConnection is key: students who understand *why* they\'re learning retain information better and experience less burnout.' },
    { icon: '⚗', title: 'Learning Science', short: 'What the research actually says about studying', body: 'A landmark review (Dunlosky et al., 2013) rated 10 popular study techniques. Results:\n\n• HIGH utility: Practice testing, Distributed practice\n• MODERATE utility: Interleaved practice, Elaborative interrogation, Self-explanation\n• LOW utility: Highlighting, Re-reading, Summarizing, Keyword mnemonics, Imagery\n\nMost students use low-utility strategies. Switching to high-utility strategies is the single highest-leverage change you can make.' },
    { icon: '😴', title: 'Sleep & Memory', short: 'The ultimate performance enhancer that\'s free', body: 'Sleep is when the brain consolidates learning. During slow-wave sleep, the hippocampus "replays" the day\'s learning and transfers it to the cortex.\n\nREM sleep enhances creative connections and emotional processing.\n\nMissing one night: 40% reduction in memory formation. Chronic sleep debt causes measurable brain atrophy.\n\nYou cannot "catch up" on lost sleep within a week. The best study strategy is also the best sleep strategy: sleep consistently and early.' },
  ],

  // ── Habits ──
  defaultHabits: [
    { id: 'study',    icon: '📖', name: 'Study Session',    meta: '2+ hours of focused study' },
    { id: 'sleep',    icon: '🌙', name: 'Quality Sleep',    meta: '7–9 hours of sleep' },
    { id: 'gym',      icon: '💪', name: 'Exercise',         meta: 'Any physical activity' },
    { id: 'read',     icon: '📚', name: 'Reading',          meta: 'Books, not social media' },
    { id: 'meditate', icon: '🧘', name: 'Meditation',       meta: '10+ minutes mindfulness' },
    { id: 'revise',   icon: '🔄', name: 'Revision',         meta: 'Spaced repetition review' },
    { id: 'nosocial', icon: '📵', name: 'No Social Media',  meta: 'Digital discipline' },
    { id: 'hydrate',  icon: '💧', name: 'Hydration',        meta: '2+ litres of water' },
    { id: 'food',     icon: '🥗', name: 'Healthy Eating',   meta: 'Nutritious meals' },
    { id: 'walk',     icon: '🚶', name: 'Walking',          meta: '7,000+ steps' },
    { id: 'sunlight', icon: '☀', name: 'Morning Sunlight', meta: '10 min outdoor light' },
  ],

  // ── Achievements ──
  achievements: [
    { id: 'streak7',    icon: '🔥', name: '7-Day Streak',    desc: 'Maintain daily habits for 7 days',   req: s => s.streak >= 7 },
    { id: 'streak30',   icon: '💎', name: '30-Day Warrior',  desc: 'Maintain habits for 30 days',         req: s => s.streak >= 30 },
    { id: 'focus10',    icon: '🎯', name: 'Focus Warrior',   desc: 'Complete 10 focus sessions',          req: s => s.totalSessions >= 10 },
    { id: 'focus50',    icon: '🔭', name: 'Deep Work Master',desc: 'Complete 50 focus sessions',          req: s => s.totalSessions >= 50 },
    { id: 'memory5',    icon: '⚡', name: 'Memory Spark',    desc: 'Play 5 memory training games',        req: s => s.memoryGames >= 5 },
    { id: 'memory20',   icon: '🧠', name: 'Memory Expert',   desc: 'Play 20 memory training games',       req: s => s.memoryGames >= 20 },
    { id: 'score90',    icon: '🌟', name: 'Brain 90',        desc: 'Achieve 90%+ Brain Score',            req: s => s.maxScore >= 90 },
    { id: 'score100',   icon: '👑', name: 'Perfect Brain',   desc: 'Achieve 100% Brain Score',            req: s => s.maxScore >= 100 },
    { id: 'revision10', icon: '🔄', name: 'Consistent',      desc: 'Complete 10 revision sessions',       req: s => s.revisionsCompleted >= 10 },
    { id: 'knowledge',  icon: '📚', name: 'Scholar',         desc: 'Read all Knowledge Hub articles',     req: s => s.articlesRead >= 12 },
    { id: 'allhabits',  icon: '✅', name: 'Consistency King', desc: 'Complete all habits in a single day', req: s => s.perfectDay >= 1 },
    { id: 'builder',    icon: '🏗', name: 'Brain Builder',   desc: 'Use StudyOS for 14 days',             req: s => s.daysUsed >= 14 },
  ],

  // ── Pillar Definitions ──
  pillars: [
    { id: 'sleep',   icon: '🌙', name: 'Sleep',           val: '',       page: 'sleep' },
    { id: 'study',   icon: '📖', name: 'Study',           val: '',       page: 'study' },
    { id: 'gym',     icon: '💪', name: 'Exercise',        val: '',       page: 'gym' },
    { id: 'revision',icon: '🔄', name: 'Revision',        val: '',       page: 'revision' },
    { id: 'hydrate', icon: '💧', name: 'Hydration',       val: '',       page: 'nutrition' },
    { id: 'meditate',icon: '🧘', name: 'Meditation',      val: '',       page: 'relax' },
    { id: 'focus',   icon: '🎯', name: 'Focus Sessions',  val: '',       page: 'focus' },
    { id: 'memory',  icon: '⚡', name: 'Memory Training', val: '',       page: 'memory' },
  ],
};
