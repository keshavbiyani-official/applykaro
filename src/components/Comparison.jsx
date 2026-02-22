import { useEffect, useRef, useState } from 'react';

function useVisible(threshold = 0.1) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const AI_CONS = [
  'Skips Workday, Taleo, iCIMS entirely — that\'s 70% of serious jobs',
  'Sends identical applications to every company — recruiters spot it instantly',
  'Gets flagged as bot traffic on most enterprise portals',
  'No cover letters, no customisation, no judgment',
  'Competes in the same 200-job pool as 10,000 other AI users',
  'Zero proof of what was actually submitted',
];

const OUR_PROS = [
  'Manually navigates every portal type including Workday and Taleo',
  'Custom resume variant per job category',
  'Real human = zero bot flags, zero rejections at form stage',
  'Personalised cover letter referencing each company',
  'WhatsApp screenshot proof of every single submission',
  'Pro-rata refund if you get placed before credits run out',
];

const COMPARISON_ROWS = [
  { feature: 'Applications per month', solo: '25–40', ai: '200 (but skips most)', consultant: '10–20', us: '200–500 ✓' },
  { feature: 'Personalised per job', solo: '✗', ai: '✗', consultant: '✓', us: '✓' },
  { feature: 'Works on Workday / Taleo', solo: '✓ (30 min each)', ai: '✗ Skips them', consultant: '✗', us: '✓' },
  { feature: 'Screenshot proof', solo: '✗', ai: '✗', consultant: '✗', us: '✓' },
  { feature: 'Refund if placed early', solo: '—', ai: '✗', consultant: '✗', us: '✓' },
  { feature: 'Cost', solo: 'Free (60+ hrs/mo)', ai: '₹2–5k/month', consultant: '₹15–50k', us: 'From ₹999' },
];

export default function Comparison() {
  const [ref1, v1] = useVisible();
  const [ref2, v2] = useVisible();

  return (
    <>
      {/* Why Not AI */}
      <section id="comparison" style={{ padding: '90px 5%', background: 'var(--dark)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={labelStyle}>The Problem With AI Auto-Apply</div>
          <h2 style={{ ...titleStyle, maxWidth: 700, margin: '0 auto 0.75rem' }}>
            Recruiters can spot AI spam instantly.<br />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--saffron)' }}>
              We don't send spam.
            </span>
          </h2>
          <p style={{ ...subStyle, margin: '0 auto' }}>
            AI bulk-apply tools skip Workday, iCIMS, Taleo — where most Fortune 500 and serious Indian company jobs live. We manually fill every form.
          </p>
        </div>

        <div ref={ref1} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem', maxWidth: 860, margin: '0 auto',
          opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {/* AI Bad */}
          <div style={{
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: 20, padding: '2rem',
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>😵</span> AI Auto-Apply Tools
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {AI_CONS.map((c, i) => (
                <li key={i} style={{
                  fontSize: '0.85rem', color: 'var(--muted)',
                  padding: '6px 0', display: 'flex', gap: 10,
                  borderBottom: i < AI_CONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ color: '#ef4444', flexShrink: 0, fontWeight: 700 }}>×</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Us Good */}
          <div style={{
            background: 'rgba(255,107,26,0.05)',
            border: '1px solid rgba(255,107,26,0.3)',
            borderRadius: 20, padding: '2rem',
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🎯</span> ApplyKaro
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {OUR_PROS.map((p, i) => (
                <li key={i} style={{
                  fontSize: '0.85rem', color: 'var(--muted)',
                  padding: '6px 0', display: 'flex', gap: 10,
                  borderBottom: i < OUR_PROS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section style={{ padding: '90px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={labelStyle}>Full Comparison</div>
          <h2 style={{ ...titleStyle }}>Smarter than going alone.</h2>
        </div>

        <div ref={ref2} style={{
          overflowX: 'auto', borderRadius: 16,
          border: '1px solid var(--border-subtle)',
          opacity: v2 ? 1 : 0, transform: v2 ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--card)' }}>
                {['What You Get', 'Solo 😵', 'AI Auto-Apply 🤖', 'Consultants 💸', 'ApplyKaro 🎯'].map((h, i) => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: 'left',
                    fontWeight: 700, fontSize: '0.78rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: i === 4 ? 'var(--saffron)' : 'var(--muted)',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: i === 4 ? 'rgba(255,107,26,0.06)' : 'transparent',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < COMPARISON_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <td style={{ padding: '13px 20px', fontWeight: 600, color: 'var(--text)' }}>{row.feature}</td>
                  <td style={{ padding: '13px 20px', color: 'var(--muted)' }}>{row.solo}</td>
                  <td style={{ padding: '13px 20px', color: 'var(--muted)' }}>{row.ai}</td>
                  <td style={{ padding: '13px 20px', color: 'var(--muted)' }}>{row.consultant}</td>
                  <td style={{
                    padding: '13px 20px',
                    background: 'rgba(255,107,26,0.04)',
                    color: row.us.includes('✓') ? 'var(--green)' : 'var(--saffron)',
                    fontWeight: 700,
                  }}>{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
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
  maxWidth: 560, lineHeight: 1.7,
};
