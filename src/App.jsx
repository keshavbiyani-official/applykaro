import { useState, useEffect, useRef } from "react";

const WHATSAPP_URL = "https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20get%20started%20with%20ApplyKaro";

const NAV_LINKS = ["How it works", "Pricing", "Our Story", "FAQ"];

const TICKER_ITEMS = [
  "✓ Amazon SDE-1 Applied",
  "✓ Razorpay Internship Done",
  "✓ Swiggy Fresher Applied",
  "✓ PhonePe Submitted",
  "✓ Wipro NLTH Applied",
  "✓ Zepto Backend Role Done",
  "✓ CRED Applied",
  "✓ TCS NQT Registered",
  "✓ Meesho SDE Applied",
  "✓ Infosys Portal Submitted",
];

const STEPS = [
  { num: "01", icon: "📋", title: "Share Your Profile", desc: "Quick 20-min onboarding on WhatsApp. Tell us target roles, companies, preferences. We handle the rest." },
  { num: "02", icon: "✍️", title: "We Build Your Docs", desc: "ATS-optimised resume variants and personalised cover letters per job category — not one generic version." },
  { num: "03", icon: "🚀", title: "We Apply Every Day", desc: "Real humans manually submit to company portals, Naukri, LinkedIn, Internshala — including Workday & Taleo." },
  { num: "04", icon: "📲", title: "You Get Proof + Calls", desc: "Every application gets a timestamped screenshot to your WhatsApp. Focus on interview prep." },
];

const COMPARISON_ROWS = [
  { label: "Applications/month", solo: "25–40", ai: "200 (skips most)", consult: "10–20", us: "200–500" },
  { label: "Personalised per job", solo: "✗", ai: "✗", consult: "✓", us: "✓" },
  { label: "Works on Workday/Taleo", solo: "✓ (30 min each)", ai: "✗ Skips", consult: "✗", us: "✓" },
  { label: "Screenshot proof", solo: "✗", ai: "✗", consult: "✗", us: "✓" },
  { label: "Refund if placed early", solo: "—", ai: "✗", consult: "✗", us: "✓" },
  { label: "Cost", solo: "Free (60+ hrs/mo)", ai: "₹2–5k/month", consult: "₹15–50k", us: "From ₹499" },
];

const PLANS = [
  {
    name: "Starter",
    price: "₹499",
    tag: null,
    sub: "Try us risk-free",
    apps: "25 applications",
    features: ["25 job applications", "ATS-optimised resume (1 variant)", "Cover letters included", "WhatsApp screenshot proof", "Naukri + LinkedIn + portals", "48hr turnaround to begin"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Standard",
    price: "₹999",
    tag: "🔥 Most Popular",
    sub: "Recommended for placements",
    apps: "100 applications",
    features: ["100 job applications", "3 resume variants by role type", "Personalised cover letters", "WhatsApp updates + screenshots", "All portals incl. Workday & Taleo", "Weekly strategy check-in call", "Pro-rata refund if placed early"],
    cta: "Start Now →",
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹2,999",
    tag: null,
    sub: "Maximum firepower",
    apps: "300 applications",
    features: ["300 job applications", "5 resume variants + LinkedIn rewrite", "Priority 24hr turnaround", "All portals + referral outreach", "Weekly 1:1 strategy call", "Interview prep guide", "Pro-rata refund policy"],
    cta: "Get Started",
    highlight: false,
  },
];

const FAQS = [
  { q: "Will recruiters know someone else applied for me?", a: "No. We apply using your own credentials and accounts. From the recruiter's end, it looks exactly like you applied — because technically you did, just with our team doing the form-filling. The resume, cover letter, profile — all yours. We're your hands, not your identity." },
  { q: "How is this different from AI tools like LazyApply?", a: "AI tools can only handle simple ATS systems like Greenhouse and Lever. They cannot navigate Workday, iCIMS, Taleo, or SAP SuccessFactors — where 70% of serious jobs live. Our human team handles all of them. We also personalise every application — AI sends identical ones that recruiters spot instantly." },
  { q: "What proof do I get that you actually applied?", a: "Every application comes with a timestamped screenshot of the confirmation page, sent directly to your WhatsApp. You know exactly where we applied, when, and which resume variant was used. Full transparency." },
  { q: "What if I get placed before using all my credits?", a: "We refund the pro-rata value of unused credits. No negotiations, no chasing us. This is built into our pricing model intentionally — we want you to get placed fast, even if that means giving money back." },
  { q: "Which portals do you apply to?", a: "LinkedIn, Naukri, Internshala, Wellfound, and company career portals directly — including Workday, Taleo, iCIMS, Greenhouse, Lever, SAP SuccessFactors. We cover everything." },
  { q: "I'm in final year during placement season. Can you handle off-campus simultaneously?", a: "Yes — this is exactly who we built this for. While you're prepping for on-campus drives, we're applying off-campus in parallel. Many of our beta users end up with better off-campus offers than anything from their placement cell." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,10,10,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s ease", padding: "0 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logo.png" alt="ApplyKaro" style={{ height: 38, width: "auto" }} />
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, "@media(max-width:768px)": { display: "none" } }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s", letterSpacing: "0.01em" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
              {l}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ background: "#F97316", color: "#fff", padding: "9px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif", transition: "transform 0.15s, box-shadow 0.15s", display: "inline-block" }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 0 20px rgba(249,115,22,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}>
            Start on WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, color: "#fff" }} className="hamburger" aria-label="Menu">
          {menuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(10,10,10,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1rem 1.5rem 1.5rem" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {l}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
            style={{ display: "block", background: "#F97316", color: "#fff", padding: "14px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif", textAlign: "center", marginTop: 16 }}>
            Start on WhatsApp 💬
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 1.5rem 80px", position: "relative", overflow: "hidden" }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 300, height: 300, background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />

      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 800, width: "100%" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, background: "#F97316", borderRadius: "50%", animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ color: "#F97316", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Now accepting beta users — limited slots</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: 1.0, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          Stop Filling<br />Job Forms.
        </h1>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)", lineHeight: 1.0, color: "#F97316", margin: "0 0 32px", letterSpacing: "-0.02em" }}>
          We'll Do It.
        </h1>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 44px", fontWeight: 400 }}>
          Real humans apply to 100+ jobs on your behalf — with custom resumes and personalised cover letters. Built for IIT, NIT, VIT, BITS students and Indian professionals.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F97316", color: "#fff", padding: "16px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 17, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: "0 4px 24px rgba(249,115,22,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(249,115,22,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(249,115,22,0.35)"; }}>
            💬 Start on WhatsApp
          </a>
          <a href="#how-it-works"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "16px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 17, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.18)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "transparent"; }}>
            See how it works ↓
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
          {[["Now open", "Beta cohort"], ["24 hours", "Turnaround"], ["All types", "Portals covered"], ["Screenshot", "Proof per app"]].map(([bold, light], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: "#F97316" }}>{bold}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{light}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "14px 0", overflow: "hidden", background: "rgba(249,115,22,0.04)" }}>
      <div style={{ display: "flex", animation: "ticker 30s linear infinite", width: "max-content", gap: 48 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
            <span style={{ color: "#F97316", marginRight: 8 }}>●</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "100px 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>The Process</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", margin: "12px 0 16px", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            From onboarding to<br />interview calls in days
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 460, lineHeight: 1.7 }}>
            We handle the entire application process. You focus on what actually matters — interview prep.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {STEPS.map((step, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>{step.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function VSSection() {
  return (
    <section style={{ padding: "80px 1.5rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>The Problem With AI Auto-Apply</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "#fff", margin: "12px 0 0", letterSpacing: "-0.01em" }}>Recruiters can spot AI spam instantly.<br /><span style={{ color: "#F97316" }}>We don't send spam.</span></h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {/* AI side */}
          <FadeIn delay={0.1}>
            <div style={{ background: "rgba(255,50,50,0.04)", border: "1px solid rgba(255,50,50,0.15)", borderRadius: 20, padding: "28px 24px" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: "#f87171", marginBottom: 20 }}>😵 AI Auto-Apply Tools</div>
              {["Skips Workday, Taleo, iCIMS — that's 70% of serious jobs", "Sends identical applications to every company", "Gets flagged as bot traffic on enterprise portals", "No cover letters, no customisation, no judgment", "Competes in the same pool as 10,000 other AI users", "Zero proof of what was actually submitted"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#f87171", fontSize: 15, flexShrink: 0, marginTop: 2 }}>✗</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Us */}
          <FadeIn delay={0.2}>
            <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "28px 24px" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: "#F97316", marginBottom: 20 }}>🎯 ApplyKaro</div>
              {["Manually navigates every portal including Workday and Taleo", "Custom resume variant per job category", "Real human = zero bot flags, zero rejections at form stage", "Personalised cover letter referencing each company", "WhatsApp screenshot proof of every single submission", "Pro-rata refund if you get placed before credits run out"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#F97316", fontSize: 15, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section style={{ padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>Full Comparison</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", margin: "12px 0 0", letterSpacing: "-0.01em" }}>Smarter than going alone.</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  <th style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.5)", padding: "16px 20px", textAlign: "left", letterSpacing: "0.04em", textTransform: "uppercase" }}>What You Get</th>
                  {["Solo 😵", "AI Auto-Apply 🤖", "Consultants 💸", "ApplyKaro 🎯"].map((h, i) => (
                    <th key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: i === 3 ? "#F97316" : "rgba(255,255,255,0.7)", padding: "16px 16px", textAlign: "center", background: i === 3 ? "rgba(249,115,22,0.08)" : "none" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", padding: "14px 20px", fontWeight: 500 }}>{row.label}</td>
                    {[row.solo, row.ai, row.consult, row.us].map((val, j) => (
                      <td key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: j === 3 ? "#fff" : (val.startsWith("✗") ? "#f87171" : "rgba(255,255,255,0.55)"), padding: "14px 16px", textAlign: "center", background: j === 3 ? "rgba(249,115,22,0.05)" : "none", fontWeight: j === 3 ? 600 : 400 }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "80px 1.5rem 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>Pricing</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#fff", margin: "12px 0 12px", letterSpacing: "-0.01em" }}>One-time payment.<br />No monthly traps.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>Buy a block of applications. Use them over 30–90 days. Get a pro-rata refund on unused credits if you land a job early.</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 48 }}>
          {PLANS.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: plan.highlight ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${plan.highlight ? "rgba(249,115,22,0.45)" : "rgba(255,255,255,0.08)"}`, borderRadius: 24, padding: "36px 28px", position: "relative", transition: "transform 0.3s", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {plan.tag && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#F97316", color: "#fff", padding: "4px 16px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>{plan.tag}</div>
                )}
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: plan.highlight ? "#F97316" : "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{plan.name}</span>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 52, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1, margin: "8px 0 4px" }}>{plan.price}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{plan.apps}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>{plan.sub}</div>

                <div style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#F97316", fontSize: 14, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", marginTop: 28, padding: "14px 24px", borderRadius: 12, background: plan.highlight ? "#F97316" : "transparent", border: `1px solid ${plan.highlight ? "#F97316" : "rgba(255,255,255,0.2)"}`, color: "#fff", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, transition: "all 0.2s" }}
                  onMouseEnter={e => { if (!plan.highlight) { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)"; } else { e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.4)"; } }}
                  onMouseLeave={e => { if (!plan.highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; } else { e.currentTarget.style.boxShadow = "none"; } }}>
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 32, padding: "20px 24px", background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 16, maxWidth: 620, margin: "32px auto 0" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              💡 <strong style={{ color: "#F97316" }}>Refund Policy:</strong> If you get placed before using all your credits, we refund the unused portion — pro-rata, no questions asked. This is real. It's how we stay accountable.
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section id="our-story" style={{ padding: "80px 1.5rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
        <FadeIn>
          <div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>Our Story</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", margin: "12px 0 20px", letterSpacing: "-0.01em", lineHeight: 1.15 }}>Built by students who<br />lived this problem.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 16 }}>
              4th year of engineering. Placement season. 50 company forms to fill, DSA to practice, mock interviews to prep for. Every evening spent clicking "Apply" on portals that eat 20 minutes each.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 0 }}>
              We built ApplyKaro because the time you spend on job forms is time stolen from interview prep — which is what actually determines whether you get the offer.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 24, padding: "36px 32px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#F97316", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>From the Founder</div>
            <blockquote style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#fff", lineHeight: 1.5, margin: "0 0 24px", borderLeft: "3px solid #F97316", paddingLeft: 20 }}>
              "Placement season shouldn't cost you 3 months of your life."
            </blockquote>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24 }}>
              Every student I knew was spending 3–4 hours a day just filling forms. That's time that should go into DSA, system design, mock interviews — the things that actually matter when you're in the room.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #F97316, #ea580c)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", flexShrink: 0 }}>K</div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>Keshav</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Founder, ApplyKaro · VIT Vellore</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faq" style={{ padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#F97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", margin: "12px 0 8px", letterSpacing: "-0.01em" }}>Questions we get<br />every single day</h2>
          </div>
        </FadeIn>
        <div>
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: "#F97316", fontSize: 22, flexShrink: 0, transform: openIdx === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s", display: "inline-block", lineHeight: 1 }}>+</span>
                </button>
                {openIdx === i && (
                  <div style={{ padding: "0 0 22px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "80px 1.5rem 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
      <FadeIn>
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", margin: "0 0 12px", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Your next interview call is<br /><span style={{ color: "#F97316" }}>25 applications away.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "16px 0 40px", lineHeight: 1.7 }}>
            Stop spending evenings on job portals. Let us handle the volume while you prep for the interview you're going to get.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F97316", color: "#fff", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 17, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 24px rgba(249,115,22,0.35)" }}>
              💬 Start on WhatsApp
            </a>
            <a href="#pricing"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "16px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 17, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.18)" }}>
              View Pricing
            </a>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>
            Pro-rata refund if placed early · Screenshot proof of every application · WhatsApp support
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logo.png" alt="ApplyKaro" style={{ height: 30, width: "auto" }} />
        </a>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Built in India, for India. © 2025 ApplyKaro.</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#F97316", textDecoration: "none", fontWeight: 600 }}>💬 WhatsApp us</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; color: #fff; overflow-x: hidden; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .desktop-nav { display: flex !important; }
        .hamburger { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero />
        <Ticker />
        <HowItWorks />
        <VSSection />
        <ComparisonTable />
        <Pricing />
        <OurStory />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
