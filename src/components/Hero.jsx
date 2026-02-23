import { useEffect, useState } from 'react';

const WA_LINK = "https://wa.me/916392791608?text=Hi%2C%20I%20want%20to%20start%20with%20ApplyKaro";

const TICKER_ITEMS = [
  '✓ Infosys portal submitted', '✓ Amazon SDE-1 applied',
  '✓ Razorpay internship done', '✓ Swiggy fresher applied',
  '✓ PhonePe submitted', '✓ Wipro NLTH applied',
  '✓ Zepto backend role done', '✓ CRED applied',
  '✓ TCS NQT registered', '✓ Meesho SDE applied',
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      overflow: 'hidden', padding: '12px 0',
      background: 'rgba(255,107,26,0.05)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: 'ticker 30s linear infinite',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            padding: '0 36px', fontSize: '0.78rem',
            fontWeight: 700, color: 'var(--muted)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            <span style={{ color: 'var(--saffron)', marginRight: 8 }}>●</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const fadeStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 5% 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 600,
          background: 'radial-gradient(ellipse, rgba(255,107,26,0.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,107,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Live badge */}
        <div style={{
          ...fadeStyle(0),
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,107,26,0.08)',
          border: '1px solid rgba(255,107,26,0.25)',
          color: '#FF8C42',
          padding: '6px 18px', borderRadius: 100,
          fontSize: '0.78rem', fontWeight: 700,
          marginBottom: '2rem',
          letterSpacing: '0.04em',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--saffron)',
            animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          NOW ACCEPTING BETA USERS — LIMITED SLOTS
        </div>

        {/* H1 */}
        <h1 style={{
          ...fadeStyle(0.1),
          fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
          fontWeight: 900, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          maxWidth: 900,
        }}>
          Stop Filling<br />
          Job Forms.<br />
          <span style={{
            color: 'var(--saffron)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>We'll Do It.</span>
        </h1>

        {/* Subheading */}
        <p style={{
          ...fadeStyle(0.2),
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--muted)', maxWidth: 540,
          marginBottom: '2.5rem',
          lineHeight: 1.7,
        }}>
          Real humans apply to 100+ jobs every day on your behalf — with custom resumes and personalised cover letters. Built for IIT, NIT, VIT, BITS students and Indian professionals.
        </p>

        {/* CTAs */}
        <div style={{
          ...fadeStyle(0.3),
          display: 'flex', gap: '1rem',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '3.5rem',
        }}>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            background: 'var(--saffron)', color: '#fff',
            padding: '15px 36px', borderRadius: 12,
            fontWeight: 800, fontSize: '1rem',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 28px rgba(255,107,26,0.4)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(255,107,26,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 28px rgba(255,107,26,0.4)'; }}>
            💬 Start on WhatsApp
          </a>
          <a href="#how-it-works" style={{
            color: 'var(--text)', padding: '15px 28px', borderRadius: 12,
            fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'transparent'; }}>
            See how it works ↓
          </a>
        </div>

        {/* Honest counter strip */}
        <div style={{
          ...fadeStyle(0.4),
          display: 'flex', gap: '2rem',
          flexWrap: 'wrap', justifyContent: 'center',
          fontSize: '0.82rem', color: 'var(--muted)',
        }}>
          {[
            { label: 'Beta cohort', val: 'Now open' },
            { label: 'Turnaround', val: '24 hours' },
            { label: 'Portals covered', val: 'All types' },
            { label: 'Proof per app', val: 'Screenshot' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--saffron)', fontWeight: 800 }}>{item.val}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </>
  );
}
