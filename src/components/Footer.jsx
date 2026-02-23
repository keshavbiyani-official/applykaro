const WA_LINK = "https://wa.me/916392791608?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ApplyKaro";

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '3rem 5%',
      display: 'flex', flexWrap: 'wrap',
      justifyContent: 'space-between', alignItems: 'center',
      gap: '1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'var(--saffron)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.9rem', fontWeight: 900, color: '#fff',
        }}>A</div>
        <span style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
          Apply<span style={{ color: 'var(--saffron)' }}>Karo</span>
        </span>
        <span style={{ color: 'var(--muted)', fontSize: '0.78rem', marginLeft: 8 }}>
          © {new Date().getFullYear()}
        </span>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
          { label: 'About', href: '#about' },
          { label: 'WhatsApp Us', href: WA_LINK, external: true },
        ].map(l => (
          <a key={l.label} href={l.href}
            target={l.external ? '_blank' : undefined}
            rel={l.external ? 'noreferrer' : undefined}
            style={{
              color: 'var(--muted)', textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
            {l.label}
          </a>
        ))}
      </nav>

      <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>
        Made with care in India 🇮🇳
      </p>
    </footer>
  );
}
