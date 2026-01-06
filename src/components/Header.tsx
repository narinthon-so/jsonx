import { Braces } from 'lucide-react';

export function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-color), #ec4899)', padding: '0.5rem', borderRadius: '8px', color: 'white' }}>
        <Braces size={24} />
      </div>
      <div>
        <h1 className="font-semibold" style={{ fontSize: '1.25rem' }}>JSON Validator</h1>
        <p className="text-sm opacity-70">Validate, Format, and Minify</p>
      </div>
    </div>
  );
}
