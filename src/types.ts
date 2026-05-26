export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string; // name of Lucide icon to render dynamically
  tech: string[];
  gradient: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  personality: string;
  timezone: string;
  responseTime: string;
  github?: string;
  linkedin?: string;
  avatarSrc: string; // Path to team member avatar image
}

export interface CaseStudy {
  id: string;
  title: string;
  concept: string;
  category: string;
  features: string[];
  techStack: string[];
  aiAspect: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
}

export interface AuditResult {
  executiveSummary: string;
  findings: {
    issue: string;
    impact: string;
    solution: string;
    complexity: "Low" | "Medium" | "High" | string;
  }[];
  blueprintSteps: {
    stepNumber: number;
    label: string;
    description: string;
    systemUsed: string;
  }[];
  estimatedReturn: {
    hoursSavedWeekly: number;
    monthlySavingsDollars: number;
    roiPercentage: number;
  };
  draftProposal: string;
}
