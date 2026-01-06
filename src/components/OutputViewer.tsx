import { useState } from 'react';
import ReactJson from '@microlink/react-json-view';
import { Network, Code, Check } from 'lucide-react';
import clsx from 'clsx';

interface OutputViewerProps {
  value: string;
  placeholder?: string;
}

export function OutputViewer({ value, placeholder }: OutputViewerProps) {
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
                background: viewMode === 'text' ? 'white' : 'transparent',
                boxShadow: viewMode === 'text' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
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
                background: viewMode === 'tree' ? 'white' : 'transparent',
                boxShadow: viewMode === 'tree' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
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

        <button onClick={handleCopy} className="icon-btn" title="Copy Output" style={{ opacity: value ? 1 : 0.5 }}>
           {copied ? <Check size={16} color="var(--success-color)" /> : <ClipboardIcon />}
        </button>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', flex: 1, overflow: 'auto' }}>
        {viewMode === 'text' || !isValid ? (
          <textarea
            value={value}
            readOnly
            placeholder={placeholder}
            spellCheck={false}
            style={{ 
              height: '100%', 
              width: '100%', 
              padding: '1rem', 
              fontFamily: 'monospace',
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
              theme="rjv-default" 
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

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  )
}
