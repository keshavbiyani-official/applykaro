import { useState, useRef, useEffect } from 'react';

const FAQS = [
  {
    q: 'Will recruiters know someone else applied for me?',
    a: "No. We apply using your own credentials and accounts. From the recruiter's end, it looks exactly like you applied — because technically you did, just with our team doing the form-filling. The resume, cover letter, profile — all yours. We're your hands, not your identity.",
  },
  {
    q: 'How is this different from AI tools like LazyApply?',
    a: "AI tools can only handle simple ATS systems like Greenhouse and Lever. They cannot navigate Workday, iCIMS, Taleo, or SAP SuccessFactors — which is where 70% of serious jobs at large companies live. Our human team handles all of them. Additionally, AI sends identical applications everywhere. Recruiters spot this instantly. We personalise every single one.",
  },
  {
    q: 'What proof do I get that you actually applied?',
    a: 'Every application comes with a timestamped screenshot of the confirmation page, sent directly to your WhatsApp. You know exactly where we applied, when, and which resume variant was used. Full transparency — no black box, no trust me bro.',
  },
  {
    q: 'What if I get placed before using all my credits?',
    a: "We refund the pro-rata value of unused credits. No negotiations, no chasing us. This is built into our pricing model intentionally — we want you to get placed fast, even if that means giving money back.",
  },
  {
    q: 'Which portals do you apply to?',
    a: 'LinkedIn, Naukri, Internshala, Wellfound, and company career portals directly — including Workday, Taleo, iCIMS, Greenhouse, Lever, SAP SuccessFactors. We cover everything, not just the easy ones that take 30 seconds.',
  },
  {
    q: "I'm in final year during placement season. Can you handle off-campus simultaneously?",
    a: "Yes — this is exactly who we built this for. While you're prepping for on-campus drives, we're applying off-campus in parallel. Many of our beta users end up with better off-campus offers than anything from their placement cell.",
  },
  {
    q: 'How quickly do you start?',
    a: 'Onboarding call within 24 hours of payment. Applications begin within 48 hours. WhatsApp screenshots start arriving within 2–3 days of signing up.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      borderBottom: '1px solid var(--border-subtle)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'none', border: 'none',
        color: open ? 'var(--saffron)' : 'var(--text)',
        textAlign: 'left', padding: '20px 0',
        fontSize: '1rem', fontWeight: 700,
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 16,
        transition: 'color 0.2s',
      }}>
        <span>{faq.q}</span>
        <span style={{
          fontSize: '1.5rem', color: 'var(--saffron)',
          flexShrink: 0, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <p style={{
          fontSize: '0.9rem', color: 'var(--muted)',
          lineHeight: 1.8, paddingBottom: 20,
        }}>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" style={{ padding: '90px 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={labelStyle}>FAQ</div>
        <h2 style={titleStyle}>Questions we get<br />every single day</h2>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
      </div>
    </section>
  );
}

const labelStyle = {
  fontSize: '0.72rem', fontWeight: 800,
  textTransform: 'uppercase', letterSpacing: '0.14em',
  color: 'var(--saffron)', marginBottom: '0.75rem',
};
const titleStyle = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
  fontWeight: 900, lineHeight: 1.15,
  letterSpacing: '-0.025em', marginBottom: '0.75rem',
};
