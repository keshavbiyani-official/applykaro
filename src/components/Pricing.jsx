import { useEffect, useRef, useState } from 'react';

const WA = (msg) => `https://wa.me/916392791608?text=${encodeURIComponent(msg)}`;

const PLANS = [
  {
    name: 'Starter',
    price: '₹999',
    note: '50 applications — try us risk-free',
    badge: null,
    features: [
      '50 job applications',
      'ATS-optimised resume (1 variant)',
      'Cover letters included',
      'WhatsApp screenshot proof',
      'Naukri + LinkedIn + portals',
      '48hr turnaround to begin',
    ],
    cta: 'Get Started',
    waMsg: 'Hi, I want the Starter pack (₹999 / 50 apps)',
    featured: false,
  },
  {
    name: 'Standard',
    price: '₹2,499',
    note: '200 applications — recommended',
    badge: '🔥 Most Popular',
    features: [
      '200 job applications',
      '3 resume variants by role type',
      'Personalised cover letters',
      'WhatsApp updates + screenshots',
      'All portals incl. Workday & Taleo',
      'Weekly strategy check-in call',
      'Pro-rata refund if placed early',
    ],
    cta: 'Start Now →',
    waMsg: 'Hi, I want the Standard pack (₹2,499 / 200 apps)',
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹4,999',
    note: '500 applications — maximum firepower',
    badge: null,
    features: [
      '500 job applications',
      '5 resume variants + LinkedIn rewrite',
      'Priority 24hr turnaround',
      'All portals + referral outreach',
      'Weekly 1:1 strategy call',
      'Interview prep guide',
      'Pro-rata refund policy',
    ],
    cta: 'Get Started',
    waMsg: 'Hi, I want the Premium pack (₹4,999 / 500 apps)',
    featured: false,
  },
];

function PricingCard({ plan, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: plan.featured
        ? 'linear-gradient(145deg, rgba(255,107,26,0.1), var(--card))'
        : 'var(--card)',
      border: `1px solid ${plan.featured ? 'var(--saffron)' : hovered ? 'rgba(255,107,26,0.35)' : 'var(--border-subtle)'}`,
      borderRadius: 22,
      padding: '2.5rem 2rem',
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.2s, box-shadow 0.2s`,
      boxShadow: hovered ? '0 12px 40px rgba(255,107,26,0.12)' : 'none',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {plan.badge && (
        <div style={{
          position: 'absolute', top: -14, left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--saffron)', color: '#fff',
          fontSize: '0.72rem', fontWeight: 800,
          padding: '4px 18px', borderRadius: 100,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(255,107,26,0.4)',
        }}>{plan.badge}</div>
      )}

      <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.6rem' }}>
        {plan.name}
      </div>
      <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>
        {plan.price}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{plan.note}</div>

      <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: '1.5rem' }} />

      <ul style={{ listStyle: 'none', marginBottom: '1.8rem' }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{
            fontSize: '0.875rem', color: 'var(--muted)',
            padding: '6px 0', display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a href={WA(plan.waMsg)} target="_blank" rel="noreferrer" style={{
        display: 'block', textAlign: 'center',
        padding: '13px', borderRadius: 10,
        fontWeight: 800, fontSize: '0.9rem',
        textDecoration: 'none',
        background: plan.featured ? 'var(--saffron)' : 'transparent',
        color: plan.featured ? '#fff' : 'var(--text)',
        border: plan.featured ? 'none' : '1px solid var(--border-subtle)',
        boxShadow: plan.featured ? '0 4px 20px rgba(255,107,26,0.35)' : 'none',
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          if (plan.featured) e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,26,0.45)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          if (plan.featured) e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,26,0.35)';
        }}>
        {plan.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '90px 5%', background: 'var(--dark)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={labelStyle}>Pricing</div>
        <h2 style={titleStyle}>One-time payment.<br />No monthly traps.</h2>
        <p style={{ ...subStyle, margin: '0 auto' }}>
          Buy a block of applications. Use them over 30–90 days. Get a pro-rata refund on unused credits if you land a job early.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: 980, margin: '0 auto 2.5rem',
      }}>
        {PLANS.map((plan, i) => <PricingCard key={plan.name} plan={plan} index={i} />)}
      </div>

      <div style={{
        textAlign: 'center',
        background: 'rgba(255,107,26,0.05)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '1.2rem 2rem',
        maxWidth: 680, margin: '0 auto',
        fontSize: '0.875rem', color: 'var(--muted)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--text)' }}>💡 Refund Policy:</strong> If you get placed before using all your credits, we refund the unused portion — pro-rata, no questions asked. This is real. It's how we stay accountable.
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
  maxWidth: 520, lineHeight: 1.7,
};
