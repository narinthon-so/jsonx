import { Braces } from 'lucide-react';

export function Header() {
  return (
    <header className="glass" style={{ margin: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-color), #ec4899)', padding: '0.5rem', borderRadius: '8px', color: 'white' }}>
        <Braces size={24} />
      </div>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>JSON Validator</h1>
        <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Validate, Format, and Minify</p>
      </div>
    </header>
  );
}
