import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onSuccess?: (token: string) => void;
  onError?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

export function TurnstileWidget({ onSuccess, onError, theme = 'auto' }: TurnstileWidgetProps) {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');

  // Use Environment Variable or Fallback to Cloudflare Test Key (Always Pass)
  const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <Turnstile
        siteKey={SITE_KEY}
        options={{
          theme: theme,
          size: 'normal',
        }}
        onSuccess={(token) => {
          setStatus('success');
          console.log('Turnstile Verified. Token:', token);
          onSuccess?.(token);
        }}
        onError={() => {
          setStatus('error');
          console.error('Turnstile Error');
          onError?.();
        }}
        onExpire={() => {
          setStatus('pending');
          console.warn('Turnstile Token Expired');
        }}
      />
      {status === 'success' && (
        <span style={{ fontSize: '0.75rem', color: 'var(--success-color)', fontWeight: 500 }}>
          Human Verified ✓
        </span>
      )}
    </div>
  );
}
