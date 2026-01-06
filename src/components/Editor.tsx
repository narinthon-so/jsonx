import { Clipboard, X, Check } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  label: string;
  error?: string | null;
  placeholder?: string;
}

export function Editor({ value, onChange, readOnly, label, error, placeholder }: EditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div className={clsx("glass", "editor-container")} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: 'var(--glass-border)' }}>
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{label}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {value && (
            <>
               <button onClick={handleCopy} className="icon-btn" title="Copy">
                {copied ? <Check size={16} color="var(--success-color)" /> : <Clipboard size={16} />}
              </button>
              {!readOnly && (
                <button onClick={handleClear} className="icon-btn" title="Clear">
                  <X size={16} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      
      <div style={{ position: 'relative', flex: 1 }}>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          style={{ 
            height: '100%', 
            width: '100%', 
            padding: '1rem', 
            fontFamily: 'monospace',
            backgroundColor: error ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
          }}
        />
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', color: 'var(--error-color)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderTop: 'var(--glass-border)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}
