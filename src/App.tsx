import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { OutputViewer } from './components/OutputViewer';
import { formatJson, minifyJson, loadSample } from './utils/json';
import { usePWAInstall } from './hooks/usePWAInstall';
import { VerificationOverlay } from './components/VerificationOverlay';
import { Play, Minimize2, Trash2, FileJson, Sun, Moon, Download, Upload, Coffee } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { canInstall, install } = usePWAInstall();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const formatted = formatJson(input);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const minified = minifyJson(input);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleLoadSample = () => {
    const sample = loadSample();
    setInput(sample);
    setOutput('');
    setError(null);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Auto-validate on input change? Maybe too aggressive for large JSON. 
  // Let's just clear error on change.
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
      setError(null);
      // Reset input so same file can be selected again
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    document.getElementById('file-upload')?.click();
  };

  // Auto-validate on input change? Maybe too aggressive for large JSON. 
  // Let's just clear error on change.
  const handleInputChange = (val: string) => {
    setInput(val);
    if (error) setError(null);
  };

  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    // Add small delay for smooth transition
    setTimeout(() => {
      setIsVerified(true);
    }, 500);
  };

  if (!isVerified) {
    return <VerificationOverlay onVerify={handleVerification} theme={theme as 'light' | 'dark' | 'auto'} />;
  }

  return (
    <div className="app-container">
      <div className="glass-header flex-between">
        <Header />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href={import.meta.env.VITE_BUY_ME_A_COFFEE_URL || "https://www.buymeacoffee.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
            style={{ 
              fontSize: '0.875rem', 
              padding: '6px 12px',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 221, 0, 0.1)', // Subtle yellow tint
              color: 'var(--text-color)',
              textDecoration: 'none'
            }}
            title="Support the developer"
          >
            <Coffee size={16} color="#FFDD00" /> <span className="hidden-mobile">Buy me a coffee</span>
          </a>
          {canInstall && (
            <button 
              onClick={install} 
              className="primary-btn" 
              style={{ fontSize: '0.875rem', padding: '6px 12px' }}
            >
              <Download size={16} /> Install App
            </button>
          )}
          <button 
            onClick={toggleTheme} 
            className="icon-btn" 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            style={{ background: 'var(--surface-color)', width: '40px', height: '40px', borderRadius: '50%' }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
      
      <main className="main-content">
        
        {/* Actions Toolbar */}
        <div className="glass glass-panel">
          <input 
            type="file" 
            id="file-upload" 
            accept=".json,.txt" 
            style={{ display: 'none' }} 
            onChange={handleFileUpload} 
          />
          <button onClick={handleFormat} className="primary-btn">
            <Play size={18} /> Format
          </button>
          <button onClick={handleMinify} className="secondary-btn" title="Convert to Single Line (Minify)">
            <Minimize2 size={18} /> One Line
          </button>
          <div style={{ flex: 1 }}></div>
          <button onClick={triggerFileUpload} className="icon-btn" title="Upload JSON File">
            <Upload size={20} />
          </button>
          <button onClick={handleLoadSample} className="icon-btn" title="Load Sample">
            <FileJson size={20} />
          </button>
          <button onClick={handleClear} className="icon-btn" title="Clear All" style={{ color: 'var(--error-color)' }}>
            <Trash2 size={20} />
          </button>
        </div>

        {/* Editors Grid */}
        <div className="grid-cols">
          <Editor 
            label="Input JSON" 
            value={input} 
            onChange={handleInputChange} 
            error={error} 
            placeholder="Paste your JSON here..."
          />
          <OutputViewer 
            value={output} 
            placeholder="Result will appear here..."
            theme={theme}
          />
        </div>

      </main>
      

    </div>
  );
}

export default App;
