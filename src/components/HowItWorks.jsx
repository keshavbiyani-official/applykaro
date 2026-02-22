import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: '01',
    icon: '📋',
    title: 'Share Your Profile',
    desc: 'Quick 20-minute onboarding call on WhatsApp. Tell us your target roles, companies, and preferences. We handle the rest.',
  },
  {
    num: '02',
    icon: '✍️',
    title: 'We Build Your Docs',
    desc: 'We create ATS-optimised resume variants and personalised cover letters for each job category — not one generic version for everything.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'We Apply Every Day',
    desc: 'Real humans manually submit to company portals, Naukri, LinkedIn, Internshala — including Workday and Taleo that AI tools skip entirely.',
  },
  {
    num: '04',
    icon: '📲',
    title: 'You Get Proof + Calls',
    desc: 'Every application comes with a timestamped screenshot to your WhatsApp. You focus on interview prep. We handle the volume.',
  },
];

function StepCard({ step, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: 'var(--card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 20,
      padding: '2.2rem',
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.2s`,
      cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '3.5rem', fontWeight: 400,
        color: 'rgba(255,107,26,0.12)',
        lineHeight: 1, marginBottom: '0.75rem',
        fontStyle: 'italic',
      }}>{step.num}</div>
      <div style={{ fontSize: '1.7rem', marginBottom: '0.75rem' }}>{step.icon}</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '90px 5%' }}>
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={labelStyle}>The Process</div>
        <h2 style={titleStyle}>From onboarding to<br />interview calls in days</h2>
        <p style={subStyle}>We handle the entire application process. You focus on what actually matters — interview prep.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.2rem',
      }}>
        {STEPS.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}
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
const subStyle = {
  fontSize: '1rem', color: 'var(--muted)',
  maxWidth: 500, lineHeight: 1.7,
};
