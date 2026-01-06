import { useState } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { OutputViewer } from './components/OutputViewer';
import { formatJson, minifyJson, loadSample } from './utils/json';
import { Play, Minimize2, Trash2, FileJson } from 'lucide-react';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

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
  const handleInputChange = (val: string) => {
    setInput(val);
    if (error) setError(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Actions Toolbar */}
        <div className="glass" style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={handleFormat} className="primary-btn">
            <Play size={18} /> Format
          </button>
          <button onClick={handleMinify} className="primary-btn" style={{ background: 'var(--text-color)', opacity: 0.8 }}>
            <Minimize2 size={18} /> Minify
          </button>
          <div style={{ flex: 1 }}></div>
          <button onClick={handleLoadSample} className="icon-btn" title="Load Sample">
            <FileJson size={20} />
          </button>
          <button onClick={handleClear} className="icon-btn" title="Clear All" style={{ color: 'var(--error-color)' }}>
            <Trash2 size={20} />
          </button>
        </div>

        {/* Editors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', flex: 1, minHeight: '500px' }}>
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
          />
        </div>

      </main>
      
      <footer style={{ textAlign: 'center', padding: '1rem', opacity: 0.6, fontSize: '0.8rem' }}>
        <p>Progressive Web App • Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
