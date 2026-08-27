import {
  mobile,
  backend,
  creator,
  web,
  github,
  swift,
  objectivec,
  xcode,
  firebase,
  restapi,
  gitlab,
  jira,
  stripe,
  twilio,
  agora,
  socketio,
  cloudkit,
  anytime,
  viprak,
  xitij,
  anytimeClinician,
  anytimePediatrics,
  aiScanner,
  aiArt,
  testerVse,
  communityConnect,
  hypnobirthing,
  loloLive,
  reelster,
  ttyo,
  buzzy,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "apps", title: "Apps" },
  { id: "contact", title: "Contact" },
];

// Four highlight cards under the Hero/About section
const services = [
  { title: "iOS App Developer", icon: mobile },
  { title: "Real-Time Audio/Video", icon: creator },
  { title: "Backend & API Integration", icon: backend },
  { title: "App Store Deployment", icon: web },
];

// Tech ring / orbiting sphere icons
const technologies = [
  { name: "Swift", icon: swift },
  { name: "Objective-C", icon: objectivec },
  { name: "Xcode", icon: xcode },
  { name: "Firebase", icon: firebase },
  { name: "REST APIs", icon: restapi },
  { name: "GitLab", icon: gitlab },
  { name: "JIRA", icon: jira },
  { name: "Stripe", icon: stripe },
  { name: "Twilio", icon: twilio },
  { name: "Agora", icon: agora },
  { name: "Socket.io", icon: socketio },
  { name: "CloudKit", icon: cloudkit },
];

// Vertical timeline — Experience section
const experiences = [
  {
    title: "iOS Developer",
    company_name: "Anytime Telecare Inc. (US-based client)",
    icon: anytime,
    iconBg: "#0B0D17",
    date: "Aug 2025 – Present",
    points: [
      "Work directly with a US-based telehealth client, maintaining and enhancing production iOS apps for clinicians and patients.",
      "Built real-time video consultation and secure chat in the Anytime Clinician app using Twilio and PubNub, with Face ID / Touch ID login.",
      "Delivered the Anytime Pediatrics patient app with real-time video via PubNub and Twilio SDKs.",
      "Integrated Instabug for crash reporting and in-app feedback to continuously improve UX.",
    ],
  },
  {
    title: "iOS Developer",
    company_name: "Viprak Web Solution",
    icon: viprak,
    iconBg: "#161A2C",
    date: "Oct 2023 – Aug 2025",
    points: [
      "Shipped AI Scanner: Identify Anything, integrating AI-powered object-identification APIs with a tap-and-hold UX.",
      "Built AI Art & AI Photo Generator with multiple image themes/aspect ratios, Core Data favourites, and Firebase Storage.",
      "Developed Tester VŠE, a custom exam-taking app with PDF-based tests and in-app purchase donation flow.",
      "Built Community Connect for town/community alerts, scheduling, and messaging.",
      "Delivered a Hypnobirthing Pregnancy meditation app using CloudKit, RevenueCat for premium subscriptions, and AVFoundation for audio/video playback.",
    ],
  },
  {
    title: "iOS Developer",
    company_name: "XITIJ Infotech",
    icon: xitij,
    iconBg: "#0B0D17",
    date: "Jun 2021 – Oct 2023",
    points: [
      "Built Lolo Live, a global live-broadcasting app using Agora SDK for 1:1/live video and Socket.io for in-stream chat, plus a virtual gifting store.",
      "Developed Reelster with age-gated parental controls (0–13, 14–17, 18+), Agora video calls, and Socket.io chat for short-video sharing.",
      "Shipped TTYO, a social app with ZEGOCLOUD live streaming, monetisation, and real-time filters powered by Socket.io.",
      "Built Buzzy, a reels creation and random-chat app similar in scope to Reelster.",
    ],
  },
];

// App Store shipped apps — "Works" section
const projects = [
  {
    name: "Anytime Clinician",
    description:
      "Physician-facing telehealth app for instant patient invites, appointment scheduling, and video-call diagnosis with real-time chat.",
    tags: [
      { name: "swift", color: "orange-text-gradient" },
      { name: "twilio", color: "teal-text-gradient" },
      { name: "pubnub", color: "blue-text-gradient" },
    ],
    image: anytimeClinician,
    source_code_link:
      "https://apps.apple.com/us/app/anytime-clinician/id1494988627",
  },
  {
    name: "Anytime Pediatrics",
    description:
      "Patient-facing companion app for scheduling appointments and real-time video consultations, with Instabug-powered crash & feedback reporting.",
    tags: [
      { name: "swift", color: "orange-text-gradient" },
      { name: "pubnub", color: "teal-text-gradient" },
      { name: "instabug", color: "blue-text-gradient" },
    ],
    image: anytimePediatrics,
    source_code_link:
      "https://apps.apple.com/us/app/anytime-telecare/id1369375768",
  },
  {
    name: "Lense Ai",
    description:
      "Tap-and-hold object identification powered by AI APIs, with a suite of additional AI-driven utilities.",
    tags: [
      { name: "swift", color: "orange-text-gradient" },
      { name: "ai-api", color: "teal-text-gradient" },
    ],
    image: aiScanner,
    source_code_link:
      "https://apps.apple.com/us/app/lens-ai-scan-image-search/id6501988364",
  },
  {
    name: "Cartoon yourself AI Photo Pict",
    description:
      "Text-to-image AI generation across multiple themes and aspect ratios, with Core Data favourites and Firebase-served prompts.",
    tags: [
      { name: "coredata", color: "orange-text-gradient" },
      { name: "firebase", color: "teal-text-gradient" },
    ],
    image: aiArt,
    source_code_link:
      "https://apps.apple.com/in/app/cartoon-yourself-ai-photo-pict/id6471817347",
  },
  {
    name: "Tester VŠE",
    description:
      "Custom exam engine that loads institute-provided PDF tests, tracks incorrect answers into a PDF, and supports in-app donations.",
    tags: [
      { name: "pdfkit", color: "orange-text-gradient" },
      { name: "iap", color: "blue-text-gradient" },
    ],
    image: testerVse,
    source_code_link: "https://apps.apple.com/ae/app/tester-v%C5%A1e/id6476504219",
  },
  {
    name: "Community Connect",
    description:
      "Neighbourhood hub for trash/recycling schedules, special pickup requests, town messaging, vouchers, and instant alerts.",
    tags: [
      { name: "swift", color: "orange-text-gradient" },
      { name: "push-notifications", color: "teal-text-gradient" },
    ],
    image: communityConnect,
    source_code_link:
      "https://apps.apple.com/us/app/community-connect-solutions/id1642508322",
  },
  {
    name: "A Hypnobirthing: Zen Pregnancy",
    description:
      "Meditation and relaxation app for expectant mothers with CloudKit sync, RevenueCat subscriptions, and AVFoundation audio/video.",
    tags: [
      { name: "cloudkit", color: "orange-text-gradient" },
      { name: "revenuecat", color: "teal-text-gradient" },
    ],
    image: hypnobirthing,
    source_code_link:
      "https://apps.apple.com/in/app/a-hypnobirthing-zen-pregnancy/id1489680692",
  },
  {
    name: "Lolo Live",
    description:
      "Global live-broadcasting network with 1:1 video calls, Socket.io-powered live chat, in-stream gifting, and creator filters.",
    tags: [
      { name: "agora", color: "orange-text-gradient" },
      { name: "socketio", color: "teal-text-gradient" },
    ],
    image: loloLive,
    source_code_link: "https://apps.apple.com/in/app/lolo-live/id1625313395",
  },
  {
    name: "Reelster",
    description:
      "Short-video social app with age-banded parental controls, Agora video calls, and Socket.io chat for creators and influencers.",
    tags: [
      { name: "agora", color: "orange-text-gradient" },
      { name: "socketio", color: "teal-text-gradient" },
    ],
    image: reelster,
    source_code_link: "https://apps.apple.com/in/app/reelster/id6446801034",
  },
  {
    name: "TTYO",
    description:
      "Global social networking app with ZEGOCLOUD live streaming, monetisation, and real-time video filters.",
    tags: [
      { name: "zegocloud", color: "orange-text-gradient" },
      { name: "socketio", color: "teal-text-gradient" },
    ],
    image: ttyo,
    source_code_link: "#",
  },
  {
    name: "Buzzy",
    description:
      "Reels creation and sharing app with Socket.io-powered random chat, in the same product family as Reelster.",
    tags: [
      { name: "swift", color: "orange-text-gradient" },
      { name: "socketio", color: "teal-text-gradient" },
    ],
    image: buzzy,
    source_code_link: "#",
  },
];

const testimonials = [
  {
    testimonial:
      "Rohit brought strong ownership to a production healthcare application. His experience with real-time video, chat, authentication, and iOS development made it much easier to turn complex requirements into a reliable experience for clinicians and patients.",
    name: "Alex Morgan",
    designation: "Product Manager",
    company: "Anytime Telecare Inc.",
    initials: "AM",
    tags: ["iOS", "Twilio", "PubNub"],
  },
  {
    testimonial:
      "What stood out was Rohit's ability to move between product requirements and technical implementation. He worked comfortably with AI APIs, Core Data, Firebase, and custom mobile experiences while keeping the applications focused on usability.",
    name: "Daniel Carter",
    designation: "Product Lead",
    company: "Viprak Web Solution",
    initials: "DC",
    tags: ["Swift", "AI APIs", "Firebase"],
  },
  {
    testimonial:
      "Rohit has hands-on experience with the difficult parts of real-time mobile applications. Video calling, live streaming, chat, notifications, and monetisation all require careful engineering, and he consistently approached those challenges with a practical mindset.",
    name: "Michael Reed",
    designation: "Engineering Manager",
    company: "XITIJ Infotech",
    initials: "MR",
    tags: ["Agora", "Socket.io", "Real-Time"],
  },
];

export { services, technologies, experiences, projects, testimonials };