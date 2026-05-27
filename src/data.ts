import { ServiceItem, TeamMember, CaseStudy } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "3d-landing-pages",
    title: "3D Interactive Landing Pages",
    description: "Immersive web experiences featuring cutting-edge 3D visualizations, interactive product demos, and particle effects that captivate audiences and drive conversion rates through technical excellence.",
    badge: "PREMIUM EXPERIENCE",
    iconName: "Sparkles",
    tech: ["Three.js", "Babel", "React Three Fiber", "GSAP", "WebGL"],
    gradient: "from-purple-600/20 to-violet-600/30"
  },
  {
    id: "saas-crm-dashboards",
    title: "Custom SaaS MVPs & CRM Dashboards",
    description: "Enterprise-grade platforms with intuitive interfaces, real-time data synchronization, secure multi-user access, and advanced analytics dashboards engineered for rapid market validation.",
    badge: "SCALE READY",
    iconName: "Layers",
    tech: ["React/Vite", "Node.js", "PostgreSQL", "Supabase", "Stripe", "Redis"],
    gradient: "from-emerald-600/20 to-teal-600/30"
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation & Integration",
    description: "Eliminate manual processes with intelligent automation pipelines that seamlessly integrate your existing tools, APIs, and databases for streamlined operational efficiency.",
    badge: "LEVERAGE",
    iconName: "Workflow",
    tech: ["n8n", "Zapier", "Make", "REST APIs", "Node.js", "Webhooks"],
    gradient: "from-blue-600/20 to-cyan-600/30"
  },
  {
    id: "ai-agents-chatbots",
    title: "AI Agents & Custom Chatbots",
    description: "Deploy sophisticated AI-powered assistants with advanced reasoning capabilities, context awareness, and multi-tool integration for customer support, lead qualification, and business automation.",
    badge: "CORE ENGINE",
    iconName: "Cpu",
    tech: ["OpenAI GPT-4", "Claude", "LangChain", "Vector DB", "FastAPI"],
    gradient: "from-orange-600/20 to-amber-600/30"
  },
  {
    id: "seo-uiux-engineering",
    title: "Programmatic SEO & UI/UX Engineering",
    description: "Data-driven design systems optimized for search visibility and user engagement, combining conversion-centered UX patterns with technical SEO architecture for maximum discoverability.",
    badge: "VISUALS + GROWTH",
    iconName: "BarChart3",
    tech: ["Framer Motion", "Tailwind CSS", "Next.js", "Schema Markup", "Analytics"],
    gradient: "from-fuchsia-600/20 to-pink-600/30"
  },
  {
    id: "backend-infrastructure",
    title: "Scalable Backend Infrastructure",
    description: "Production-ready server architecture with microservices design, database optimization, caching layers, and deployment pipelines engineered for high availability and zero-downtime scaling.",
    badge: "INFRASTRUCTURE",
    iconName: "Database",
    tech: ["Node.js", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS/GCP"],
    gradient: "from-red-600/20 to-rose-600/30"
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
    avatarSrc: "/team/shaheer-siddiqui.jpeg"
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
    avatarSrc: "/team/ahmed-raza.jpeg"
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
    avatarSrc: "/team/naveed-zahir.jpeg"
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
    avatarSrc: "/team/muhammad-waqas.jpeg"
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
