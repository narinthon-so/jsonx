import { TurnstileWidget } from './TurnstileWidget';
import { ShieldCheck } from 'lucide-react';

interface VerificationOverlayProps {
  onVerify: (token: string) => void;
  theme: 'light' | 'dark' | 'auto';
}

export function VerificationOverlay({ onVerify, theme }: VerificationOverlayProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      zIndex: 9999,
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <div className="glass" style={{ 
        padding: '3rem', 
        borderRadius: '16px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
      }}>
        <div style={{ 
          background: 'var(--primary-color)', 
          padding: '1rem', 
          borderRadius: '50%',
          color: 'white',
          marginBottom: '0.5rem'
        }}>
          <ShieldCheck size={48} />
        </div>
        
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Security Check</h1>
          <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.5 }}>
            Please verify you are human to access the JSON Validator.
          </p>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {/* Force light theme for consistency in overlay, or pass app theme */}
          <TurnstileWidget onSuccess={onVerify} theme={theme} />
        </div>
        
        <div style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '2rem' }}>
          Protected by Cloudflare Turnstile
        </div>
      </div>
    </div>
  );
}
