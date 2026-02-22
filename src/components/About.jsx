import { useEffect, useRef, useState } from 'react';

export default function About() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ padding: '90px 5%', background: 'var(--dark)' }}>
      <div ref={ref} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem', alignItems: 'center',
        maxWidth: 1000, margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        {/* Text side */}
        <div>
          <div style={labelStyle}>Our Story</div>
          <h2 style={{ ...titleStyle, marginBottom: '1.5rem' }}>
            Built by students who<br />
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic', fontWeight: 400,
              color: 'var(--saffron)',
            }}>lived this problem.</span>
          </h2>
          <p style={{ ...paraStyle, marginBottom: '1rem' }}>
            4th year of engineering. Placement season. 50 company forms to fill, DSA to practice, mock interviews to prep for. Every evening spent clicking "Apply" on portals that eat 20 minutes each.
          </p>
          <p style={{ ...paraStyle, marginBottom: '1rem' }}>
            We built ApplyKaro because <strong style={{ color: 'var(--text)' }}>the time you spend on job forms is time stolen from interview prep</strong> — which is what actually determines whether you get the offer.
          </p>
          <p style={paraStyle}>
            We're a small team of VIT students and recent grads. We understand Indian placement culture, Indian company portals, and what Indian recruiters look for. This isn't a US product translated for India. <strong style={{ color: 'var(--text)' }}>This was built in India, for India.</strong>
          </p>
        </div>

        {/* Card side */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 22, padding: '2.5rem',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,107,26,0.1)',
            color: 'var(--saffron)',
            fontSize: '0.72rem', fontWeight: 800,
            padding: '4px 14px', borderRadius: 100,
            letterSpacing: '0.08em',
            marginBottom: '1.2rem',
          }}>FROM THE FOUNDER</div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem', fontStyle: 'italic',
            lineHeight: 1.6, color: 'var(--text)',
            marginBottom: '1.5rem',
          }}>
            "Placement season shouldn't cost you 3 months of your life."
          </p>

          <p style={{ ...paraStyle, marginBottom: '1rem' }}>
            Every student I knew was spending 3–4 hours a day just filling forms. That's time that should go into DSA, system design, mock interviews — the things that actually matter when you're in the room.
          </p>
          <p style={paraStyle}>
            We take the clerical work. You take the interviews.
          </p>

          <div style={{
            marginTop: '2rem',
            display: 'flex', alignItems: 'center', gap: 12,
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--saffron)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '1.1rem', color: '#fff',
              boxShadow: '0 0 16px rgba(255,107,26,0.35)',
            }}>K</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Keshav</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Founder, ApplyKaro · VIT Vellore, 2nd Year</div>
            </div>
          </div>
        </div>
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
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  fontWeight: 900, lineHeight: 1.15,
  letterSpacing: '-0.025em',
};
const paraStyle = {
  fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8,
};
