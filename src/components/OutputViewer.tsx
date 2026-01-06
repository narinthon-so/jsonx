import { useState } from 'react';
import ReactJson from '@microlink/react-json-view';
import { clsx } from 'clsx';
import { Check, Copy, Code, Network, Download } from 'lucide-react';

interface OutputViewerProps {
  value: string;
  placeholder?: string;
  theme: string;
}

export function OutputViewer({ value, placeholder, theme }: OutputViewerProps) {
  const [viewMode, setViewMode] = useState<'text' | 'tree'>('text');
  const [copied, setCopied] = useState(false);

  let jsonObject = null;
  let isValid = false;
  try {
    jsonObject = JSON.parse(value);
    isValid = true;
  } catch {
    // ignore
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jsonx-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Delay revoking to ensure download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className={clsx("glass", "editor-container")} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: 'var(--glass-border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Output</span>
          
          <div style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '6px', padding: '2px', display: 'flex' }}>
            <button 
              onClick={() => setViewMode('text')}
              className={clsx("icon-btn")}
              style={{ 
                padding: '4px 8px', 
                fontSize: '0.75rem', 
                background: viewMode === 'text' ? 'var(--btn-active-bg)' : 'transparent',
                boxShadow: viewMode === 'text' ? 'var(--btn-active-shadow)' : 'none',
                height: 'auto',
                width: 'auto',
                gap: '4px'
              }}
              title="Text View"
            >
              <Code size={14} /> Text
            </button>
            <button 
              onClick={() => isValid && setViewMode('tree')}
              className={clsx("icon-btn")}
              disabled={!isValid}
              style={{ 
                padding: '4px 8px', 
                fontSize: '0.75rem', 
                background: viewMode === 'tree' ? 'var(--btn-active-bg)' : 'transparent',
                boxShadow: viewMode === 'tree' ? 'var(--btn-active-shadow)' : 'none',
                height: 'auto',
                width: 'auto',
                gap: '4px',
                opacity: isValid ? 1 : 0.5,
                cursor: isValid ? 'pointer' : 'not-allowed'
              }}
              title="Tree View (Valid JSON only)"
            >
              <Network size={14} /> Tree
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleDownload} className="icon-btn" title="Download JSON" style={{ opacity: value ? 1 : 0.5 }}>
            <Download size={16} />
          </button>
          <button onClick={handleCopy} className="icon-btn" title="Copy Output" style={{ opacity: value ? 1 : 0.5 }}>
             {copied ? <Check size={16} color="var(--success-color)" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', flex: 1, overflow: 'auto' }}>
        {viewMode === 'text' || !isValid ? (
          <textarea
            value={value}
            readOnly
            placeholder={placeholder}
            spellCheck={false}
            className="p-md text-sm"
            style={{ 
              height: '100%', 
              width: '100%', 
              fontFamily: 'var(--font-mono)',
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
              color: 'var(--text-color)'
            }}
          />
        ) : (
          <div style={{ padding: '1rem', height: '100%' }}>
            <ReactJson 
              src={jsonObject} 
              theme={theme === 'dark' ? 'ocean' : 'rjv-default'} 
              style={{ background: 'transparent', fontFamily: 'monospace' }}
              name={null}
              displayDataTypes={false}
              iconStyle="triangle"
              enableClipboard={false} 
            />
          </div>
        )}
      </div>
    </div>
  );
}


