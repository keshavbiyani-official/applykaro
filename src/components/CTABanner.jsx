import { useEffect, useRef, useState } from 'react';

const WA_LINK = "https://wa.me/916392791608?text=Hi%2C%20I%20want%20to%20start%20with%20ApplyKaro";

export default function CTABanner() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: '60px 5%' }}>
      <div ref={ref} style={{
        background: 'linear-gradient(135deg, rgba(255,107,26,0.12), rgba(255,107,26,0.04))',
        border: '1px solid rgba(255,107,26,0.25)',
        borderRadius: 24, padding: '4.5rem 3rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        {/* Decorative glows */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(255,107,26,0.15), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 240, height: 240,
          background: 'radial-gradient(circle, rgba(255,107,26,0.1), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900, lineHeight: 1.15,
          letterSpacing: '-0.025em',
          marginBottom: '1rem',
        }}>
          Your next interview call is<br />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'var(--saffron)',
          }}>25 applications away.</span>
        </h2>
        <p style={{
          fontSize: '1rem', color: 'var(--muted)',
          marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Stop spending evenings on job portals. Let us handle the volume while you prep for the interview you're going to get.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            background: 'var(--saffron)', color: '#fff',
            padding: '15px 36px', borderRadius: 12,
            fontWeight: 800, fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(255,107,26,0.4)',
            transition: 'all 0.2s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(255,107,26,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,26,0.4)'; }}>
            💬 Start on WhatsApp
          </a>
          <a href="#pricing" style={{
            color: 'var(--text)', padding: '15px 28px', borderRadius: 12,
            fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; }}>
            View Pricing
          </a>
        </div>

        <p style={{ marginTop: '1.8rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
          Pro-rata refund if placed early · Screenshot proof of every application · WhatsApp support
        </p>
      </div>
    </section>
  );
}
