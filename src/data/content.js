// ─────────────────────────────────────────────────────────────
//  ALL site content lives here. Components never hard-code text,
//  links or image paths. Wrap ONE word per headline in *stars* to
//  render it as the italic maroon accent word.
//  Anything marked [EDIT] still needs a real detail from Chamu.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Chamuditha Lakshani",
  short: "Chamu",
  monogram: "CL",
  role: "Social Media Marketer & Digital Marketer",
  location: "Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  phone: "+94 76 961 4195",
  whatsapp: "https://wa.me/94769614195",
  email: "chamulakshani019@gmail.com",
  linkedin: "https://www.linkedin.com/in/chamuditha-lakshani-a13aa2327",
  github: "https://github.com/chamu19",
  instagram: "", // [EDIT] e.g. "https://instagram.com/yourhandle" — the row is hidden while empty
  instagramHandle: "", // [EDIT] e.g. "@yourhandle"
  cv: "Chamuditha-Lakshani-CV.pdf", // [EDIT] drop the PDF in the project root
  photo: "images/chamu.jpg",
  photoAlt:
    "Portrait of Chamuditha Lakshani smiling, wearing a navy blazer over a white top against a soft grey backdrop",
  languages: ["Sinhala", "English", "Tamil"],
  // Contact form: paste a Formspree / Web3Forms endpoint here. While empty, the form opens the visitor's email app instead.
  formEndpoint: "", // [EDIT] e.g. "https://formspree.io/f/abcdwxyz"
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Cases", href: "#cases" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const preloader = { word: "Loading", signature: "Chamu" };

export const hero = {
  meta: ["Portfolio 2026", "Colombo, Sri Lanka"],
  headline: ["I create content", "that makes people", "*stop* scrolling."],
  sub: "Social Media Marketer & Digital Marketer · Canva designer · AI-powered content creator.",
  ctaPrimary: { label: "View my work", href: "#work" },
  ctaSecondary: { label: "Hire me on WhatsApp", href: "whatsapp" },
  ctaCv: "Download CV",
  chips: [
    { icon: "heart", label: "Content" },
    { icon: "trend", label: "Growth" },
    { icon: "spark", label: "AI prompting" },
  ],
  // ids from `work` shown as the floating cards around the photo
  floating: ["nescafe-calm-smooth-bold", "doritos-pick-your-heat", "barista-made-for-you"],
  marquee: [
    "Instagram",
    "Facebook",
    "TikTok",
    "Canva",
    "Content strategy",
    "Ad creatives",
    "AI prompting",
    "Copywriting",
  ],
};

// ── Selected work ────────────────────────────────────────────
// type: "post" (4:5 / 1:1 / print) | "story" (9:16) | "carousel" (several images)
// ratio: "4:5" | "1:1" | "9:16" | "a4"
// status: "Client" for paid/real work, "Concept" for self-initiated spec work on brands you don't work for.
// Images live in /work as  name.jpg (full, ≤1350px tall) + name-560.jpg (grid thumbnail).
export const work = [
  {
    id: "viec-story",
    images: ["viec-story"],
    ratio: "9:16",
    type: "story",
    category: "Stories",
    brand: "VIEC Sri Lanka",
    status: "Campaign", // [EDIT] "Client" if VIEC commissioned this
    year: 2026,
    idea: "A/L leavers tick off their own checklist — the last box is a degree in Australia.",
    alt: "Purple Instagram story for VIEC Sri Lanka: 'A/Ls done? Your Australian degree starts here' above a hand-ticked A/L exam checklist ending in 'Uni degree in Australia, Feb 2027'.",
    tools: ["Canva", "AI image gen", "ChatGPT"],
    featured: true,
  },
  {
    id: "doritos-pick-your-heat",
    images: ["doritos-pick-your-heat"],
    ratio: "4:5",
    type: "post",
    category: "Social Posts",
    brand: "Doritos",
    status: "Concept",
    year: 2026,
    idea: "Five flavours, one fire headline — a poll-style post built for comments.",
    alt: "Red Doritos poster with five flavour packs circling the flaming headline 'Pick your heat', chips exploding outward.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "nescafe-calm-smooth-bold",
    images: ["nescafe-calm-smooth-bold"],
    ratio: "4:5",
    type: "post",
    category: "Social Posts",
    brand: "Nescafé Gold",
    status: "Concept",
    year: 2026,
    idea: "One word per jar — Calm, Smooth, Bold — so shoppers pick by mood, not by label.",
    alt: "Three Nescafé jars — Decaf, Gold Blend and Espresso — each under a giant gold word: Calm, Smooth, Bold. Tagline: Pick your gold.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "barista-made-for-you",
    images: ["barista-made-for-you"],
    ratio: "4:5",
    type: "post",
    category: "Ads",
    brand: "Barista",
    status: "Concept",
    year: 2026,
    idea: "Buy-1-get-1 offer told through the cup itself — the name on it is simply 'You'.",
    alt: "Orange Barista ad: a white takeaway cup with 'You' handwritten on it, repeated 'Made for you' headline, milk splash and beans, 'Buy 1 get 1 free every weekday 3–5pm'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "kfc-crunch",
    images: ["kfc-crunch"],
    ratio: "4:5",
    type: "post",
    category: "Ads",
    brand: "KFC",
    status: "Concept",
    year: 2026,
    idea: "The headline is made of the product — you can almost hear the word 'Crunch'.",
    alt: "KFC bucket ad on red: the word CRUNCH spelled in fried-chicken letters above a bucket, with 'Bucket deals from Rs. 1,990 — order now'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "viec-feed",
    images: ["viec-feed"],
    ratio: "4:5",
    type: "post",
    category: "Ads",
    brand: "VIEC Sri Lanka",
    status: "Campaign", // [EDIT]
    year: 2026,
    idea: "Neon, gen-Z type for school leavers, with two clear CTAs: apply or talk to a counsellor.",
    alt: "Dark purple VIEC feed post with huge neon type 'Degree starts in Australia', checklist of scholarships, leading universities and pathway options, and the February 2027 intake.",
    tools: ["Canva", "ChatGPT"],
  },
  {
    id: "doritos-which-one",
    images: ["doritos-which-one"],
    ratio: "4:5",
    type: "post",
    category: "Social Posts",
    brand: "Doritos",
    status: "Concept",
    year: 2026,
    idea: "'Which one are you?' — an identity question that turns a flavour range into a comment thread.",
    alt: "Doritos poster stacking giant 3D flavour names — Cool Ranch, Sweet Chili, Spicy Nacho, Nacho Cheese, BBQ — each beside its pack, asking 'Which one are you?'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "nescafe-aroma-story",
    images: ["nescafe-aroma-story"],
    ratio: "9:16",
    type: "story",
    category: "Stories",
    brand: "Nescafé Gold",
    status: "Concept",
    year: 2026,
    idea: "Steam writes the word 'Aroma' — a full-screen story that sells a smell.",
    alt: "Vertical Nescafé story: steam rising from an open Gold Blend jar curls into the script word 'Aroma', with Decaf and Espresso jars either side.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "kfc-whole-squad",
    images: ["kfc-whole-squad"],
    ratio: "4:5",
    type: "post",
    category: "Ads",
    brand: "KFC",
    status: "Concept",
    year: 2026,
    idea: "A sharing-bucket ad written for group chats: 'One bucket. Whole squad.'",
    alt: "KFC poster on red-and-white stripes: 'One bucket. Whole squad.' above a bucket of fried chicken surrounded by sides, with an '8 pcs + 4 sides' badge.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "milo-fuel",
    images: ["milo-fuel-v2", "milo-fuel-v1"],
    ratio: "4:5",
    type: "carousel",
    category: "Carousels",
    brand: "Milo",
    status: "Concept",
    year: 2026,
    idea: "Two headline treatments of one hero shot, made to A/B test which stops more thumbs.",
    alt: "Milo 180ml pack bursting through a chocolate-milk splash with cocoa pods and malt on green, headline 'Fuel the next play'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "barista-slow-mornings",
    images: ["barista-slow-mornings"],
    ratio: "4:5",
    type: "post",
    category: "Social Posts",
    brand: "Barista",
    status: "Concept",
    year: 2026,
    idea: "Big condensed type, warm café light — a morning-routine post for the commuter feed.",
    alt: "Barista poster: huge orange 'Slow mornings. Strong brews.' beside a steaming Barista takeaway cup on a café counter.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "viec-print",
    images: ["viec-print"],
    ratio: "a4",
    type: "post",
    category: "Branding",
    brand: "VIEC Sri Lanka",
    status: "Campaign", // [EDIT]
    year: 2026,
    idea: "Print-ready flyer for school visits: torn exam paper reveals the Australian campus behind.",
    alt: "A4 VIEC flyer: torn notebook paper headline 'A/Ls done? Your Australian degree starts Feb 2027' over a sunny university campus with a smiling student.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "doritos-enter-triangle",
    images: ["doritos-enter-triangle"],
    ratio: "4:5",
    type: "post",
    category: "Social Posts",
    brand: "Doritos",
    status: "Concept",
    year: 2026,
    idea: "A neon tunnel shaped like the chip — gamer-culture energy for a bold-flavour drop.",
    alt: "Doritos poster: packs and chips fly out of a neon triangular tunnel lettered 'Enter the triangle'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "nescafe-gold-collection",
    images: ["nescafe-gold-collection"],
    ratio: "4:5",
    type: "post",
    category: "Branding",
    brand: "Nescafé Gold",
    status: "Concept",
    year: 2026,
    idea: "Luxury-magazine styling: the range sits inside giant brushed-gold letters.",
    alt: "Three Nescafé jars nestled in giant brushed-gold letters spelling GOLD, coffee grounds spilling, captioned 'The Gold Collection'.",
    tools: ["Canva", "AI image gen"],
  },
  {
    id: "barista-table",
    images: ["barista-table"],
    ratio: "4:5",
    type: "post",
    category: "Branding",
    brand: "Barista",
    status: "Concept",
    year: 2026,
    idea: "Selling the space, not the coffee: an evening interior with a neon 'Your table is waiting'.",
    alt: "Warm Barista café interior with green velvet chairs and an orange neon sign reading 'Your table is waiting'; footer 'Coffee · Pastries · Good company'.",
    tools: ["Canva", "AI image gen"],
  },
];

export const workSection = {
  num: "02",
  label: "Selected work",
  title: ["Posters that stop", "the *scroll*."],
  intro:
    "Instagram posts, stories, ad creatives and print — each one starts with a single idea a thumb can get in half a second.",
  filters: ["All", "Social Posts", "Stories", "Ads", "Carousels", "Branding"],
  initialCount: 9,
  loadMore: "Load more",
  disclaimer:
    "Brand pieces marked Concept are self-initiated spec work made for practice and pitching. They are not affiliated with or endorsed by those brands.",
};

// ── Featured campaign (dark band) ────────────────────────────
export const featured = {
  num: "03",
  label: "Featured campaign",
  title: ["One campaign,", "every *format*."],
  brand: "VIEC Sri Lanka · February 2027 intake",
  text: "One message — “A/Ls done? Your Australian degree starts here.” — adapted for the feed, for stories and for print, so school leavers see the same promise everywhere they look.",
  handle: "viecsrilanka",
  // left phone: 9-post feed grid (ids from `work`)
  feed: [
    "viec-feed",
    "viec-story",
    "viec-print",
    "doritos-pick-your-heat",
    "nescafe-calm-smooth-bold",
    "barista-made-for-you",
    "kfc-crunch",
    "milo-fuel",
    "doritos-which-one",
  ],
  // centre phone: auto-advancing story slides
  story: ["viec-story", "viec-feed", "viec-print"],
  // right phone: single sponsored post
  ad: { id: "viec-feed", cta: "Apply now", caption: "A/Ls done? Talk to a VIEC counsellor about Feb 2027 🇦🇺" },
  // Only real numbers. Add reach / followers once you have the insights screenshots.
  stats: [
    { value: 3, suffix: "", label: "formats for one campaign" },
    { value: "workCount", suffix: "", label: "posters in this portfolio" },
    { value: "brandCount", suffix: "", label: "brands designed for" },
    { value: 3, suffix: "", label: "platforms: Instagram, Facebook, TikTok" },
  ],
};

// ── Case studies ─────────────────────────────────────────────
export const casesSection = {
  num: "04",
  label: "Case studies",
  title: ["Strategy first,", "*design* second."],
  intro: "Every set of posters starts with a goal and an audience. Here's the thinking behind a few of them.",
};

export const cases = [
  {
    brand: "VIEC Sri Lanka",
    tag: "Education · Lead generation",
    goal: "Get A/L leavers and their parents to enquire about the February 2027 intake.",
    idea: "Use the exam itself as the hook: a checklist the student already knows, ending in a degree abroad. One message, three formats — story, feed and A4 print for school visits.",
    made: ["viec-story", "viec-feed", "viec-print"],
    result: "", // [EDIT — real numbers only, e.g. enquiries, reach, saves]
  },
  {
    brand: "Doritos",
    tag: "Concept · Engagement",
    goal: "Make a five-flavour range feel like five personalities and drive comments.",
    idea: "Give every flavour a colour and a voice, then ask the audience to pick a side: 'Pick your heat', 'Which one are you?', 'Enter the triangle'.",
    made: ["doritos-pick-your-heat", "doritos-which-one", "doritos-enter-triangle"],
    result: "Self-initiated concept — designed to practise a comment-led series, not a paid campaign.",
  },
  {
    brand: "Barista",
    tag: "Concept · Footfall",
    goal: "Bring people into the café on slow weekday afternoons.",
    idea: "Three content pillars — the space, the ritual and the offer — tied together by one orange and one condensed typeface.",
    made: ["barista-table", "barista-slow-mornings", "barista-made-for-you"],
    result: "Self-initiated concept — a ready-to-run month of café content.",
  },
  {
    brand: "My own process",
    tag: "How I plan a month",
    goal: "Turn a brief into a calendar of posts that look like one brand.",
    process: [
      "Research",
      "Content calendar",
      "AI-assisted copy (ChatGPT / Claude)",
      "Canva design",
      "Schedule (Meta Business Suite)",
      "Review insights",
    ],
    idea: "I start from the audience and the one action we want, write hooks before visuals, and review insights every week to double down on what gets saved and shared.",
    made: [],
    result: "",
  },
];

// ── Services ─────────────────────────────────────────────────
export const servicesSection = {
  num: "05",
  label: "Services",
  title: ["What I can do", "for your *brand*."],
  availability: "Available for internships, full-time roles & freelance projects.",
  cta: "Let's talk",
};

export const services = [
  { title: "Social Media Management", text: "Planning, posting, community replies and a clear monthly insights report." },
  { title: "Poster & Ad Creative Design", text: "Instagram & Facebook posts, stories, carousels and offer posters designed in Canva." },
  { title: "Content Strategy & Calendars", text: "Content pillars, hooks and month-by-month calendars your team can follow." },
  { title: "Digital Marketing Campaigns", text: "Campaign ideas, Meta ad creatives, basic targeting and simple reporting." },
  { title: "AI-Powered Content", text: "Captions, scripts and visuals using ChatGPT, Claude and AI image tools — with a human edit." },
  { title: "Landing Pages & Web Basics", text: "Simple websites and campaign landing pages, thanks to my software engineering studies." },
];

// ── About ────────────────────────────────────────────────────
export const about = {
  num: "06",
  label: "About",
  title: ["Content, design", "and the *tech* behind it."],
  polaroidCaption: "Chamu, Colombo",
  bio: [
    "I'm Chamuditha — a social media and digital marketer from Colombo, Sri Lanka. I plan content, design scroll-stopping posters in Canva, and use AI tools to move faster without losing the human touch.",
    "My software engineering studies (Pearson HND, ESOFT Uni) mean I also understand websites, data and the tech side of marketing. I speak Sinhala, English and Tamil, so I can create content for every audience in Sri Lanka.",
  ],
  skillsLabel: "Skills",
  skills: [
    { name: "Social Media Management", level: "Core" },
    { name: "Digital Marketing", level: "Core" },
    { name: "Content Strategy", level: "Core" },
    { name: "Graphic Design & Branding", level: "Core" },
    { name: "AI Prompting", level: "Advanced" },
    { name: "Copywriting", level: "Strong" },
    { name: "Team Leadership", level: "Strong" },
    { name: "Time Management", level: "Strong" },
  ],
  toolsLabel: "Tools",
  tools: [
    "Canva",
    "Meta Business Suite",
    "Instagram",
    "Facebook",
    "TikTok",
    "ChatGPT",
    "Claude",
    "AI image generators",
    // [EDIT] add CapCut / Google Analytics / Figma if you use them
    "HTML/CSS",
    "React",
  ],
  languagesLabel: "Languages",
};

// ── Journey ──────────────────────────────────────────────────
export const journeySection = {
  num: "07",
  label: "Journey",
  title: ["Education &", "*achievements*."],
};

// [EDIT] add marketing work, internships, freelance clients or pages you manage at the TOP.
export const journey = [
  { year: "2025–26", title: "Student Council Member", org: "ESOFT Uni, Jaffna", text: "Represented students and helped organise and promote campus events." },
  { year: "2024–26", title: "Pearson HND in Software Engineering", org: "ESOFT Uni, Jaffna", text: "Software design, web technologies and databases." },
  { year: "2024", title: "Diploma in Information & Communication Technology", org: "ICBT Campus, Jaffna", text: "" },
  { year: "2024", title: "International Diploma in English", org: "ICBT Campus, Jaffna", text: "Communication and presentation skills." },
  { year: "2015–18", title: "Prefect", org: "Dehiwala Jayasinghe National College", text: "Early leadership, discipline and responsibility." },
];

// ── Contact ──────────────────────────────────────────────────
export const contact = {
  num: "08",
  label: "Contact",
  title: ["Let's grow your", "*brand* together."],
  location: "Colombo, Sri Lanka · Open to on-site, hybrid & remote work.",
  form: {
    title: "Or send a short brief",
    fields: { name: "Name", email: "Email", company: "Brand / Company", message: "Message" },
    submit: "Send message",
    sending: "Sending…",
    success: "Thank you — I'll reply within a day.",
    error: "Something went wrong. Please message me on WhatsApp instead.",
  },
  cv: "Download CV (PDF)",
};

export const footer = {
  wordmark: "LAKSHANI",
  backToTop: "Back to top",
  clockLabel: "Colombo",
  year: 2026,
};
