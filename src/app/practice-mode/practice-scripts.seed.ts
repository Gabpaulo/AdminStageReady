import type { PracticeScriptInput } from '../services/admin-firebase.service';

/**
 * One-time seed source, mirrored verbatim from
 * StageReadyIonic/src/app/data/practice-scripts.data.ts.
 *
 * ARRAY ORDER IS SIGNIFICANT: it defines each script's `sortOrder` (index + 1).
 * The recommendation engine in the mobile app iterates scripts in this order when
 * filling out a weekly plan, so reordering this array changes what users are
 * recommended. Do not reorder.
 *
 * Generated file — regenerate rather than hand-editing. Lazy-imported by
 * practice-mode.page.ts only when the seed button is clicked; never import it
 * at module scope (~75KB).
 */
export type PracticeScriptSeedEntry = Omit<PracticeScriptInput, 'sortOrder'> & { id: string };

export const PRACTICE_SCRIPTS_SEED: PracticeScriptSeedEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // INFORMATIVE — BEGINNER (info-1 to info-5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'info-1',
    title: 'The Science of Sleep',
    category: 'informative',
    estimatedDuration: 75,
    difficulty: 'beginner',
    targetDimensions: ['articulation_clarity', 'speech_pace', 'pausing_fluency'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'Sleep is one of the most vital processes for human health, yet most of us take it for granted. ' +
      'During sleep, your brain consolidates memories, processes emotions, and removes toxic waste products that build up during waking hours. ' +
      'Scientists have discovered that the brain\'s glymphatic system activates during deep sleep, flushing out harmful proteins linked to Alzheimer\'s disease. ' +
      'Adults need between seven and nine hours of sleep per night for optimal function. ' +
      'Chronic sleep deprivation has been linked to heart disease, diabetes, obesity, and a weakened immune system. ' +
      'Your performance, creativity, and decision-making all depend on getting enough rest. ' +
      'So the next time you consider staying up late, remember that sleep is not wasted time. ' +
      'It is when your brain does its most important work. ' +
      'Prioritize your sleep, and you will think more clearly, feel better, and live longer.'
  },

  {
    id: 'info-2',
    title: 'The Water Cycle',
    category: 'informative',
    estimatedDuration: 70,
    difficulty: 'beginner',
    targetDimensions: ['articulation_clarity', 'pausing_fluency', 'speech_pace'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'The water cycle is one of Earth\'s most important natural processes. ' +
      'It describes how water moves continuously through the environment, from the oceans to the sky and back again. ' +
      'It begins with evaporation. The sun heats the surface of oceans, rivers, and lakes, turning liquid water into water vapor that rises into the atmosphere. ' +
      'As the vapor rises, it cools and condenses to form clouds in a process called condensation. ' +
      'When enough water droplets collect in a cloud, they fall back to Earth as precipitation, which includes rain, snow, or hail. ' +
      'This water then flows into rivers and streams, soaks into the ground, or collects in lakes and oceans, beginning the cycle again. ' +
      'The water cycle distributes fresh water across the planet and regulates our climate. ' +
      'Without it, life on Earth as we know it would not be possible.'
  },

  {
    id: 'info-3',
    title: 'How Vaccines Work',
    category: 'informative',
    estimatedDuration: 72,
    difficulty: 'beginner',
    targetDimensions: ['speech_pace', 'articulation_clarity', 'filler_words_score'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'low',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'Vaccines are one of the greatest achievements of modern medicine. ' +
      'They protect us from dangerous diseases by training our immune systems to recognize and fight specific pathogens. ' +
      'When you receive a vaccine, it introduces a harmless piece of a virus or bacteria, such as a protein or a weakened form of the pathogen, into your body. ' +
      'Your immune system responds by producing antibodies and creating memory cells. ' +
      'These memory cells remain in your body long after the vaccine is gone. ' +
      'If you are ever exposed to the real disease, your immune system recognizes it immediately and attacks before you become seriously ill. ' +
      'Vaccines not only protect individuals, they create herd immunity, which shields people who cannot be vaccinated, such as newborns and those with certain medical conditions. ' +
      'Thanks to vaccines, diseases like smallpox have been eradicated, and others like polio are nearly gone. ' +
      'Getting vaccinated is one of the most responsible things you can do for yourself and for your community.'
  },

  {
    id: 'info-4',
    title: 'Why We Yawn',
    category: 'informative',
    estimatedDuration: 65,
    difficulty: 'beginner',
    targetDimensions: ['pausing_fluency', 'speech_pace', 'articulation_clarity'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Yawning is something everyone does, yet scientists are still not entirely sure why we do it. ' +
      'The most popular theory is that yawning helps cool the brain. ' +
      'When we are tired or bored, our brain temperature rises slightly. ' +
      'Taking a deep breath and stretching the jaw during a yawn increases blood flow and brings cooler air toward the brain, helping regulate its temperature. ' +
      'Another theory suggests yawning helps increase oxygen levels in the blood, although research on this is mixed. ' +
      'What scientists do agree on is that yawning is contagious. ' +
      'Seeing someone else yawn, reading about yawning, or even just thinking about it can trigger a yawn in yourself. ' +
      'This contagious yawning is believed to be linked to empathy and social bonding, which is why it tends to spread more among people who are close to each other. ' +
      'So if you yawned while reading this, it just means your brain is working perfectly normally.'
  },

  {
    id: 'info-5',
    title: 'The Five Human Senses',
    category: 'informative',
    estimatedDuration: 70,
    difficulty: 'beginner',
    targetDimensions: ['articulation_clarity', 'loud_control', 'pausing_fluency'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Humans perceive the world through five primary senses: sight, hearing, smell, taste, and touch. ' +
      'Each sense collects different types of information from the environment and sends signals to the brain for interpretation. ' +
      'Sight, or vision, allows us to detect light and color through specialized cells in our eyes called rods and cones. ' +
      'Hearing works through vibrations in the air that travel into our ears and are converted into nerve signals. ' +
      'Smell is one of our most powerful senses and is directly connected to memory. ' +
      'A single scent can instantly transport you back to a childhood moment. ' +
      'Taste works closely with smell. Without our sense of smell, food would taste much less complex. ' +
      'Touch is distributed across the entire body through nerve endings in our skin, detecting pressure, temperature, and pain. ' +
      'Together, these five senses help us navigate, survive, and experience the richness of the world around us. ' +
      'They are remarkable systems that most of us rely on every moment without a second thought.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFORMATIVE — INTERMEDIATE (info-6 to info-10)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'info-6',
    title: 'How Climate Change Works',
    category: 'informative',
    estimatedDuration: 80,
    difficulty: 'intermediate',
    targetDimensions: ['articulation_clarity', 'loud_control', 'pausing_fluency'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'Climate change is one of the defining challenges of our time. ' +
      'The Earth\'s atmosphere naturally traps heat from the sun, keeping our planet warm enough for life. ' +
      'But since the Industrial Revolution, human activities have released massive amounts of carbon dioxide and other greenhouse gases into the atmosphere. ' +
      'These gases trap more heat than before, causing global temperatures to rise steadily over time. ' +
      'The consequences are already visible: melting ice caps, rising sea levels, more intense storms, and shifting weather patterns. ' +
      'Scientists agree that we must reduce carbon emissions dramatically to avoid the worst effects. ' +
      'This requires transitioning from fossil fuels to renewable energy sources like solar and wind power. ' +
      'Every individual action matters, from reducing energy consumption to supporting sustainable policies. ' +
      'The science is clear, and the time to act is now.'
  },

  {
    id: 'info-7',
    title: 'The Science of Memory',
    category: 'informative',
    estimatedDuration: 85,
    difficulty: 'intermediate',
    targetDimensions: ['pausing_fluency', 'articulation_clarity', 'speech_pace'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'Memory is not a single system but a complex network of processes distributed across the brain. ' +
      'When you experience something, your brain encodes it through a process involving the hippocampus and the surrounding cortex. ' +
      'Short-term memory holds information for seconds to minutes, while long-term memory can store information for a lifetime. ' +
      'The transfer from short-term to long-term memory, called consolidation, often happens during sleep. ' +
      'This is why pulling an all-nighter before an exam is rarely effective. ' +
      'Memory is also reconstructive rather than reproductive. ' +
      'Each time you recall a memory, you are partly rebuilding it, which means memories can change over time and be influenced by new information. ' +
      'Techniques like spaced repetition, active recall, and connecting new information to existing knowledge dramatically improve memory retention. ' +
      'Understanding how memory works gives you powerful tools to learn more effectively and retain information longer.'
  },

  {
    id: 'info-8',
    title: 'How Artificial Intelligence Works',
    category: 'informative',
    estimatedDuration: 85,
    difficulty: 'intermediate',
    targetDimensions: ['speech_pace', 'filler_words_score', 'articulation_clarity'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'Artificial intelligence, or AI, refers to computer systems designed to perform tasks that normally require human intelligence, such as recognizing images, understanding language, or making decisions. ' +
      'Most modern AI is built on a technique called machine learning, where a system learns from large amounts of data rather than being programmed with explicit rules. ' +
      'Deep learning, a subset of machine learning, uses artificial neural networks loosely modeled on the human brain. ' +
      'These networks have layers of interconnected nodes that process and transform data, learning to identify patterns. ' +
      'For example, an image recognition system might learn to identify cats by processing millions of labeled photos. ' +
      'AI is now embedded in everyday life: it powers search engines, recommendation systems, voice assistants, and medical diagnostic tools. ' +
      'While AI offers enormous benefits, it also raises important questions about bias, privacy, and the future of work. ' +
      'Understanding AI at a basic level is becoming an essential literacy for the twenty-first century.'
  },

  {
    id: 'info-9',
    title: 'The History of Space Exploration',
    category: 'informative',
    estimatedDuration: 88,
    difficulty: 'intermediate',
    targetDimensions: ['loud_control', 'pausing_fluency', 'expressive_emph'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'The space age began on October fourth, nineteen fifty seven, when the Soviet Union launched Sputnik, the first artificial satellite to orbit Earth. ' +
      'This triggered the Space Race between the United States and the Soviet Union, driving rapid advances in rocket technology. ' +
      'In nineteen sixty one, Soviet cosmonaut Yuri Gagarin became the first human in space. ' +
      'Eight years later, the United States achieved one of the greatest feats in human history when Neil Armstrong and Buzz Aldrin walked on the Moon. ' +
      'Over the following decades, robotic spacecraft explored every planet in our solar system. ' +
      'The Hubble Space Telescope, launched in nineteen ninety, transformed our understanding of the universe. ' +
      'Today, private companies like SpaceX are revolutionizing space travel, making it cheaper and more accessible. ' +
      'Missions to Mars are actively in development. ' +
      'Space exploration has given us satellite communications, GPS, weather forecasting, and countless other technologies that shape modern life.'
  },

  {
    id: 'info-10',
    title: 'How the Stock Market Works',
    category: 'informative',
    estimatedDuration: 82,
    difficulty: 'intermediate',
    targetDimensions: ['articulation_clarity', 'speech_pace', 'loud_control'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'The stock market is a system where investors buy and sell shares of publicly traded companies. ' +
      'When a company wants to raise money, it can offer shares of itself to the public through a process called an initial public offering, or IPO. ' +
      'Once shares are available, investors trade them on exchanges like the New York Stock Exchange or the NASDAQ. ' +
      'Stock prices fluctuate based on supply and demand, which is influenced by company performance, economic conditions, and investor sentiment. ' +
      'When a company earns strong profits, demand for its shares usually rises, pushing the price higher. ' +
      'Investors who buy shares at a lower price and sell at a higher price make a profit called a capital gain. ' +
      'The stock market serves as an indicator of economic health. ' +
      'When markets rise broadly, it often signals investor confidence in the economy. ' +
      'While investing carries risk, historically the stock market has provided strong long-term returns, making it an important tool for building wealth over time.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFORMATIVE — ADVANCED (info-11 to info-15)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'info-11',
    title: 'The History of the Internet',
    category: 'informative',
    estimatedDuration: 85,
    difficulty: 'advanced',
    targetDimensions: ['articulation_clarity', 'speech_pace', 'filler_words_score'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'The internet began as a military research project in the nineteen sixties called ARPANET, designed to allow computers to communicate with each other. ' +
      'In nineteen eighty nine, British scientist Tim Berners-Lee invented the World Wide Web, a system of linked documents accessible through a browser. ' +
      'This transformed the internet from an academic tool into a global phenomenon. ' +
      'By the mid-nineteen nineties, commercial internet access was widely available, and companies like Amazon and Google were born. ' +
      'Today, over five billion people use the internet worldwide. ' +
      'It has transformed how we communicate, shop, learn, and entertain ourselves. ' +
      'Social media has connected people across continents, while also creating new challenges around privacy and misinformation. ' +
      'The internet continues to evolve rapidly, with artificial intelligence and the Internet of Things opening exciting new possibilities for the future.'
  },

  {
    id: 'info-12',
    title: 'The Neuroscience of Decision-Making',
    category: 'informative',
    estimatedDuration: 90,
    difficulty: 'advanced',
    targetDimensions: ['speech_pace', 'pausing_fluency', 'filler_words_score'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'Every decision you make, from what to eat for breakfast to how to respond in a crisis, involves a complex interplay between different brain regions. ' +
      'The prefrontal cortex handles rational analysis, weighing costs and benefits in a deliberate, logical way. ' +
      'The limbic system, particularly the amygdala, drives emotional and instinctive responses that often operate faster than conscious thought. ' +
      'Neuroscientists have found that emotion is not the enemy of good decision-making. In fact, patients with damage to the emotional centers of the brain often struggle to make even simple decisions. ' +
      'We experience two types of thinking: fast, automatic, and intuitive, and slow, deliberate, and analytical. ' +
      'Both systems are essential, but they can also lead us astray through cognitive biases, mental shortcuts that sometimes cause systematic errors in judgment. ' +
      'Awareness of these biases, including confirmation bias, the sunk-cost fallacy, and anchoring, can help us make better choices. ' +
      'Understanding the neuroscience of decision-making teaches us that reasoning well requires both emotional intelligence and analytical rigor.'
  },

  {
    id: 'info-13',
    title: 'Quantum Entanglement Explained',
    category: 'informative',
    estimatedDuration: 88,
    difficulty: 'advanced',
    targetDimensions: ['articulation_clarity', 'pausing_fluency', 'loud_control'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'Quantum entanglement is one of the strangest and most counterintuitive phenomena in physics. ' +
      'When two particles become entangled, they form a shared quantum state. ' +
      'From that point on, measuring one particle instantly determines the state of the other, no matter how far apart they are. ' +
      'Albert Einstein famously called this spooky action at a distance, because it seemed to violate the principle that nothing can travel faster than light. ' +
      'Decades of experiments have confirmed that entanglement is real, and that the correlation between particles is not explained by hidden information they carry with them. ' +
      'This bizarre phenomenon is the foundation of emerging technologies like quantum computing and quantum cryptography. ' +
      'Quantum computers use entangled particles to process information in fundamentally different ways than classical computers, potentially solving problems that would take today\'s machines millions of years. ' +
      'Quantum entanglement challenges our most basic intuitions about space, time, and the nature of reality itself.'
  },

  {
    id: 'info-14',
    title: 'The Ethics of Genetic Engineering',
    category: 'informative',
    estimatedDuration: 92,
    difficulty: 'advanced',
    targetDimensions: ['filler_words_score', 'speech_pace', 'articulation_clarity'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'CRISPR-Cas9, a gene-editing technology discovered in the last decade, allows scientists to precisely alter DNA sequences in living organisms. ' +
      'The potential applications are extraordinary: curing inherited diseases, eliminating genetic disorders before birth, developing more resilient crops, and even engineering resistance to pandemics. ' +
      'In medicine, CRISPR is already being used in clinical trials to treat conditions like sickle cell disease with remarkable results. ' +
      'But the technology also raises profound ethical questions. ' +
      'Where do we draw the line between treating disease and enhancing healthy people? ' +
      'Who decides which traits are desirable? ' +
      'And what are the risks of introducing permanent, heritable changes to the human germline? ' +
      'In twenty eighteen, a Chinese scientist controversially edited embryos that were carried to term, resulting in the world\'s first gene-edited babies. ' +
      'The scientific community was nearly unanimous in condemning this as premature and reckless. ' +
      'Genetic engineering offers humanity tremendous power. How we choose to govern that power will define our values for generations to come.'
  },

  {
    id: 'info-15',
    title: 'How Black Holes Form',
    category: 'informative',
    estimatedDuration: 90,
    difficulty: 'advanced',
    targetDimensions: ['pausing_fluency', 'loud_control', 'speech_pace'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'A black hole is a region of space where gravity is so intense that nothing, not even light, can escape from it. ' +
      'Most black holes form when a massive star runs out of nuclear fuel and can no longer support itself against the inward pull of its own gravity. ' +
      'The core collapses in a fraction of a second, and the outer layers are expelled in a tremendous explosion called a supernova. ' +
      'If the remaining core is massive enough, typically more than three times the mass of our sun, it continues collapsing into a singularity, a point of infinite density, surrounded by an event horizon. ' +
      'The event horizon is the point of no return. ' +
      'Anything that crosses it is lost forever. ' +
      'Black holes can also grow by consuming gas, dust, and even other stars. ' +
      'Supermassive black holes, billions of times the mass of the sun, lurk at the centers of most large galaxies, including our own Milky Way. ' +
      'In twenty nineteen, the Event Horizon Telescope captured the first-ever image of a black hole, turning theory into visible reality.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSUASIVE — BEGINNER (per-1 to per-5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'per-1',
    title: 'Why You Should Exercise Daily',
    category: 'persuasive',
    estimatedDuration: 80,
    difficulty: 'beginner',
    targetDimensions: ['expressive_emph', 'pitch_variation', 'loud_control'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Regular physical exercise is one of the most powerful things you can do for your health and wellbeing. ' +
      'Yet despite knowing this, most people still fail to make it a daily habit. ' +
      'Exercise does not just help you lose weight or build muscle. ' +
      'It fundamentally changes your brain chemistry. ' +
      'Regular activity releases endorphins, reducing stress, anxiety, and depression. ' +
      'It improves memory and cognitive function, helping you think more clearly. ' +
      'Studies show that people who exercise regularly live longer, get sick less often, and report higher levels of happiness. ' +
      'You do not need to spend hours in a gym. ' +
      'Even thirty minutes of moderate activity, like walking or cycling, is enough to see significant benefits. ' +
      'The excuses we make, too busy or too tired, are precisely the reasons why we need to exercise more. ' +
      'Make a commitment today. Your future self will thank you for it.'
  },

  {
    id: 'per-2',
    title: 'Read More Books',
    category: 'persuasive',
    estimatedDuration: 72,
    difficulty: 'beginner',
    targetDimensions: ['expressive_emph', 'loud_control', 'pausing_fluency'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Reading is one of the simplest and most powerful habits you can develop. ' +
      'Books expand your vocabulary, sharpen your thinking, and expose you to perspectives and ideas you would never encounter in your daily life. ' +
      'Research consistently shows that regular readers perform better academically, communicate more effectively, and show greater empathy than non-readers. ' +
      'Unlike scrolling through a social media feed, reading a book demands your full focus and rewards you with genuine understanding. ' +
      'You do not need hours of free time to build this habit. ' +
      'Reading just ten pages a day will get you through more than a dozen books a year. ' +
      'Pick a topic you are genuinely curious about, and let that curiosity guide you. ' +
      'Start with something that excites you, not something you think you should read. ' +
      'Once you find the right book, reading stops feeling like a chore and starts feeling like an adventure. ' +
      'Make books a part of your daily life. It is one of the best decisions you will ever make.'
  },

  {
    id: 'per-3',
    title: 'Put Your Phone Away at Dinner',
    category: 'persuasive',
    estimatedDuration: 68,
    difficulty: 'beginner',
    targetDimensions: ['pitch_variation', 'loud_control', 'expressive_emph'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Think about the last time you sat down for a meal with family or friends. ' +
      'Was your phone on the table? Were you checking notifications between bites? ' +
      'If so, you are not alone, but that does not mean it is okay. ' +
      'The dinner table is one of the last sanctuaries we have for real, uninterrupted human connection. ' +
      'Research shows that families who eat together without screens communicate more openly, argue less, and feel more connected to each other. ' +
      'Children who have regular device-free family dinners perform better in school and have better mental health outcomes. ' +
      'And yet we choose to share that time with our phones instead of each other. ' +
      'The messages, the posts, the notifications — they will all still be there after dinner. ' +
      'But the conversation happening right now, this moment with the people in front of you, that is irreplaceable. ' +
      'Put your phone away. Be present. The people at your table are worth it.'
  },

  {
    id: 'per-4',
    title: 'Drink More Water',
    category: 'persuasive',
    estimatedDuration: 65,
    difficulty: 'beginner',
    targetDimensions: ['pausing_fluency', 'speech_pace', 'expressive_emph'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'low',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Your body is roughly sixty percent water, and it needs a constant supply to function properly. ' +
      'Yet most people walk around mildly dehydrated without even knowing it. ' +
      'Even mild dehydration, as little as one to two percent of body weight, can cause headaches, fatigue, poor concentration, and irritability. ' +
      'Studies show that drinking adequate water improves physical performance, supports kidney health, aids digestion, and helps regulate body temperature. ' +
      'The good news is that fixing this is easy and free. ' +
      'Most adults need about eight glasses of water per day, though this varies with body size and activity level. ' +
      'If you wait until you are thirsty, you are already slightly dehydrated. ' +
      'Try keeping a water bottle with you throughout the day as a simple reminder. ' +
      'Replace one sugary drink with water. You will notice the difference in your energy and focus within days. ' +
      'It is the smallest change with one of the biggest payoffs.'
  },

  {
    id: 'per-5',
    title: 'Prioritize Your Sleep',
    category: 'persuasive',
    estimatedDuration: 70,
    difficulty: 'beginner',
    targetDimensions: ['loud_control', 'expressive_emph', 'pitch_variation'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'We live in a culture that glorifies busyness and wears sleeplessness as a badge of honor. ' +
      'Staying up late and pushing through exhaustion is seen as dedication. ' +
      'But the science says otherwise. Sleep deprivation makes you less productive, not more. ' +
      'When you are sleep-deprived, your reaction time slows, your memory weakens, and your judgment deteriorates. ' +
      'A tired mind is not a sharp mind. ' +
      'Seven to nine hours of sleep per night is not a luxury. It is a biological necessity. ' +
      'During those hours, your body repairs tissues, your brain consolidates the day\'s learning, and your immune system strengthens. ' +
      'Cutting sleep to get more done is like trying to drive faster by removing fuel from your tank. ' +
      'You may feel productive in the short term, but you are running on empty. ' +
      'Protect your sleep like you protect your schedule. ' +
      'Go to bed on time. Turn off screens an hour before sleep. Make sleep non-negotiable. ' +
      'Your performance, your health, and your happiness depend on it.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSUASIVE — INTERMEDIATE (per-6 to per-10)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'per-6',
    title: 'The Case for Reading Books',
    category: 'persuasive',
    estimatedDuration: 85,
    difficulty: 'intermediate',
    targetDimensions: ['pausing_fluency', 'articulation_clarity', 'expressive_emph'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'In a world dominated by social media, streaming services, and constant digital distractions, reading books has become a radical act of self-improvement. ' +
      'Books offer something screens cannot: deep, sustained engagement with complex ideas. ' +
      'When you read, you build vocabulary, improve focus, and develop empathy by experiencing life through different perspectives. ' +
      'Research shows that regular readers have lower rates of cognitive decline as they age. ' +
      'Books allow you to learn directly from the world\'s greatest thinkers, leaders, and storytellers. ' +
      'Unlike a social media feed, a book demands your full attention and rewards you with genuine insight. ' +
      'Even reading just fifteen minutes a day adds up to twenty books a year. ' +
      'Start with a topic you are passionate about. ' +
      'Visit your library, pick up a book, and rediscover the joy of reading. ' +
      'It is one of the best investments you can make in yourself.'
  },

  {
    id: 'per-7',
    title: 'The Case for a Four-Day Work Week',
    category: 'persuasive',
    estimatedDuration: 88,
    difficulty: 'intermediate',
    targetDimensions: ['pitch_variation', 'expressive_emph', 'pausing_fluency'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'For over a century, the five-day, forty-hour work week has been the standard. But is it actually the best way to work? ' +
      'A growing body of research suggests that a four-day work week does not reduce productivity. In many cases, it increases it. ' +
      'Microsoft Japan implemented a four-day week and saw productivity rise by forty percent. ' +
      'Iceland ran the world\'s largest trial of reduced work hours, and the results were overwhelmingly positive. Workers reported less stress and burnout, and performance remained the same or improved. ' +
      'The reason is simple. When people have adequate rest and personal time, they return to work more focused, more motivated, and more creative. ' +
      'Overworked employees make more mistakes, take more sick days, and are more likely to quit. ' +
      'A four-day week also benefits families, mental health, the environment, and gender equality, as more equitable sharing of domestic responsibilities becomes possible. ' +
      'The question is not whether we can afford to work four days a week. The question is whether we can afford not to.'
  },

  {
    id: 'per-8',
    title: 'The Argument for Universal Basic Income',
    category: 'persuasive',
    estimatedDuration: 90,
    difficulty: 'intermediate',
    targetDimensions: ['loud_control', 'articulation_clarity', 'expressive_emph'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'Universal Basic Income, the idea of providing every citizen with a regular, unconditional cash payment, sounds radical. But the evidence in its favor is growing. ' +
      'Pilot programs in Finland, Kenya, and Stockton, California have shown that unconditional cash does not make people lazy. ' +
      'Instead, recipients worked more, started businesses, invested in education, and reported better mental health. ' +
      'As automation displaces millions of jobs, we face a future where traditional employment may not provide enough for everyone. ' +
      'UBI offers a foundation of financial security that would allow people to take risks, pursue education, and care for family members without falling into poverty. ' +
      'It would reduce inequality, simplify bureaucratic welfare systems, and give workers more bargaining power against exploitative employers. ' +
      'Critics argue it is too expensive, but studies show that UBI could be funded through taxes on wealth, carbon emissions, and financial transactions. ' +
      'Economic security is not a luxury. It is the foundation upon which people build better lives. ' +
      'Universal Basic Income is not a radical idea. It is a practical response to the world we are building.'
  },

  {
    id: 'per-9',
    title: 'Why Mental Health Must Be a Priority',
    category: 'persuasive',
    estimatedDuration: 85,
    difficulty: 'intermediate',
    targetDimensions: ['expressive_emph', 'pitch_variation', 'loud_control'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'We would never tell someone with a broken leg to just push through it. Yet every day, we expect people struggling with depression, anxiety, or trauma to simply toughen up. ' +
      'Mental illness is not a weakness. It is a health condition, just as real and just as serious as any physical disease. ' +
      'One in four people will experience a mental health problem in their lifetime. That means someone in nearly every family, every classroom, and every workplace is affected. ' +
      'Despite this, mental health care remains underfunded, stigmatized, and inaccessible to millions. ' +
      'The consequences are devastating: lost productivity, broken relationships, homelessness, and tragically, suicide. ' +
      'Prioritizing mental health means investing in accessible therapy, training teachers and employers to recognize warning signs, and ending the shame that prevents people from seeking help. ' +
      'It means talking openly about our struggles instead of hiding them. ' +
      'When we take care of our minds, everything improves: our relationships, our work, our physical health, and our communities. ' +
      'Mental health is not a side issue. It is the issue at the center of everything.'
  },

  {
    id: 'per-10',
    title: 'Transition to Renewable Energy Now',
    category: 'persuasive',
    estimatedDuration: 88,
    difficulty: 'intermediate',
    targetDimensions: ['pausing_fluency', 'loud_control', 'pitch_variation'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'The era of fossil fuels must end. Not in fifty years. Not in thirty. Now. ' +
      'The scientific consensus is unambiguous: burning coal, oil, and gas is the primary driver of climate change, threatening the stability of every ecosystem on Earth. ' +
      'We are not talking about a distant future risk. We are watching it unfold in real time through record-breaking wildfires, floods, and superstorms. ' +
      'The good news is that the alternative is ready. Solar and wind energy are now the cheapest sources of electricity in history. ' +
      'Battery storage technology is rapidly advancing. Electric vehicles are becoming mainstream. ' +
      'A full transition to renewable energy would not only solve our climate crisis but would also create millions of new jobs and reduce the air pollution that kills seven million people every year. ' +
      'The only barriers are political will and entrenched interests of fossil fuel companies that profit from delay. ' +
      'We cannot let those interests determine the future of our planet. ' +
      'The transition to clean energy is not just an environmental imperative. It is an economic opportunity and a moral obligation.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSUASIVE — ADVANCED (per-11 to per-15)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'per-11',
    title: 'Reduce Your Screen Time',
    category: 'persuasive',
    estimatedDuration: 85,
    difficulty: 'advanced',
    targetDimensions: ['pitch_variation', 'expressive_emph', 'loud_control'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'The average person now spends over seven hours a day staring at screens. ' +
      'Our phones have become extensions of ourselves, yet this constant connectivity comes at a serious cost. ' +
      'Excessive screen time has been linked to poor sleep, reduced attention spans, increased anxiety, and a distorted sense of reality fueled by social media comparisons. ' +
      'We scroll mindlessly, consuming content that rarely enriches our lives. ' +
      'Meanwhile, real experiences, meaningful conversations, and creative pursuits go neglected. ' +
      'I am not suggesting we abandon technology. But we must become intentional about how we use it. ' +
      'Set limits on social media. Put your phone away during meals and before bedtime. ' +
      'Choose face-to-face conversations over texts. ' +
      'Reclaim your attention, because attention is the most precious resource you have. ' +
      'When you control your screen time, you take back control of your life.'
  },

  {
    id: 'per-12',
    title: 'End Solitary Confinement',
    category: 'persuasive',
    estimatedDuration: 92,
    difficulty: 'advanced',
    targetDimensions: ['expressive_emph', 'loud_control', 'pitch_variation'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'Solitary confinement — locking a person alone in a small cell for twenty-two to twenty-four hours a day — is used in prisons across the country. ' +
      'It is presented as a necessary tool for maintaining safety. But the evidence tells a different story. ' +
      'Psychologists and neuroscientists agree that prolonged isolation causes severe psychological damage. ' +
      'Anxiety, hallucinations, paranoia, self-harm, and suicide are common outcomes. ' +
      'Humans are social animals. We are not built to withstand complete isolation. ' +
      'Solitary confinement does not make prisons safer. Studies consistently show it increases violence and worsens behavior. ' +
      'It does not deter crime. It simply breaks people. ' +
      'And those broken people are eventually released back into society. ' +
      'The United Nations has declared that solitary confinement lasting more than fifteen days constitutes cruel, inhuman, or degrading treatment. ' +
      'We must hold ourselves to that standard. ' +
      'A justice system that inflicts psychological torture is not justice at all. It is cruelty wearing the mask of order. ' +
      'We can and must do better.'
  },

  {
    id: 'per-13',
    title: 'We Must Regulate Artificial Intelligence',
    category: 'persuasive',
    estimatedDuration: 90,
    difficulty: 'advanced',
    targetDimensions: ['filler_words_score', 'articulation_clarity', 'expressive_emph'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'high',
    scriptTargetArticulation: 'high',
    rawText:
      'Artificial intelligence is no longer the future. It is the present, and it is moving faster than our institutions can keep up. ' +
      'AI systems are already making decisions about who gets a job interview, who receives a loan, who is flagged by law enforcement, and what information we see online. ' +
      'These systems can be biased, opaque, and wrong in ways that harm real people. ' +
      'And yet there is no comprehensive legal framework governing how they are built or deployed. ' +
      'We regulate cars, pharmaceuticals, financial products, and aircraft because the stakes of getting them wrong are too high. ' +
      'The stakes with AI are higher still. ' +
      'Unregulated AI threatens not just individual rights but the foundations of democracy itself, through disinformation, surveillance, and the concentration of power in the hands of a few technology companies. ' +
      'Strong AI regulation does not mean stifling innovation. It means ensuring that innovation serves humanity rather than exploiting it. ' +
      'We need transparency requirements, independent audits, enforceable accountability, and democratic oversight. ' +
      'The window to shape this technology is closing. We must act now, before the technology shapes us instead.'
  },

  {
    id: 'per-14',
    title: 'Our Moral Obligation to Give',
    category: 'persuasive',
    estimatedDuration: 88,
    difficulty: 'advanced',
    targetDimensions: ['pausing_fluency', 'pitch_variation', 'expressive_emph'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'Right now, a child is dying from a preventable disease. Not because the cure doesn\'t exist, but because it costs a few dollars that no one gave. ' +
      'Philosopher Peter Singer posed a famous challenge: if you saw a child drowning in a shallow pond, you would rescue them without hesitation, even if it meant ruining your shoes. ' +
      'The cost is trivial. The life is priceless. ' +
      'Now consider that we have the power to save lives across the world with the same ease, through effective charities that deliver vaccines, clean water, and medical treatment at remarkably low cost. ' +
      'If we would save the drowning child in front of us, why do we not save the child we cannot see? ' +
      'Distance does not diminish our moral responsibility. ' +
      'Effective altruism is not about sacrificing your wellbeing. It is about recognizing that even a small portion of your income, given wisely, can have an extraordinary impact on another human life. ' +
      'We are extraordinarily lucky to have been born where we were. ' +
      'That luck carries a responsibility. ' +
      'Give what you can. Give effectively. And give now.'
  },

  {
    id: 'per-15',
    title: 'Abolish the Death Penalty',
    category: 'persuasive',
    estimatedDuration: 92,
    difficulty: 'advanced',
    targetDimensions: ['loud_control', 'articulation_clarity', 'pausing_fluency'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'The death penalty is the ultimate, irreversible punishment. And because it is irreversible, it demands a standard of certainty we cannot meet. ' +
      'Since nineteen seventy three, more than one hundred and ninety people on death row in the United States have been exonerated and freed. ' +
      'One hundred and ninety people who were innocent, who came within reach of execution. ' +
      'Every major study on the subject has found no credible evidence that the death penalty deters violent crime. ' +
      'States without it do not have higher murder rates than those with it. ' +
      'It is also more expensive to execute a person than to imprison them for life, when accounting for the lengthy legal process. ' +
      'And it falls disproportionately on the poor, on racial minorities, and on those who cannot afford adequate legal representation. ' +
      'This is not justice. It is a system riddled with bias and error, attached to the most permanent of consequences. ' +
      'Over two-thirds of the world\'s countries have abolished the death penalty. ' +
      'It is time for us to join them. ' +
      'A civilized society does not respond to killing by killing. We can choose better.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTIVATIONAL — BEGINNER (mot-1 to mot-5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'mot-1',
    title: 'Believe in Yourself',
    category: 'motivational',
    estimatedDuration: 75,
    difficulty: 'beginner',
    targetDimensions: ['expressive_emph', 'pitch_variation', 'loud_control'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Every great achievement in history began with a single belief: that it was possible. ' +
      'The people who changed the world were not always the smartest or the most talented. ' +
      'They were the ones who refused to stop believing in themselves when everyone else told them to quit. ' +
      'You have been given unique gifts, a unique perspective, and a unique path. ' +
      'There will be moments of doubt, moments when failure feels permanent and the goal feels impossibly far away. ' +
      'But those are the moments that define you. ' +
      'Not the wins, not the applause, but the quiet choice to keep going when giving up would be easier. ' +
      'Do not measure your worth by your setbacks. Measure it by your resilience. ' +
      'Every step forward, no matter how small, is proof that you are capable of more than you know. ' +
      'Believe in yourself. The world is waiting for what only you can bring to it.'
  },

  {
    id: 'mot-2',
    title: 'You Are More Capable Than You Think',
    category: 'motivational',
    estimatedDuration: 72,
    difficulty: 'beginner',
    targetDimensions: ['expressive_emph', 'loud_control', 'pausing_fluency'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'You are more capable than you think. That is not a platitude. It is a documented fact. ' +
      'Study after study shows that people consistently underestimate what they can accomplish when they commit fully to a goal. ' +
      'The version of yourself you imagine on your best day, that person is not out of reach. ' +
      'That is who you become when you stop letting fear make your decisions for you. ' +
      'Think about the challenges you have already overcome in your life. ' +
      'The times you were certain you couldn\'t do it, and then you did. ' +
      'Every one of those moments was proof that your limits are further than you think. ' +
      'You do not need to be fearless. You just need to be willing. ' +
      'Willing to try, to fail, to learn, and to try again. ' +
      'Start with the next step, not the whole staircase. ' +
      'The capability is already inside you. Now go find out how far it takes you.'
  },

  {
    id: 'mot-3',
    title: 'Small Steps Lead to Big Changes',
    category: 'motivational',
    estimatedDuration: 68,
    difficulty: 'beginner',
    targetDimensions: ['pausing_fluency', 'speech_pace', 'expressive_emph'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'We often wait for a perfect moment, a big opportunity, a dramatic turning point before we start changing our lives. ' +
      'But transformation rarely comes from a single grand gesture. ' +
      'It comes from small, consistent actions repeated over time. ' +
      'The athlete who trains fifteen minutes a day builds strength the couch-sitter never will. ' +
      'The writer who produces two hundred words every morning will have a book by year\'s end. ' +
      'The saver who puts away ten dollars a week builds a financial cushion that feels impossible to the one who spends everything. ' +
      'Small steps are not small things. They are the building blocks of every significant achievement. ' +
      'You do not need to overhaul your entire life today. ' +
      'Just do one thing, one small, concrete thing better than yesterday. ' +
      'Then do it again tomorrow. ' +
      'Trust the process. The big changes will come. And when they do, you will know exactly how you got there.'
  },

  {
    id: 'mot-4',
    title: 'Start Before You Feel Ready',
    category: 'motivational',
    estimatedDuration: 70,
    difficulty: 'beginner',
    targetDimensions: ['loud_control', 'pitch_variation', 'expressive_emph'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'There is a lie we tell ourselves. That we will start when we feel ready. ' +
      'When we have more time, more money, more confidence, more experience. ' +
      'But readiness is a feeling that very rarely arrives on its own. ' +
      'It is built through action, not before it. ' +
      'Every person you admire who has achieved something meaningful did not wait until they felt fully prepared. ' +
      'They started with doubt in their hearts and moved forward anyway. ' +
      'The first draft is always messy. The first attempt is always imperfect. ' +
      'That is how it is supposed to be. ' +
      'Perfection is not a starting point. It is, at best, a distant destination. ' +
      'The longer you wait for perfect conditions, the more of your potential remains unused. ' +
      'Start imperfect. Start uncertain. Start small if you must. ' +
      'But start. Because starting is the one thing that separates the life you are living from the life you are dreaming of.'
  },

  {
    id: 'mot-5',
    title: 'The Power of a Positive Mindset',
    category: 'motivational',
    estimatedDuration: 72,
    difficulty: 'beginner',
    targetDimensions: ['expressive_emph', 'pausing_fluency', 'pitch_variation'],
    targetWpmRange: { min: 110, max: 130 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'low',
    rawText:
      'Your mindset is not just your attitude. It is the lens through which you experience everything. ' +
      'Research in positive psychology shows that optimistic people are healthier, more resilient, more successful, and live longer than pessimists. ' +
      'This is not because positive people face fewer difficulties. It is because they interpret and respond to difficulties differently. ' +
      'Where a fixed mindset sees failure as proof of limitation, a growth mindset sees it as information and opportunity. ' +
      'Where one person sees a closed door, another sees a reason to find a new path. ' +
      'A positive mindset does not mean denying reality or pretending problems don\'t exist. ' +
      'It means believing that you have the capacity to respond, adapt, and improve. ' +
      'That belief changes everything. It changes the actions you take, the risks you are willing to try, and the outcomes you ultimately create. ' +
      'Your thoughts shape your world. ' +
      'Choose them carefully. Train them deliberately. ' +
      'And watch what becomes possible when you do.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTIVATIONAL — INTERMEDIATE (mot-6 to mot-10)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'mot-6',
    title: 'Overcoming Fear of Failure',
    category: 'motivational',
    estimatedDuration: 80,
    difficulty: 'intermediate',
    targetDimensions: ['pitch_variation', 'expressive_emph', 'pausing_fluency'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'medium',
    rawText:
      'Fear of failure is the greatest obstacle standing between you and the life you want to live. ' +
      'It whispers that you are not ready, that you might embarrass yourself, that success is for other people, not for you. ' +
      'But here is the truth: every person you admire has failed, many times and in very public ways. ' +
      'Failure is not the opposite of success. It is part of the process. ' +
      'Every time you fall, you learn something that cannot be taught any other way. ' +
      'The people who never fail are the people who never try. And what kind of life is that? ' +
      'Stop waiting for the perfect moment, the perfect plan, or the perfect version of yourself. ' +
      'Start now, with what you have, where you are. ' +
      'Embrace failure as your teacher, not your enemy. ' +
      'Because on the other side of your fear is the person you were always meant to become.'
  },

  {
    id: 'mot-7',
    title: 'Embrace Discomfort',
    category: 'motivational',
    estimatedDuration: 82,
    difficulty: 'intermediate',
    targetDimensions: ['expressive_emph', 'loud_control', 'pitch_variation'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'medium',
    rawText:
      'Every person who has ever grown beyond who they were has had to pass through discomfort to get there. ' +
      'Growth and comfort do not coexist. You must choose one. ' +
      'We are wired to seek safety and avoid pain. That instinct kept our ancestors alive. ' +
      'But in modern life, the things that make us most uncomfortable, the difficult conversation, the vulnerable performance, the unfamiliar challenge, are precisely the things that move us forward. ' +
      'When you choose comfort over growth, you are not standing still. You are moving backward. ' +
      'The world changes. Skills become obsolete. Relationships evolve. The person who refuses to be uncomfortable will eventually find themselves left behind. ' +
      'The person who leans into discomfort becomes stronger with each experience. ' +
      'Athletes call it training. Therapists call it growth. ' +
      'I call it the price of becoming who you are meant to be. ' +
      'Seek out the thing that scares you a little. Do it imperfectly. ' +
      'Do it afraid. And watch who you become on the other side.'
  },

  {
    id: 'mot-8',
    title: 'The Compound Effect of Daily Habits',
    category: 'motivational',
    estimatedDuration: 85,
    difficulty: 'intermediate',
    targetDimensions: ['pausing_fluency', 'speech_pace', 'expressive_emph'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'medium',
    rawText:
      'The most powerful force in achieving your goals is not motivation or talent. It is compounding. ' +
      'Just as money grows exponentially when invested and left to compound, so do skills, habits, and character. ' +
      'Improving by just one percent each day does not feel dramatic. But over a year, you will be thirty-seven times better than when you started. ' +
      'The problem is that early results are invisible. The person who reads ten pages a day does not feel smarter tomorrow. ' +
      'The person who works out consistently does not look different after a week. ' +
      'So people give up before the compound effect kicks in. ' +
      'They mistake the absence of immediate results for evidence that nothing is working. ' +
      'Success is not a single moment. It is the accumulated weight of thousands of small decisions. ' +
      'The discipline you show today, when it is inconvenient, when no one is watching, when you don\'t feel like it, that is what eventually separates you from where you started. ' +
      'Trust the process. Stay consistent. The compound effect always pays out.'
  },

  {
    id: 'mot-9',
    title: 'Find Your Why',
    category: 'motivational',
    estimatedDuration: 82,
    difficulty: 'intermediate',
    targetDimensions: ['pitch_variation', 'pausing_fluency', 'loud_control'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'medium',
    rawText:
      'Motivation is unreliable. It rises and falls with your mood, your energy, your circumstances. ' +
      'What sustains great people through adversity is not motivation. It is purpose. ' +
      'Simon Sinek famously said that people don\'t buy what you do, they buy why you do it. ' +
      'The same is true for the way you live your life. ' +
      'When you know your why, your reason for getting up, for pushing through, for giving your best even when it costs you, everything changes. ' +
      'Decisions become clearer. Sacrifices become easier. Setbacks become temporary. ' +
      'A person without a why drifts. They work hard in bursts, then lose steam. ' +
      'A person with a why builds something that lasts. ' +
      'Your why does not have to be grand. It can be your family, your craft, your community, your desire to prove something to yourself. ' +
      'But it has to be real. It has to matter to you. ' +
      'Take the time to find your why. Because once you do, you will never struggle with the how for long.'
  },

  {
    id: 'mot-10',
    title: 'Rise After Falling',
    category: 'motivational',
    estimatedDuration: 80,
    difficulty: 'intermediate',
    targetDimensions: ['expressive_emph', 'pitch_variation', 'pausing_fluency'],
    targetWpmRange: { min: 120, max: 140 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'medium',
    rawText:
      'Everyone falls. Everyone faces moments when the path ahead looks impossible and the weight of failure presses down. ' +
      'What separates people is not whether they fall. It is what they do after. ' +
      'History is filled with people who were counted out before they achieved their greatest work. ' +
      'Walt Disney was fired from a newspaper for lacking imagination. ' +
      'J.K. Rowling was rejected by twelve publishers before Harry Potter found a home. ' +
      'Michael Jordan was cut from his high school basketball team. ' +
      'These are not stories of people who were naturally gifted and glided to success. ' +
      'They are stories of people who fell, felt the full weight of that fall, and chose to stand up again. ' +
      'The fall is not your story. The getting back up is your story. ' +
      'Every time you rise after being knocked down, you build something that no one can take from you: the certain knowledge that you will rise again. ' +
      'Fall forward. Fall loudly. But always, always rise.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTIVATIONAL — ADVANCED (mot-11 to mot-15)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'mot-11',
    title: 'The Power of Now',
    category: 'motivational',
    estimatedDuration: 80,
    difficulty: 'advanced',
    targetDimensions: ['pausing_fluency', 'speech_pace', 'pitch_variation'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'Most of us spend our lives either regretting the past or worrying about the future. ' +
      'We replay old mistakes and rehearse imaginary problems, while the present moment slips by unnoticed. ' +
      'But the present moment is the only place where life actually happens. ' +
      'It is the only place where you can make a decision, take action, or feel truly alive. ' +
      'When you are fully present, everything changes. ' +
      'You become more creative, more connected to the people around you, and more effective at everything you do. ' +
      'Mindfulness is not just a wellness trend. It is a fundamental skill for human flourishing. ' +
      'You do not need to meditate for hours to practice it. ' +
      'Simply pause, breathe, and notice where you are right now. ' +
      'Life is not waiting for you in the future. It is happening right here, right now. Do not miss it.'
  },

  {
    id: 'mot-12',
    title: 'The Man in the Arena',
    category: 'motivational',
    estimatedDuration: 92,
    difficulty: 'advanced',
    targetDimensions: ['expressive_emph', 'loud_control', 'pitch_variation'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'medium',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'high',
    rawText:
      'It is not the critic who counts. Not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. ' +
      'The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood. ' +
      'Who strives valiantly. Who errs, who comes short again and again, because there is no effort without error and shortcoming. ' +
      'But who does actually strive to do the deeds. Who knows great enthusiasms, the great devotions. ' +
      'Who spends himself in a worthy cause. ' +
      'Who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly. ' +
      'So that his place shall never be with those cold and timid souls who neither know victory nor defeat. ' +
      'These words from Theodore Roosevelt remain as true today as they were over a century ago. ' +
      'Step into the arena. Show up fully. Be willing to be seen, to fail, to try again. ' +
      'The arena is where life happens. The critics are merely watching from the stands.'
  },

  {
    id: 'mot-13',
    title: 'We Choose to Go to the Moon',
    category: 'motivational',
    estimatedDuration: 95,
    difficulty: 'advanced',
    targetDimensions: ['expressive_emph', 'pitch_variation', 'pausing_fluency'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'We choose to go to the Moon. We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard. ' +
      'Because that goal will serve to organize and measure the best of our energies and skills. ' +
      'Because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win. ' +
      'President Kennedy spoke those words in nineteen sixty two, and seven years later, humans walked on the Moon. ' +
      'What made that possible was not just technology. It was a collective commitment to a bold, seemingly impossible vision. ' +
      'The greatest achievements of our species have always begun with someone being audacious enough to say: we can do this. ' +
      'Right now, the challenges before us are enormous. Climate change. Disease. Inequality. ' +
      'But so is our capacity to rise to them. ' +
      'We are at our best when we choose the hard thing, not because it is comfortable, but because it matters. ' +
      'What is the Moon you are choosing to go to? ' +
      'Name it. Commit to it. And begin.'
  },

  {
    id: 'mot-14',
    title: 'It Always Seems Impossible Until It Is Done',
    category: 'motivational',
    estimatedDuration: 90,
    difficulty: 'advanced',
    targetDimensions: ['pausing_fluency', 'expressive_emph', 'loud_control'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'medium',
    scriptTargetFiller:       'medium',
    scriptTargetArticulation: 'high',
    rawText:
      'It always seems impossible until it is done. ' +
      'Those words, attributed to Nelson Mandela, carry the weight of a man who spent twenty-seven years in prison and still emerged to lead a nation. ' +
      'If anyone had reason to believe that change was impossible, it was him. ' +
      'And yet he did not stop believing. He did not stop working. ' +
      'Think about the things in your life that once seemed impossible. ' +
      'The skill you now have that once felt completely out of reach. ' +
      'The relationship you repaired. The obstacle you overcame. ' +
      'All of it seemed impossible, once. ' +
      'The mind is incredibly poor at judging what is achievable before the work begins. ' +
      'Fear tells us the gap is too wide to cross. But the only way to find out is to start walking. ' +
      'What looks like a wall from the outside is often a door, visible only when you get close enough to see the handle. ' +
      'Whatever you are facing today that feels impossible, remember that you are not seeing it fully yet. ' +
      'Begin. Move toward it. Let it be done.'
  },

  {
    id: 'mot-15',
    title: 'Vulnerability Is Strength',
    category: 'motivational',
    estimatedDuration: 92,
    difficulty: 'advanced',
    targetDimensions: ['pausing_fluency', 'pitch_variation', 'expressive_emph'],
    targetWpmRange: { min: 130, max: 155 },
    scriptTargetPausing:      'high',
    scriptTargetPitch:        'high',
    scriptTargetFiller:       'low',
    scriptTargetArticulation: 'high',
    rawText:
      'We live in a culture that treats vulnerability as weakness. ' +
      'We are taught to project confidence, to have the answers, to appear strong at all times. ' +
      'But researcher Brené Brown spent years studying human connection and found something surprising. ' +
      'Vulnerability, the willingness to be seen fully, with all your uncertainty and imperfection, is not weakness. ' +
      'It is the birthplace of courage, creativity, and genuine connection. ' +
      'The people who live the most meaningful lives are not the ones who have it all figured out. ' +
      'They are the ones who are willing to say, I don\'t know. I\'m scared. I need help. I was wrong. ' +
      'It takes far more strength to be open than to be armored. ' +
      'The armor we wear to protect ourselves also prevents us from being truly seen, truly known, and truly loved. ' +
      'Connection requires risk. Growth requires honesty. Leadership requires the courage to be imperfect in public. ' +
      'So let yourself be seen. Not despite your humanity, but because of it. ' +
      'That is where the real strength lives.'
  }

];
