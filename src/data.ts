import { ServiceItem, TeamMember, CaseStudy } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-agents",
    title: "AI & Cognitive Agents",
    description: "Multi-agent orchestration, RAG architectures, and custom tool-connected assistants that perform complex business reasoning instead of generic chat.",
    badge: "CORE ENGINE",
    iconName: "Cpu",
    tech: ["OpenAI API", "Claude", "LangChain", "Supabase vector", "Python/FastAPI"],
    gradient: "from-purple-600/20 to-violet-600/30"
  },
  {
    id: "workflow-automation",
    title: "Autonomous Workflows",
    description: "Replace hours of manual spreadsheet work, email formatting, and data entry with production-ready background jobs, webhooks, and secure APIs.",
    badge: "LEVERAGE",
    iconName: "Workflow",
    tech: ["n8n", "Make", "Zapier", "REST APIs", "Node.js", "Webhooks"],
    gradient: "from-blue-600/20 to-cyan-600/30"
  },
  {
    id: "saas-engineering",
    title: "Custom SaaS MVP & Dashboards",
    description: "Robust full-stack platforms with built-in payments, secure authentication, and complex analytics engines, engineered for validation in weeks.",
    badge: "SCALE",
    iconName: "Layers",
    tech: ["React/Vite", "Node.js", "Express", "Supabase", "PostgreSQL", "Stripe"],
    gradient: "from-emerald-600/20 to-teal-600/30"
  },
  {
    id: "analytics-dashboards",
    title: "Intelligence Dashboards",
    description: "Stunning real-time visual reports tracking revenue metrics, sales pipeline, ticket volumes, and custom data streams using advanced charting.",
    badge: "VISUALS",
    iconName: "BarChart3",
    tech: ["Recharts", "D3.js", "Tailwind CSS", "REST APIs", "SQL"],
    gradient: "from-amber-600/20 to-orange-600/30"
  },
  {
    id: "uiux-engineering",
    title: "Luxury UI/UX Engineering",
    description: "Masterful high-fidelity designs, micro-animations, fluid layout transitions, and conversion-centered landing pages built desktop-first with ultimate mobile fluidity.",
    badge: "PREMIUM",
    iconName: "Sparkles",
    tech: ["Framer Motion", "Tailwind CSS", "Figma", "Satoshi & Syne"],
    gradient: "from-fuchsia-600/20 to-pink-600/30"
  }
];

export const MEMBERS_DATA: TeamMember[] = [
  {
    id: "member-1",
    name: "Shaheer Siddiqui",
    role: "Founder and CEO",
    expertise: ["Offer Structuring", "Discovery Audits", "Ops Strategy", "Client Relations"],
    personality: "Ruthless executioner. Turns complex operational problems into simple technical roadmaps.",
    timezone: "UTC +5",
    responseTime: "< 15 mins",
    github: "http://github.com/",
    linkedin: "https://www.linkedin.com/",
    avatarUrl: "🏆"
  },
  {
    id: "member-2",
    name: "Ahmed Raza",
    role: "Co-Founder and CTO",
    expertise: ["Core React/Vite", "Express/Node.js", "PostgreSQL", "Stripe Routing"],
    personality: "Writes pixel-perfect, secure interfaces and highly performant database queries at 60fps.",
    timezone: "UTC -5",
    responseTime: "< 30 mins",
    github: "http://github.com/",
    linkedin: "https://www.linkedin.com/",
    avatarUrl: "💻"
  },
  {
    id: "member-3",
    name: "Naveed Zahir",
    role: "Co-Founder and CPO",
    expertise: ["n8n Pipes", "Agent Orchestration", "RAG Systems", "Vector Indexes"],
    personality: "Obsessed with latency removal. Believes any repetitive keypress is a structural engineering failure.",
    timezone: "UTC +9",
    responseTime: "< 1 hour",
    github: "http://github.com/",
    linkedin: "https://www.linkedin.com/",
    avatarUrl: "🤖"
  },
  {
    id: "member-4",
    name: "Muhammad Waqas",
    role: "Co-Founder and CFO",
    expertise: ["Framer Motion", "WebGL & Three.js", "Conversion Strategy", "Creative Direction"],
    personality: "Sculpts glowing glassmorphic canvases. Spends hours calibrating easing curves and tracking widths.",
    timezone: "UTC +8",
    responseTime: "< 2 hours",
    github: "http://github.com/",
    linkedin: "https://www.linkedin.com/",
    avatarUrl: "✨"
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "ai-crm",
    title: "Autonomous Lead Routing",
    concept: "AI CRM Platform",
    category: "Concept Project",
    features: ["Intelligent Lead Scoring", "Instant Automated Response Generation", "Multi-Source Lead Sync", "Calendar Auto-Booking"],
    techStack: ["Next.js", "Supabase", "Gemini API", "Stripe", "Tailwind CSS"],
    aiAspect: "Gemini models score incoming leads, drafts immediate customized follow-up emails, and alerts sales Slack channels within 6 seconds of forms ingestion.",
    impactMetrics: [
      { label: "Lead Response Time", value: "6 Seconds" },
      { label: "Booked Call Boost", value: "+42%" },
      { label: "Human Effort Saved", value: "18 Hours/Wk" }
    ]
  },
  {
    id: "ai-support",
    title: "Cognitive Knowledge Retrieval",
    concept: "AI Customer Support Agent",
    category: "Demo Build",
    features: ["FAQ Auto-Ingestion", "Complex Semantic RAG Lookup", "Human Escalation Path", "Support Queue Multi-Channel Integration"],
    techStack: ["React", "FastAPI", "Pinecone Vector Store", "OpenAI / Gemini"],
    aiAspect: "Custom vector indexes convert support manuals, user PDFs, and Slack chats into clean semantic matrices, auto-solving 72% of Tier-1 support tickets.",
    impactMetrics: [
      { label: "Ticket Deflection", value: "72%" },
      { label: "Average Resolution", value: "< 1 Min" },
      { label: "Support Retention", value: "+19%" }
    ]
  },
  {
    id: "saas-analytics",
    title: "Executive Wealth Control Center",
    concept: "SaaS Analytics Dashboard",
    category: "HashLink Lab Case Study",
    features: ["MRR / Churn Growth Modeler", "Real-Time Transaction Feed", "Cohort Retentions Cohort Graphing", "Interactive Growth Recommendations"],
    techStack: ["Next.js", "PostgreSQL", "Recharts", "Stripe API Integration", "PostHog"],
    aiAspect: "Interactive charts visualize subscription health. Built-in model scans churn alerts and recommends automated discounts to target user accounts.",
    impactMetrics: [
      { label: "MRR Visibility", value: "Real-time" },
      { label: "Churn Prevention", value: "-14%" },
      { label: "Decision Efficiency", value: "3x Faster" }
    ]
  },
  {
    id: "ecom-intelligence",
    title: "Predictive Cart Ingestion",
    concept: "Ecommerce Intelligence Dashboard",
    category: "Internal Lab",
    features: ["Customer Segmentation Models", "Inventory Demand Preemptor", "Abandoned Cart Recovery Sequences", "Personalized Product recommendations"],
    techStack: ["Shopify Integration API", "FastAPI", "PostgreSQL", "Gemini", "Tailwind CSS"],
    aiAspect: "Examines historical buying patterns to forecast inventory requirements and launches personalized AI-tailored recovery sequences to abandoned checkouts.",
    impactMetrics: [
      { label: "Abandoned Cart Sales", value: "Recovered 22%" },
      { label: "Cart Order value", value: "+18%" },
      { label: "Forecast Accuracy", value: "94.6%" }
    ]
  },
  {
    id: "automation-control",
    title: "Syndicated Flow Monitoring",
    concept: "AI Workflow Automation Panel",
    category: "Internal Lab",
    features: ["Real-time Process Logs", "Automated Failure Healing", "API Key Management Hub", "Manual Execution Triggers"],
    techStack: ["React", "n8n Webhook Ingestion", "Supabase DB", "Node.js"],
    aiAspect: "Monitors errors on external APIs. If an external service returns a 500 error, Gemini reads the trace code, runs an n8n corrective task, and updates operators in Slack.",
    impactMetrics: [
      { label: "Intermittent Uptime", value: "99.9%" },
      { label: "Mean Time to Repair", value: "< 2 Mins" },
      { label: "System Overhead", value: "-45%" }
    ]
  }
];
