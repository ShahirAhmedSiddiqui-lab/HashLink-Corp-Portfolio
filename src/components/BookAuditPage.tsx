import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { AuditResult } from "../types";
import { ArrowRight, BarChart3, CheckCircle, Clock, Copy, CornerDownRight, Cpu, FileText, Loader2, Sparkles, Terminal } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function BookAuditPage() {
  // Form coordinates
  const [form, setForm] = useState({
    companyName: "",
    industry: "SaaS & Software",
    employeeCount: "10-50",
    primaryBottleneck: "",
    techStack: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerTextRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Massive Editorial Typographic Reveal (Clip-Path)
      gsap.fromTo(
        headerTextRef.current,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 60,
          opacity: 0,
        },
        {
          clipPath: "polygon(0% -20%, 100% -20%, 100% 120%, 0% 120%)",
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitAuditForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.primaryBottleneck) {
      setError("Please complete the core fields (Company Name and Primary Bottleneck).");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAuditResult(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Failed to generate your tactical intelligence teardown. Make sure GEMINI_API_KEY is configured.");
      }

      const parsed: AuditResult = await response.json();
      setAuditResult(parsed);
    } catch (err: any) {
      console.error("Express API Submission error:", err);
      setError(err.message || "An unexpected network coordinate failure occurred. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyProposalToClipboard = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(normalizeProposalMarkdown(auditResult.draftProposal));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const normalizeProposalMarkdown = (markdown: string) => markdown.replace(/\\n/g, "\n").trim();

  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${part}-${index}`} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return part;
    });
  };

  const renderProposalMarkdown = (markdown: string) => {
    const lines = normalizeProposalMarkdown(markdown).split("\n");

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        return <div key={`space-${index}`} className="h-3" />;
      }

      if (trimmedLine.startsWith("# ")) {
        return (
          <h3 key={index} className="font-display text-xl md:text-2xl font-black text-white leading-tight mb-4">
            {trimmedLine.replace(/^#\s+/, "")}
          </h3>
        );
      }

      if (trimmedLine.startsWith("## ")) {
        return (
          <h4 key={index} className="font-display text-base md:text-lg font-bold text-brand-purple mt-5 mb-2">
            {trimmedLine.replace(/^##\s+/, "")}
          </h4>
        );
      }

      if (/^[-*]\s+/.test(trimmedLine)) {
        return (
          <div key={index} className="flex items-start gap-2 text-xs md:text-sm text-white/75 leading-relaxed mb-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />
            <span>{renderInlineMarkdown(trimmedLine.replace(/^[-*]\s+/, ""))}</span>
          </div>
        );
      }

      return (
        <p key={index} className="text-xs md:text-sm text-white/70 leading-relaxed mb-3">
          {renderInlineMarkdown(trimmedLine)}
        </p>
      );
    });
  };

  const gmailBookingUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hashlink.corp@gmail.com&su=${encodeURIComponent(
    `HashLink operational audit for ${form.companyName || "your company"}`
  )}`;

  // Static timeline tracking
  const timelineSteps = [
    { title: "Submit Request", desc: "Define your tech stack and core manual operational friction points in the workspace form below." },
    { title: "Discovery Call", desc: "Join Shaheer for a brief 20-minute operational coordinates review to lock down logical inputs." },
    { title: "Audit & Strategy", desc: "Our squad blueprints custom background jobs, n8n webhook targets, and local database models." },
    { title: "Sprints Proposal", desc: "Review exact line-item deliverables, weekly timelines to ship, and structured support retainers." }
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen pt-32 pb-24 bg-radial-grid select-none overflow-hidden">
      {/* Background radial glowing effects */}
      <div className="absolute left-1/4 top-1/4 w-[420px] h-[420px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-[360px] h-[360px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px] relative z-10">
        
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 text-left">
          <span className="font-mono text-xs text-brand-purple uppercase tracking-[0.2em] font-bold block mb-3">
            // INTERACTIVE AUDIT WORKSPACE
          </span>
          <div className="overflow-hidden pb-4">
            <h2 ref={headerTextRef} className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] mb-6">
              Blueprint Your Leverage
            </h2>
          </div>
          <p className="text-[#D1D5DB]/60 tracking-wide text-lg leading-relaxed font-light">
            Skip the generic marketing calls. Feed our engine your core back-office friction points below, and watch our artificial architect compute custom ROI calculations and compile a draft blueprint proposal immediately.
          </p>
        </div>

        {/* Audit Timeline Process Map */}
        <div className="mb-20">
          <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-8 text-center sm:text-left">
            AUDIT_PROCESS_TIMELINE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/2 relative overflow-hidden group">
                <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple font-mono font-bold text-xs flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-display font-bold text-base text-white mb-2 group-hover:text-brand-purple transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {step.desc}
                </p>
                {/* Connector indicators */}
                {idx < 3 && (
                  <div className="absolute right-0 top-1/2 w-4 h-[1px] bg-white/10 hidden md:block select-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two halves split: intake form left, dashboard responses right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Glassmorphic Intake Form */}
          <div className="lg:col-span-5 text-left">
            <div className="glass-card border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase block mb-6">
                INTAKE_PARAMETERS_PANEL_V25
              </span>

              <form onSubmit={submitAuditForm} className="space-y-6">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    COMPANY_NAME *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={form.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apollo Logistics Inc."
                    className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors font-sans"
                  />
                </div>

                {/* Grid inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Industry */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-white/60 uppercase tracking-wider mb-2">
                      INDUSTRY
                    </label>
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleInputChange}
                      className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors"
                    >
                      <option value="SaaS & Software">B2B SaaS</option>
                      <option value="E-commerce & Retail">E-commerce</option>
                      <option value="Professional Services">Service Agencies</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Other">Other Category</option>
                    </select>
                  </div>

                  {/* Employee Count */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-white/60 uppercase tracking-wider mb-2">
                      TEAM_SIZE
                    </label>
                    <select
                      name="employeeCount"
                      value={form.employeeCount}
                      onChange={handleInputChange}
                      className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors"
                    >
                      <option value="1-9">1-9 Specialists</option>
                      <option value="10-50">10-50 Staff</option>
                      <option value="51-200">51-200 Staff</option>
                      <option value="200+">Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Target Bottleneck */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    PRIMARY_MANUAL_FRICTION_POINT *
                  </label>
                  <textarea
                    name="primaryBottleneck"
                    required
                    rows={4}
                    value={form.primaryBottleneck}
                    onChange={handleInputChange}
                    placeholder="Describe what your staff repeatedly keys in or where leads leak out (e.g., 'Moving leads from custom forms to Google Sheets and formatting email pitches manually every morning')."
                    className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors font-sans leading-relaxed resize-none"
                  />
                </div>

                {/* Current Tech stack */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    CURRENT_TECH_STACK_REF
                  </label>
                  <input
                    type="text"
                    name="techStack"
                    value={form.techStack}
                    onChange={handleInputChange}
                    placeholder="e.g. HubSpot, Slack, Google Calendar, Excel"
                    className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors font-sans"
                  />
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      COMPILING DATA PIPELINES...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-current" />
                      SYNTHESIZE OPERATIONAL AUDIT
                    </>
                  )}
                </button>
              </form>

              {/* Secure sandbox note */}
              <div className="mt-6 flex items-start gap-2 pt-6 border-t border-white/5 text-[10px] text-white/35 font-mono">
                <Terminal className="w-4 h-4 text-brand-purple shrink-0" />
                <span>SEC_WORKSPACE: Raw details are encrypted and analyzed using the highly secure Gemini framework server-side. Absolutely no commercial storage logs are kept.</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Output Strategy Deck console */}
          <div className="lg:col-span-7 text-left">
            <div className="glass-card border border-white/10 rounded-3xl p-8 min-h-[520px] flex flex-col justify-center relative bg-bg-card/40 overflow-hidden">
              
              {/* If loading */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
                  <Loader2 className="w-12 h-12 text-brand-purple animate-spin" />
                  <div className="font-mono text-xs text-white/70 tracking-widest uppercase">
                    blueprinting automated architectures...
                  </div>
                  <p className="text-white/40 text-xs max-w-sm leading-relaxed font-light mt-1">
                    Gemini model is dissecting your manual processes, calculating standard hour savings, and compiling a line-item proposal draft...
                  </p>
                </div>
              )}

              {/* If stale state (empty) */}
              {!isLoading && !auditResult && !error && (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-20 select-text">
                  <Cpu className="w-14 h-14 text-white/10 animate-pulse" />
                  <div className="font-mono text-xs text-white/50 tracking-widest uppercase">
                    WAITING_FOR_PARAMETERS_INPUT
                  </div>
                  <p className="text-white/30 text-xs max-w-xs leading-relaxed font-light">
                    Complete the left-hand configuration forms and press Synthesize to view custom operational outcomes immediately.
                  </p>
                </div>
              )}

              {/* If network / key error */}
              {!isLoading && error && (
                <div className="p-6 border border-rose-500/20 bg-rose-500/5 rounded-2xl flex flex-col gap-3 max-w-lg mx-auto select-text">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-sm uppercase">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    COORDINATE_CONNECTION_ERR
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-mono">
                    {error}
                  </p>
                </div>
              )}

              {/* RENDER SUCCESS MATRIX: AI Teardown strategy */}
              {!isLoading && auditResult && (
                <div className="flex flex-col gap-8 animate-fade-in select-text">
                  
                  {/* Top: Computed Financial leverage metrics */}
                  <div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-4">
                      COMPUTED_IMPACT_METRICS_MATRIX
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                        <div className="font-mono text-[9px] text-white/40 tracking-wider mb-1 lowercase">hours_saved/wk</div>
                        <div className="font-display font-black text-2xl text-brand-purple">{auditResult.estimatedReturn.hoursSavedWeekly} hrs</div>
                      </div>
                      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <div className="font-mono text-[9px] text-white/40 tracking-wider mb-1 lowercase">est_mthly_savings</div>
                        <div className="font-display font-black text-2xl text-cyan-400">${auditResult.estimatedReturn.monthlySavingsDollars}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="font-mono text-[9px] text-white/40 tracking-wider mb-1 lowercase">projected_ann_roi</div>
                        <div className="font-display font-black text-2xl text-emerald-400">+{auditResult.estimatedReturn.roiPercentage}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Executive review markdown text */}
                  <div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-2">
                      EXECUTIVE_SUMMARY_OUTPUT
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-light italic">
                      "{auditResult.executiveSummary}"
                    </p>
                  </div>

                  {/* Findings matrix highlights */}
                  <div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-4">
                      IDENTIFIED_FRICTION_POINTS_&_REMEDIES
                    </div>
                    <div className="space-y-4">
                      {auditResult.findings.map((f, i) => (
                        <div key={i} className="p-5 border border-white/5 bg-white/1 rounded-2xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-white uppercase tracking-tight">{f.issue}</span>
                            <span className={`font-mono text-[8.5px] px-2 py-0.5 rounded uppercase tracking-widest ${
                              f.complexity === "Low" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                              f.complexity === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                              "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}>
                              COMPLEXITY: {f.complexity}
                            </span>
                          </div>
                          <div className="text-xs text-white/50 mb-3 leading-relaxed">
                            <span className="font-mono text-[9px] text-brand-purple">LEAK:</span> {f.impact}
                          </div>
                          <div className="text-xs text-white/85 bg-brand-purple/5 p-3 rounded-lg border border-brand-purple/10 leading-relaxed flex items-start gap-2">
                            <CornerDownRight className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                            <span>{f.solution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logical pipeline flowchart diagram */}
                  <div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-4">
                      ROUTING_LOGIC_BLUEPRINT_FLOW
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                      {auditResult.blueprintSteps.map((step, i) => (
                        <div key={i} className="flex-1 p-4 rounded-xl border border-white/5 bg-white/2 relative flex flex-col justify-between">
                          <div>
                            <div className="font-mono text-[9px] text-brand-purple mb-1">STEP_0{step.stepNumber}</div>
                            <div className="text-xs font-bold text-white mb-1 tracking-tight">{step.label}</div>
                            <p className="text-[10.5px] text-white/50 leading-relaxed font-light">{step.description}</p>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[9px] text-cyan-400 uppercase tracking-widest leading-none">
                            {step.systemUsed}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposal Markdown Draft section */}
                  <div>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                      <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                        COMPILED_MARKDOWN_PROPOSAL_DRAFT
                      </div>
                      <button
                        onClick={copyProposalToClipboard}
                        className="font-mono text-[9px] uppercase tracking-widest text-brand-purple hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-purple/5 border border-brand-purple/10 cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            COPIED_TO_CLIPBOARD
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            COPY_RAW_MARKDOWN
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-6 bg-[#04060d]/80 border border-white/5 rounded-2xl max-h-[30rem] overflow-y-auto text-left select-text">
                      {renderProposalMarkdown(auditResult.draftProposal)}
                    </div>
                  </div>

                  {/* Interactive Consultation Hotline Hook */}
                  <div className="p-6 rounded-2xl bg-gradient-to-tr from-brand-purple/10 to-transparent border border-brand-purple/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left flex flex-col gap-1">
                      <div className="font-mono text-[9.5px] text-brand-purple uppercase tracking-widest font-semibold">SCHEDULE DIRECT DESIGN STRATEGY</div>
                      <h4 className="font-display font-medium text-lg text-white">Unlock Shaheer Siddiqui's Calendar Coordinate</h4>
                      <p className="text-xs text-white/50 max-w-sm leading-relaxed">Schedule a direct workshop to refine these generated findings into active sprint milestones.</p>
                    </div>
                    <a
                      href={gmailBookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 shrink-0 rounded-xl bg-brand-purple hover:bg-opacity-95 text-white font-mono text-xs uppercase tracking-widest shadow-md transition-all flex items-center gap-2"
                    >
                      Lock In Booking Slot
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
