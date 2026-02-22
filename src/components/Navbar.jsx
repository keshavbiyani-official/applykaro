import { useState, useEffect } from 'react';

const WA_LINK = "https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ApplyKaro";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'FAQ', href: '#faq' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,107,26,0.2)' : 'transparent'}`,
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'var(--saffron)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 900, color: '#fff',
            fontFamily: 'var(--font-display)',
            boxShadow: '0 0 20px rgba(255,107,26,0.4)',
          }}>A</div>
          <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Apply<span style={{ color: 'var(--saffron)' }}>Karo</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="desktop-nav">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: 'var(--muted)', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              background: 'var(--saffron)', color: '#fff',
              padding: '8px 20px', borderRadius: 8,
              fontWeight: 700, fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(255,107,26,0.35)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--saffron-light)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.background = 'var(--saffron)'; e.target.style.transform = 'translateY(0)'; }}>
              Get Started →
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', fontSize: '1.4rem', display: 'none',
          padding: 4,
        }} className="hamburger" aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem 5%',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>
              {l.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer"
            style={{
              background: 'var(--saffron)', color: '#fff',
              padding: '12px 20px', borderRadius: 8,
              fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', textAlign: 'center',
            }}>
            Get Started on WhatsApp →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
